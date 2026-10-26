import fs from 'fs';
const h = fs.readFileSync('dist/index.html', 'utf8');
const seeded = h.includes('id="weather-seed"');
const checks = {
  'weather section': h.includes('id="weather-root"'),
  'seven-day heading': h.includes('৭ দিনের পূর্বাভাস'),
  'compiled refresh module': /src="[^"]*Weather\.astro/.test(h),
  'snapshot or explicit unavailable': seeded ? h.includes('class="wx-days"') : h.includes('আবহাওয়ার তথ্য এখন পাওয়া যাচ্ছে না'),
  'provider attribution': h.includes('https://open-meteo.com/'),
};
let fail = 0;
for (const k of Object.keys(checks)) {
  if (!checks[k]) fail++;
  console.log((checks[k] ? 'OK   ' : 'FAIL ') + k);
}
console.log(fail === 0 ? '\nALL WEATHER CHECKS PASSED' : `\n${fail} CHECK(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
