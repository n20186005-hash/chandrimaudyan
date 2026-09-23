import fs from 'fs';
const h = fs.readFileSync('dist/index.html', 'utf8');
const checks = {
  'forbidden weather "free" comment removed': !h.includes('বিনামূল্যে মুক্ত আবহাওয়া') && !h.includes('Open-Meteo-র বিনামূল্যে'),
  'forbidden ট্র্যাকিং কুকি removed': !h.includes('ট্র্যাকিং কুকি'),
  'season section #ঋতু': h.includes('id="ঋতু"'),
  'route section #রুট': h.includes('id="রুট"'),
  'responsibility section #দায়িত্ব': h.includes('id="দায়িত্ব"'),
  'transport section #যাতায়াত': h.includes('id="যাতায়াত"'),
  'airport content': h.includes('বিমানবন্দর'),
  '7-day heading': h.includes('৭ দিনের পূর্বাভাস'),
  'jsonld image array': h.includes('"image":["https://chandrimaudyan.com/images/chandrima-bridge.jpg"]'),
  'reviewCount 27320': h.includes('27320'),
  'og:site_name guide format': h.includes('ঢাকা ভ্রমণ নির্দেশিকা'),
  'umbrella advice text': h.includes('ছাতা'),
  'seasonal table': h.includes('ঋতুভিত্তিক ভ্রমণ কৌশল'),
  'itinerary groups': h.includes('পারিবারিক'),
  'responsibility water': h.includes('লেকের পানি'),
};
let fail = 0;
for (const k of Object.keys(checks)) {
  const ok = checks[k];
  if (!ok) fail++;
  console.log((ok ? 'OK   ' : 'FAIL ') + k);
}
console.log(fail === 0 ? '\nALL CHECKS PASSED' : `\n${fail} CHECK(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
