#!/usr/bin/env bash
# Uploads server-dist/ (built by _build/server-dist.mjs) to HiTech's own web server over SSH + rsync.
# Run by .github/workflows/deploy-server.yml; it can also be run by hand from a Linux/macOS shell.
#
# Safety locks, in order:
#   1. The target folder must already look like the website (has index.html), so a wrong DEPLOY_PATH
#      never sprays files into a home folder or a different site.
#   2. If the server's .htaccess or lead-endpoint/lead.php differ from the repo (someone edited them on the
#      server, for example to turn on the HTTPS redirect or change the recipient email), the diff is shown
#      and a real deploy stops unless ALLOW_CONFIG_CHANGES=true.
#   3. MODE=dry-run (the default) only lists what would change. Nothing is written.
#   4. Before writing, the whole current web root is saved to a dated .tar.gz outside the web root
#      (the newest 10 are kept).
#   5. Files are uploaded with --delay-updates (all new files appear together at the end) and nothing on the
#      server is ever deleted; files that only exist on the server are listed, not removed.
#   6. After the upload the live site is checked (pages load, lead.php answers, tooling and Vercel files are
#      not served). If a check fails, the backup is put back automatically and the run fails.
#
# Environment:
#   DEPLOY_HOST, DEPLOY_USER, DEPLOY_PATH  required (DEPLOY_PATH = absolute path of the web root)
#   DEPLOY_PORT                             optional, default 22
#   SSH_KEY_FILE                            optional, private key file (otherwise ssh's defaults)
#   MODE                                    dry-run (default) or deploy
#   ALLOW_CONFIG_CHANGES                    true to let a deploy overwrite a server-edited .htaccess / lead.php
#   SMOKE_URL                               site to check after deploy, default https://www.hitechnepal.com.np
#   SKIP_SMOKE                              true to skip the live checks (only if the runner cannot reach the site)
#   BACKUP_DIR                              optional, default ~/hitech-site-backups on the server
set -euo pipefail

MODE="${MODE:-dry-run}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"
SMOKE_URL="${SMOKE_URL:-https://www.hitechnepal.com.np}"
SMOKE_URL="${SMOKE_URL%/}"
BACKUP_DIR="${BACKUP_DIR:-hitech-site-backups}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/server-dist"

fail() { echo "::error::$*" >&2; echo "DEPLOY STOPPED: $*" >&2; exit 1; }
step() { echo; echo "==> $*"; }

[[ "$MODE" == "dry-run" || "$MODE" == "deploy" ]] || fail "MODE must be dry-run or deploy (got '$MODE')"
for v in DEPLOY_HOST DEPLOY_USER DEPLOY_PATH; do [[ -n "${!v:-}" ]] || fail "$v is not set"; done
[[ "$DEPLOY_PATH" == /* ]] || fail "DEPLOY_PATH must be an absolute path (got '$DEPLOY_PATH')"
DEPLOY_PATH="${DEPLOY_PATH%/}"
case "$DEPLOY_PATH" in
  ""|/|/root|/home|/etc|/usr|/var|/tmp|/opt|/srv|/bin|/boot|/lib) fail "DEPLOY_PATH '$DEPLOY_PATH' is too broad; point it at the website's own folder" ;;
esac
[[ "$DEPLOY_PATH" =~ ^[A-Za-z0-9._/@+-]+$ ]] || fail "DEPLOY_PATH has unexpected characters"
[[ -f "$SRC/index.html" && -f "$SRC/.htaccess" && -f "$SRC/lead-endpoint/lead.php" ]] || fail "server-dist/ is missing or incomplete; run npm run server-build first"
[[ ! -e "$SRC/vercel.json" && ! -e "$SRC/api" && ! -e "$SRC/package.json" ]] || fail "server-dist/ contains Vercel files; run npm run check:server"

SSH_OPTS=(-p "$DEPLOY_PORT" -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=20)
[[ -n "${SSH_KEY_FILE:-}" ]] && SSH_OPTS+=(-i "$SSH_KEY_FILE" -o IdentitiesOnly=yes)
TARGET="$DEPLOY_USER@$DEPLOY_HOST"
remote() { ssh "${SSH_OPTS[@]}" "$TARGET" "$@"; }
RSYNC_SSH="ssh ${SSH_OPTS[*]}"
q() { printf '%q' "$1"; }

step "Lock 1: is $DEPLOY_PATH on $DEPLOY_HOST the website?"
remote "test -d $(q "$DEPLOY_PATH")" || fail "$DEPLOY_PATH does not exist on the server"
remote "test -f $(q "$DEPLOY_PATH/index.html")" || fail "$DEPLOY_PATH has no index.html. Wrong folder? (For a brand-new server, upload server-dist/ by hand once.)"
echo "OK: $DEPLOY_PATH exists and has index.html"

step "Lock 2: were .htaccess or lead.php edited on the server?"
config_changed=0
for f in .htaccess lead-endpoint/lead.php; do
  tmp="$(mktemp)"
  if remote "cat $(q "$DEPLOY_PATH/$f")" >"$tmp" 2>/dev/null; then
    if cmp -s "$tmp" "$SRC/$f"; then
      echo "same: $f"
    else
      config_changed=1
      echo "DIFFERENT: $f  (- server now, + after deploy)"
      diff -u --label "server/$f" --label "repo/$f" "$tmp" "$SRC/$f" || true
    fi
  else
    echo "new on server: $f"
  fi
  rm -f "$tmp"
done
if [[ "$config_changed" == 1 ]]; then
  if [[ "$MODE" == "deploy" && "${ALLOW_CONFIG_CHANGES:-false}" != "true" ]]; then
    fail "the server's .htaccess or lead.php differ from the repo (diff above). If the server copy has a change you need (HTTPS redirect, recipient email), put it in the repo first. If the repo version is right, run again with 'allow config changes' ticked."
  fi
  echo "Config differs; ${MODE} continues ($( [[ "$MODE" == deploy ]] && echo 'allowed by ALLOW_CONFIG_CHANGES' || echo 'dry run only'))."
fi

step "What would change (rsync dry run; nothing on the server is deleted)"
RSYNC_FLAGS=(-rlz --checksum --itemize-changes --omit-dir-times --no-perms --no-owner --no-group)
rsync "${RSYNC_FLAGS[@]}" --dry-run -e "$RSYNC_SSH" "$SRC/" "$TARGET:$DEPLOY_PATH/" | grep -v '^\.d' || echo "(no file changes)"
echo
echo "Files only on the server (kept; listed for information):"
rsync -rl --dry-run --delete --itemize-changes -e "$RSYNC_SSH" \
  --exclude='/.well-known/' --exclude='/cgi-bin/' --exclude='/.user.ini' --exclude='/error_log' \
  "$SRC/" "$TARGET:$DEPLOY_PATH/" | sed -n 's/^\*deleting /  /p' | head -200 || true

if [[ "$MODE" == "dry-run" ]]; then
  step "Dry run finished. Nothing was changed on the server."
  exit 0
fi

step "Lock 4: back up the current site"
STAMP="$(date -u +%Y%m%d-%H%M%S)"
BACKUP="$BACKUP_DIR/site-$STAMP.tar.gz"
remote "set -e; mkdir -p $(q "$BACKUP_DIR"); tar -czf $(q "$BACKUP") --exclude=./.git -C $(q "$DEPLOY_PATH") .; ls -1t $(q "$BACKUP_DIR")/site-*.tar.gz | tail -n +11 | xargs -r rm -f; ls -lh $(q "$BACKUP")"
echo "Backup: $BACKUP (in the deploy user's home folder on the server)"

# Put the backup back: unpack it next to the backups and copy back only files that differ, so files owned
# by other users (certificates, server-managed files) that did not change are never touched.
restore() {
  echo "::warning::Restoring the backup $BACKUP"
  if remote "set -e; t=\$(mktemp -d $(q "$BACKUP_DIR")/restore.XXXXXX); trap 'rm -rf \"\$t\"' EXIT; tar -xzf $(q "$BACKUP") -C \"\$t\"; rsync -rl --checksum --no-perms --no-owner --no-group --omit-dir-times \"\$t/\" $(q "$DEPLOY_PATH/")"; then
    echo "Backup restored."; RESTORED="the previous site was restored from $BACKUP"
  else
    echo "::error::Restore failed; restore $BACKUP by hand."; RESTORED="the automatic restore FAILED, restore $BACKUP by hand"
  fi
}

step "Upload"
if ! rsync "${RSYNC_FLAGS[@]}" --delay-updates -e "$RSYNC_SSH" "$SRC/" "$TARGET:$DEPLOY_PATH/"; then
  restore
  fail "upload failed; $RESTORED"
fi

if [[ "${SKIP_SMOKE:-false}" == "true" ]]; then
  step "Live checks skipped (SKIP_SMOKE=true). Check $SMOKE_URL by hand."
  exit 0
fi

step "Lock 6: check the live site at $SMOKE_URL"
problems=()
status() { curl -s -o /dev/null -w '%{http_code}' --max-time 20 -A 'HiTech deploy check' "$@" || echo 000; }
sleep 2
expected_title="$(grep -o -m1 '<title>[^<]*</title>' "$SRC/index.html")"
home="$(curl -s --max-time 20 -A 'HiTech deploy check' "$SMOKE_URL/" || true)"
grep -qF "$expected_title" <<<"$home" || problems+=("home page does not show the new title $expected_title")
for p in /products.html /contact.html /assets/css/site.css /assets/js/site.js /robots.txt /sitemap.xml; do
  c="$(status "$SMOKE_URL$p")"; [[ "$c" == 200 ]] || problems+=("$p answered $c, expected 200")
done
c="$(status "$SMOKE_URL/lead-endpoint/lead.php")"; [[ "$c" == 405 ]] || problems+=("GET /lead-endpoint/lead.php answered $c, expected 405 (PHP running)")
c="$(status "$SMOKE_URL/this-page-does-not-exist")"; [[ "$c" == 404 ]] || problems+=("unknown URL answered $c, expected 404")
c="$(status "$SMOKE_URL/about-us.php")"; [[ "$c" == 301 ]] || problems+=("/about-us.php answered $c, expected 301")
for p in /vercel.json /api/lead.mjs /package.json /_build/build.mjs /docs/SPEC.md /README.md /.git/HEAD /.env /nginx.conf.example; do
  c="$(status "$SMOKE_URL$p")"; [[ "$c" != 200 ]] || problems+=("$p is publicly readable (200)")
done
if (( ${#problems[@]} )); then
  printf '  problem: %s\n' "${problems[@]}"
  restore
  fail "live checks failed after upload; $RESTORED"
fi
echo "All live checks passed."
step "Deployed. Backup of the previous site: $BACKUP"
