// Regenerates assets/data/nepal-map.json, nepal-map.js and nepal-outline.svg from npl10.json (Nepal border, lon/lat).
// Run: node _build/make-map.mjs   then   node _build/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const OUT = fileURLToPath(new URL('../assets/data/', import.meta.url));
mkdirSync(OUT, { recursive: true });

const geom = JSON.parse(readFileSync(new URL('./npl10.json', import.meta.url), 'utf8'));
const ring = geom.coordinates[0];
const W = 1000, PAD = 28, K = Math.cos(28.4 * Math.PI / 180);
let minLon = 180, maxLon = -180, minLat = 90, maxLat = -90;
for (const [x, y] of ring) { minLon = Math.min(minLon, x); maxLon = Math.max(maxLon, x); minLat = Math.min(minLat, y); maxLat = Math.max(maxLat, y); }
const scale = (W - 2 * PAD) / ((maxLon - minLon) * K);
const H = Math.round((maxLat - minLat) * scale + 2 * PAD);
const proj = ([lon, lat]) => [PAD + (lon - minLon) * K * scale, PAD + (maxLat - lat) * scale];

// Douglas-Peucker in projected space
function dp(pts, eps) {
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  let dmax = 0, idx = 0;
  const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + b[0] * a[1] - b[1] * a[0]) / len;
    if (d > dmax) { dmax = d; idx = i; }
  }
  if (dmax > eps) return [...dp(pts.slice(0, idx + 1), eps).slice(0, -1), ...dp(pts.slice(idx), eps)];
  return [a, b];
}
const projected = ring.map(proj);
const mid = Math.floor(projected.length / 2);
const simple = [...dp(projected.slice(0, mid + 1), 1.5).slice(0, -1), ...dp(projected.slice(mid), 1.5)];
const d = 'M' + simple.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z';

// [lon, lat]
const CITIES = {
  biratnagar: ['Biratnagar', 87.2718, 26.4525],
  birgunj: ['Birgunj', 84.8770, 27.0104],
  butwal: ['Butwal', 83.4485, 27.7006],
  pokhara: ['Pokhara', 83.9856, 28.2096],
  nepalgunj: ['Nepalgunj', 81.6167, 28.0500],
  janakpur: ['Janakpur', 85.9254, 26.7288],
  chitwan: ['Chitwan', 84.4333, 27.6833],
  lahan: ['Lahan', 86.4944, 26.7236],
  dang: ['Dang', 82.4864, 28.0417],
  surkhet: ['Surkhet', 81.6167, 28.6000],
  katari: ['Katari', 86.4167, 26.9167],
  udayapur: ['Udayapur', 86.7000, 26.8000],
  rautahat: ['Rautahat', 85.2833, 26.7667],
  birtamode: ['Birtamode', 87.9833, 26.6500],
  bhairahawa: ['Bhairahawa', 83.4500, 27.5000],
  simara: ['Simara', 84.9833, 27.1667],
  hetauda: ['Hetauda', 85.0333, 27.4167],
  narayanghat: ['Narayanghat', 84.4167, 27.7000],
  dharan: ['Dharan', 87.2833, 26.8125],
  itahari: ['Itahari', 87.2741, 26.6647],
  nuwakot: ['Nuwakot', 85.1667, 27.9167],
  damak: ['Damak', 87.7000, 26.6667],
  // extra locations used only by the Partners map
  jhapa: ['Jhapa', 87.8500, 26.6000],
  mahendranagar: ['Mahendranagar', 80.1833, 28.9667],
};
const pins = {};
const inside = ([x, y]) => { // ray casting on the real outline
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};
const problems = [];
for (const [k, [name, lon, lat]] of Object.entries(CITIES)) {
  const [x, y] = proj([lon, lat]);
  pins[k] = { name, x: +x.toFixed(1), y: +y.toFixed(1), lon, lat };
  if (!inside([lon, lat])) problems.push(name);
}
const data = { viewBox: `0 0 ${W} ${H}`, width: W, height: H, outline: d, points: simple.length, pins };
writeFileSync(OUT + 'nepal-map.json', JSON.stringify(data, null, 1));
writeFileSync(OUT + 'nepal-map.js', 'window.NEPAL_MAP=' + JSON.stringify(data) + ';\n');
// a standalone svg so the outline can also be dropped into <img>
writeFileSync(OUT + 'nepal-outline.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><path d="${d}" fill="none" stroke="#009AD4" stroke-width="2" stroke-linejoin="round"/></svg>\n`);
console.log(JSON.stringify({ viewBox: data.viewBox, points: simple.length, outside: problems }));
