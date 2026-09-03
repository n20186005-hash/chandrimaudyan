export const API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=23.766533&longitude=90.378693&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FDhaka&forecast_days=5';

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

export interface Wx {
  temp: number; feels: number; hum: number; wind: number; code: number;
  days: { code: number; tmax: number; tmin: number; pop: number; label: string; date: string }[];
}

export function normalize(raw: any): Wx | null {
  if (!raw || !raw.current || !raw.daily) return null;
  const cur = raw.current;
  const days = (raw.daily.time || []).map((t: string, i: number) => ({
    code: Number(raw.daily.weather_code?.[i] ?? 0),
    tmax: Math.round(raw.daily.temperature_2m_max?.[i] ?? 0),
    tmin: Math.round(raw.daily.temperature_2m_min?.[i] ?? 0),
    pop: Math.round(raw.daily.precipitation_probability_max?.[i] ?? 0),
    label: i === 0 ? 'আজ' : i === 1 ? 'আগামীকাল' : W_NAMES[pUTC(t).getUTCDay()],
    date: toBn(pUTC(t).getUTCDate()) + ' ' + MONTHS[pUTC(t).getUTCMonth()],
  }));
  return {
    temp: Math.round(cur.temperature_2m),
    feels: Math.round(cur.apparent_temperature),
    hum: Math.round(cur.relative_humidity_2m),
    wind: Math.round(cur.wind_speed_10m),
    code: Number(cur.weather_code),
    days,
  };
}

export function fmtUpdated(t: string): string {
  const d = new Date(t);
  const hh = toBn(String(d.getHours()).padStart(2, '0'));
  const mm = toBn(String(d.getMinutes()).padStart(2, '0'));
  return toBn(d.getDate()) + ' ' + MONTHS[d.getMonth()] + ', ' + hh + ':' + mm + ' (ঢাকা সময়)';
}

export function buildHTML(w: Wx): string {
  const ci = codeInfo(w.code);
  const dayCards = w.days
    .map((dd) => {
      const di = codeInfo(dd.code);
      const pop = dd.pop > 0 ? '<span class="wx-pop">💧 বৃষ্টি ' + toBn(dd.pop) + '%</span>' : '';
      return (
        '<div class="wx-day"><span class="wd">' + dd.label + '</span>' +
        '<span class="wdate">' + dd.date + '</span>' +
        '<span class="wic" role="img" aria-label="' + di.bn + '">' + di.ic + '</span>' +
        '<span class="whi">' + toBn(dd.tmax) + '°</span>' +
        '<span class="wlo">সর্বনিম্ন ' + toBn(dd.tmin) + '°</span>' + pop + '</div>'
      );
    })
    .join('');
  return (
    '<div class="wx-top">' +
    '<div class="wx-now">' +
    '<span class="wx-ic" role="img" aria-label="' + ci.bn + '">' + ci.ic + '</span>' +
    '<div><span class="wx-temp">' + toBn(w.temp) + '°</span>' +
    '<span class="wx-desc">' + ci.bn + '</span></div></div>' +
    '<ul class="wx-stats">' +
    '<li>অনুভূত: ' + toBn(w.feels) + '°</li>' +
    '<li>আর্দ্রতা: ' + toBn(w.hum) + '%</li>' +
    '<li>বাতাস: ' + toBn(w.wind) + ' কিমি/ঘণ্টা</li>' +
    '</ul></div>' +
    '<div class="wx-days">' + dayCards + '</div>'
  );
}
