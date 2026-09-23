import fs from 'fs';
const h = fs.readFileSync('dist/index.html', 'utf8');
const checks = {
  'title has খোলার সময়': h.includes('<title>চন্দ্রিমা উদ্যান (Chandrima Udyan), ঢাকা — খোলার সময়'),
  'meta description leads with opening hours': h.includes('content="চন্দ্রিমা উদ্যান (Chandrima Udyan)-এর খোলার সময় সকাল ৬টা থেকে রাত ৯টা'),
  'hero meta shows opening hours': h.includes('খোলা: সকাল ৬টা–রাত ৯টা'),
  'opening-hours FAQ present': h.includes('চন্দ্রিমা উদ্যান কতক্ষণ খোলা থাকে?'),
  'FAQPage schema has hours Q': h.includes('"কন্দ্রিমা উদ্যান কতক্ষণ খোলা থাকে?"') || h.includes('চন্দ্রিমা উদ্যান কতক্ষণ খোলা থাকে'),
  'canonical is https non-www': h.includes('rel="canonical" href="https://chandrimaudyan.com/"'),
  'og:url https non-www': h.includes('og:url" content="https://chandrimaudyan.com/"'),
  'TouristAttraction openingHours 06:00-21:00': h.includes('"opens":"06:00"') && h.includes('"closes":"21:00"'),
  'lang bn-BD': h.includes('lang="bn-BD"'),
  'no stray http:// canonical': !h.includes('http://chandrimaudyan.com'),
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
