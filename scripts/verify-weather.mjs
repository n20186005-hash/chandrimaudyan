import fs from 'fs';
const h = fs.readFileSync('dist/index.html', 'utf8');
const checks = {
  'risk bar class': h.includes('wx-risk'),
  'outfit block label যাত্রার পোশাক': h.includes('যাত্রার পোশাক'),
  'plan block label ঘোরার পরিকল্পনা': h.includes('ঘোরার পরিকল্পনা'),
  'items block label সঙ্গে রাখুন': h.includes('সঙ্গে রাখুন'),
  'wx-sug-block present': h.includes('wx-sug-block'),
  'old wx-advice removed': !h.includes('wx-advice'),
  'today pop stat present': h.includes('বৃষ্টির সম্ভাবনা'),
  'no forbidden free comment': !h.includes('বিনামূল্যে মুক্ত আবহাওয়া') && !h.includes('Open-Meteo-র বিনামূল্যে'),
  '7-day heading': h.includes('৭ দিনের পূর্বাভাস'),
};
let fail = 0;
for (const k of Object.keys(checks)) {
  if (!checks[k]) fail++;
  console.log((checks[k] ? 'OK   ' : 'FAIL ') + k);
}
console.log(fail === 0 ? '\nALL WEATHER CHECKS PASSED' : `\n${fail} CHECK(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
