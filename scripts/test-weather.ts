import { buildSuggestions, kmhToBeaufort } from '../src/lib/weather.ts';

function mk(code: number, temp: number, wind: number, uv: number, pop: number, tmax = temp, tmin = temp - 4) {
  return {
    temp, feels: temp - 1, hum: 60, wind, code, uv,
    days: [{ code, tmax, tmin, pop, uv, label: 'আজ', date: '২৩ সেপ্টেম্বর' }],
  } as any;
}

let fail = 0;
const assert = (name: string, cond: boolean) => { if (!cond) { fail++; console.log('FAIL ' + name); } else console.log('OK   ' + name); };

// 1) Thunderstorm + wind -> risk present, raincoat item, shelter plan
const s1 = buildSuggestions(mk(95, 28, 45, 6, 80, 30, 25));
assert('storm: risk shown', !!s1.risk && s1.risk.includes('বজ্রবৃষ্টি'));
assert('storm: raincoat item', s1.items.some((x: string) => x.includes('রেইনকোট')));
assert('storm: shelter plan', s1.plan.some((x: string) => x.includes('আশ্রয়')));

// 2) Hot + strong UV, clear -> no risk, sun items, sunny plan
const s2 = buildSuggestions(mk(0, 34, 8, 9, 0, 34, 26));
assert('hot: no risk', s2.risk === null);
assert('hot: sunscreen+hat+glasses item', s2.items.some((x: string) => x.includes('সানস্ক্রিন, টুপি, সানগ্লাস')));
assert('hot: sunny plan', s2.plan.some((x: string) => x.includes('সূর্যোদয়')));
assert('hot: uv outfit', s2.outfit.some((x: string) => x.includes('UV সূচক')));

// 3) Moderate rain + high pop -> umbrella item, wet-path plan, no risk
const s3 = buildSuggestions(mk(61, 26, 18, 3, 70, 27, 24));
assert('rain: umbrella/raincoat item', s3.items.some((x: string) => x.includes('ছাতা') || x.includes('রেইনকোট')));
assert('rain: wet-path plan', s3.plan.some((x: string) => x.includes('ভেজা পথে')));
assert('rain: no risk', s3.risk === null);

// 4) Mild clear day -> dynamic hide: minimal items, no risk
const s4 = buildSuggestions(mk(1, 28, 8, 4, 0, 29, 24));
assert('mild: no risk', s4.risk === null);
assert('mild: outfit mostly empty or mild', s4.outfit.length <= 1);

// 5) Beaufort conversion sanity
assert('beaufort 8km/h ~2', kmhToBeaufort(8) === 2);
assert('beaufort 60km/h >=7', kmhToBeaufort(60) >= 7);

console.log(fail === 0 ? '\nALL UNIT CHECKS PASSED' : `\n${fail} UNIT CHECK(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
