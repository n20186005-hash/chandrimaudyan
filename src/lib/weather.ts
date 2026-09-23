export const API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=23.766533&longitude=90.378693&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max&timezone=Asia%2FDhaka&forecast_days=7';

const BN_D = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const MONTHS = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
const W_NAMES = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];

export function toBn(v: number | string): string {
  return String(v).replace(/\d/g, (d) => BN_D[+d]);
}

const CODES: Record<number, { ic: string; bn: string }> = {
  0: { ic: '☀️', bn: 'পরিষ্কার আকাশ' }, 1: { ic: '🌤️', bn: 'প্রায় পরিষ্কার' },
  2: { ic: '⛅', bn: 'আংশিক মেঘ' }, 3: { ic: '☁️', bn: 'মেঘলা' },
  45: { ic: '🌫️', bn: 'কুয়াশা' }, 48: { ic: '🌫️', bn: 'কুয়াশা' },
  51: { ic: '🌦️', bn: 'হালকা গুঁড়ি বৃষ্টি' }, 53: { ic: '🌦️', bn: 'গুঁড়ি বৃষ্টি' }, 55: { ic: '🌦️', bn: 'ঘন গুঁড়ি বৃষ্টি' },
  61: { ic: '🌧️', bn: 'হালকা বৃষ্টি' }, 63: { ic: '🌧️', bn: 'মাঝারি বৃষ্টি' }, 65: { ic: '🌧️', bn: 'ভারী বৃষ্টি' },
  66: { ic: '🌧️', bn: 'বরফমিশ্রিত বৃষ্টি' }, 67: { ic: '🌧️', bn: 'বরফমিশ্রিত ভারী বৃষ্টি' },
  71: { ic: '🌨️', bn: 'হালকা তুষারপাত' }, 73: { ic: '🌨️', bn: 'তুষারপাত' }, 75: { ic: '🌨️', bn: 'ভারী তুষারপাত' }, 77: { ic: '❄️', bn: 'তুষারকণা' },
  80: { ic: '🌦️', bn: 'বিক্ষিপ্ত বৃষ্টি' }, 81: { ic: '🌧️', bn: 'বিক্ষিপ্ত বৃষ্টি' }, 82: { ic: '⛈️', bn: 'দমকা বৃষ্টি' },
  85: { ic: '🌨️', bn: 'বিক্ষিপ্ত তুষার' }, 86: { ic: '🌨️', bn: 'বিক্ষিপ্ত ভারী তুষার' },
  95: { ic: '⛈️', bn: 'বজ্রসহ বৃষ্টি' }, 96: { ic: '⛈️', bn: 'শিলাসহ বজ্রঝড়' }, 99: { ic: '⛈️', bn: 'প্রচণ্ড বজ্রঝড়' },
};

export function codeInfo(c: number): { ic: string; bn: string } {
  return CODES[c] || { ic: '🌤️', bn: 'পরিবর্তনশীল আকাশ' };
}

function pUTC(d: string): Date {
  return new Date(d.slice(0, 10) + 'T12:00:00Z');
}

const RAIN = new Set([51, 53, 55, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]);
const STORM = new Set([82, 95, 96, 99]);

export interface Wx {
  temp: number; feels: number; hum: number; wind: number; code: number; uv: number;
  days: { code: number; tmax: number; tmin: number; pop: number; uv: number; label: string; date: string }[];
}

export function normalize(raw: any): Wx | null {
  if (!raw || !raw.current || !raw.daily) return null;
  const cur = raw.current;
  const days = (raw.daily.time || []).map((t: string, i: number) => ({
    code: Number(raw.daily.weather_code?.[i] ?? 0),
    tmax: Math.round(raw.daily.temperature_2m_max?.[i] ?? 0),
    tmin: Math.round(raw.daily.temperature_2m_min?.[i] ?? 0),
    pop: Math.round(raw.daily.precipitation_probability_max?.[i] ?? 0),
    uv: Math.round(raw.daily.uv_index_max?.[i] ?? 0),
    label: i === 0 ? 'আজ' : i === 1 ? 'আগামীকাল' : W_NAMES[pUTC(t).getUTCDay()],
    date: toBn(pUTC(t).getUTCDate()) + ' ' + MONTHS[pUTC(t).getUTCMonth()],
  }));
  return {
    temp: Math.round(cur.temperature_2m),
    feels: Math.round(cur.apparent_temperature),
    hum: Math.round(cur.relative_humidity_2m),
    wind: Math.round(cur.wind_speed_10m),
    code: Number(cur.weather_code),
    uv: Math.round(cur.uv_index ?? 0),
    days,
  };
}

export function fmtUpdated(t: string): string {
  const d = new Date(t);
  const hh = toBn(String(d.getHours()).padStart(2, '0'));
  const mm = toBn(String(d.getMinutes()).padStart(2, '0'));
  return toBn(d.getDate()) + ' ' + MONTHS[d.getMonth()] + ', ' + hh + ':' + mm + ' (ঢাকা সময়)';
}

// Visitors only care about "will it rain / what to bring" — so we derive concrete, human-readable
// advice from the forecast itself (no API/branding wording). Each block is built from conditions
// that actually match, and the red risk line only appears for severe weather.
export function kmhToBeaufort(kmh: number): number {
  const b = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117];
  let i = 0;
  while (i < b.length && kmh > b[i]) i++;
  return i;
}

export interface Suggestions {
  risk: string | null;
  outfit: string[]; // যাত্রার পোশাক (出行穿搭)
  plan: string[];   // ঘোরার পরিকল্পনা (游玩安排)
  items: string[];  // সঙ্গে রাখুন (随身物品)
}

export function buildSuggestions(w: Wx): Suggestions {
  const today = w.days[0];
  const code = w.code;
  const tmax = today ? today.tmax : w.temp;
  const tmin = today ? today.tmin : w.temp;
  const pop = today ? today.pop : 0;
  const uv = today ? Math.max(today.uv, w.uv) : w.uv;
  const temp = w.temp;
  const beau = kmhToBeaufort(w.wind);
  const outfit: string[] = [];
  const plan: string[] = [];
  const items: string[] = [];
  let risk: string | null = null;

  // বৃষ্টি / বজ্রবৃষ্টি
  if (STORM.has(code)) {
    risk = 'বজ্রবৃষ্টি সতর্কতা—গাছের নিচে আশ্রয় না নিয়ে নিরাপদ ছায়ায় থাকুন; উন্মুক্ত জায়গায় না থেকে বিশ্রাম নিন।';
    plan.push('খোলা জায়গায় থাকা কমিয়ে নিরাপদ আশ্রয় নিন');
    items.push('রেইনকোট (বাতাসে লম্বা ছাতা সুবিধাজনক নয়)');
  } else if (code === 65 || code === 67 || (code >= 80 && code <= 82)) {
    risk = 'বৃষ্টি তুলনামূলক বেশি—লেকের ধার ও নিচু জায়গা এড়িয়ে চলুন।';
    plan.push('খোলা মাঠে দীর্ঘ ঘোরাঘুরি এড়িয়ে ছায়ায় থাকুন');
  } else if (code >= 51 && code <= 67) {
    plan.push('হালকা বৃষ্টিতে রাস্তা পিচ্ছিল—ধীরে হাঁটুন');
    items.push('ভাঁজযোগ্য ছাতা');
  }
  if (pop >= 60 || RAIN.has(code)) {
    if (!items.includes('ভাঁজযোগ্য ছাতা')) items.push('ছাতা বা রেইনকোট সঙ্গে রাখুন');
    if (!plan.includes('খোলা মাঠে দীর্ঘ ঘোরাঘুরি এড়িয়ে ছায়ায় থাকুন'))
      plan.push('ভেজা পথে সাবধানে চলুন; লেকের ধারের খোলা জায়গা এড়িয়ে ছায়ায় বিশ্রাম নিন');
  }

  // তাপ ও UV
  if (temp >= 32 || tmax >= 32) {
    outfit.push('তাপ বেশি—দুপুরের তীব্র রোদ এড়িয়ে চলুন');
    plan.push('দুপুরে খোলা জায়গায় ঘোরার সময় কমিয়ে ছায়ায় থাকুন');
    items.push('সানস্ক্রিন, সানগ্লাস, পর্যাপ্ত পানি');
  }
  if (uv >= 8) {
    outfit.push('UV সূচক বেশি—সানস্ক্রিন ব্যবহার করুন');
    items.push('সানস্ক্রিন, টুপি, সানগ্লাস');
  } else if (uv >= 5) {
    items.push('সানস্ক্রিন ও টুপি');
  }

  // ঠাণ্ডা ও তাপমাত্রার পার্থক্য
  if (tmax - tmin > 8) {
    outfit.push('দিন-রাতের তাপমাত্রার পার্থক্য বেশি—একটি হালকা জ্যাকেট সঙ্গে রাখুন');
  }
  if (tmax <= 10) {
    outfit.push('তাপমাত্রা কম—ঠাণ্ডা থেকে বাঁচতে প্রস্তুত থাকুন');
    items.push('মোটা জ্যাকেট, স্কার্ফ');
  }

  // বাতাস
  if (beau >= 7) {
    risk = risk ?? 'বেশি বাতাস—লেকের ধারের খোলা জায়গা ও বিজ্ঞাপন বোর্ড এড়িয়ে চলুন।';
    plan.push('খোলা জায়গায় দীর্ঘ থাকা কমান');
  } else if (beau >= 5) {
    outfit.push('বাতাস বেশি—ঢিলা লম্বা পোশাক ও উড়ে যাওয়া টুপি এড়িয়ে চলুন');
    plan.push('লেকের ধারে সাবধানে থাকুন');
  }

  // রৌদ্র / মেঘলা
  if (code === 0 || code === 1) {
    plan.push('আবহাওয়া ভালো—খোলা আকাশে হাঁটা ও সূর্যোদয়/সূর্যাস্তের দৃশ্য উপভোগ করুন');
    if (uv < 5 && !items.includes('সানস্ক্রিন ও টুপি')) items.push('সানস্ক্রিন মনে রাখুন');
  } else if (code === 2 || code === 3) {
    plan.push('আলো নরম—ফটোগ্রাফির জন্য ভালো, বেশি সময় বাইরে থাকা যায়');
  }

  // কুয়াশা
  if (code === 45 || code === 48) {
    risk = risk ?? 'কুয়াশায় দৃশ্যমানতা কম—লেকের ধারে সাবধানে হাঁটুন।';
    plan.push('দূরের দৃশ্য কম স্পষ্ট হতে পারে');
  }

  const uniq = (a: string[]) => Array.from(new Set(a));
  return { risk, outfit: uniq(outfit), plan: uniq(plan), items: uniq(items) };
}

export function buildHTML(w: Wx): string {
  const ci = codeInfo(w.code);
  const s = buildSuggestions(w);
  const today = w.days[0];
  const pop = today ? today.pop : 0;
  const sug = (title: string, arr: string[], ic: string) =>
    arr.length
      ? '<div class="wx-sug-block"><h4>' + ic + ' ' + title + '</h4><ul>' +
        arr.map((x) => '<li>' + x + '</li>').join('') + '</ul></div>'
      : '';
  const dayCards = w.days
    .map((dd) => {
      const di = codeInfo(dd.code);
      const dpop = dd.pop > 0 ? '<span class="wx-pop">💧 বৃষ্টি ' + toBn(dd.pop) + '%</span>' : '';
      const duv = dd.uv > 0 ? '<span class="wx-uv">☀️ UV ' + toBn(dd.uv) + '</span>' : '';
      return (
        '<div class="wx-day"><span class="wd">' + dd.label + '</span>' +
        '<span class="wdate">' + dd.date + '</span>' +
        '<span class="wic" role="img" aria-label="' + di.bn + '">' + di.ic + '</span>' +
        '<span class="whi">' + toBn(dd.tmax) + '°</span>' +
        '<span class="wlo">সর্বনিম্ন ' + toBn(dd.tmin) + '°</span>' + dpop + duv + '</div>'
      );
    })
    .join('');
  return (
    (s.risk ? '<div class="wx-risk">⚠️ ' + s.risk + '</div>' : '') +
    '<div class="wx-top">' +
    '<div class="wx-now">' +
    '<span class="wx-ic" role="img" aria-label="' + ci.bn + '">' + ci.ic + '</span>' +
    '<div><span class="wx-temp">' + toBn(w.temp) + '°</span>' +
    '<span class="wx-desc">' + ci.bn + '</span></div></div>' +
    '<ul class="wx-stats">' +
    '<li>অনুভূত: ' + toBn(w.feels) + '°</li>' +
    '<li>আর্দ্রতা: ' + toBn(w.hum) + '%</li>' +
    (pop > 0 ? '<li>বৃষ্টির সম্ভাবনা: ' + toBn(pop) + '%</li>' : '') +
    '<li>বাতাস: ' + toBn(w.wind) + ' কিমি/ঘণ্টা</li>' +
    '<li>UV: ' + toBn(w.uv) + '</li>' +
    '</ul></div>' +
    '<div class="wx-sug">' +
    sug('যাত্রার পোশাক', s.outfit, '👕') +
    sug('ঘোরার পরিকল্পনা', s.plan, '🗺️') +
    sug('সঙ্গে রাখুন', s.items, '🎒') +
    '</div>' +
    '<div class="wx-days">' + dayCards + '</div>'
  );
}
