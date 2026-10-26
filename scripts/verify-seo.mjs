import fs from 'fs';
const h = fs.readFileSync('dist/index.html', 'utf8');
const checks = {
  'visitor title': h.includes('<title>চন্দ্রিমা উদ্যান (Chandrima Udyan), ঢাকা'),
  'description names place and lake': /name="description" content="[^"]*ক্রিসেন্ট লেক/.test(h),
  'dated Maps snapshot': h.includes('২৭,৪৫৪') && h.includes('২৫ অক্টোবর ২০২৬'),
  'FAQ visible': h.includes('চন্দ্রিমা উদ্যান কতক্ষণ খোলা থাকে?'),
  'canonical apex HTTPS': h.includes('rel="canonical" href="https://chandrimaudyan.com/"'),
  'og:url apex HTTPS': h.includes('og:url" content="https://chandrimaudyan.com/"'),
  'no unconditional hours/rating/free schema': !/openingHoursSpecification|aggregateRating|isAccessibleForFree/.test(h),
  'Bengali locale': h.includes('lang="bn-BD"'),
  'photo source links': h.includes('creativecommons.org/licenses/by-sa/3.0/'),
};
let fail = 0;
for (const k of Object.keys(checks)) {
  if (!checks[k]) fail++;
  console.log((checks[k] ? 'OK   ' : 'FAIL ') + k);
}
// show title & description
const t = h.match(/<title>([^<]*)<\/title>/);
const d = h.match(/<meta name="description" content="([^"]*)"/);
console.log('\nTITLE: ' + (t ? t[1] : '(missing)'));
console.log('DESC : ' + (d ? d[1] : '(missing)'));
console.log(fail === 0 ? '\nALL SEO CHECKS PASSED' : `\n${fail} CHECK(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
