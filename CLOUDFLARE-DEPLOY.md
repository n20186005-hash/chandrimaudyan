# Cloudflare Workers ডেপ্লয়

1. Node.js 24.20.0 ব্যবহার করুন (`.node-version` ও `engines`-এ পিন করা)।
2. Corepack চালু করুন এবং প্রকল্পে নির্ধারিত pnpm 11.25.0 ব্যবহার করুন।
3. চূড়ান্ত ডোমেইন থাকলে build পরিবেশে `PUBLIC_SITE_URL` সেট করুন।
4. ইনস্টল ও যাচাই:
   - `CI=1 corepack pnpm install --frozen-lockfile`
   - `pnpm check`
   - `pnpm build`
5. ডেপ্লয়: `pnpm deploy`

সাইটটি Astro static build হিসেবে তৈরি হয় এবং Wrangler-এর Workers Static Assets কনফিগারেশন দিয়ে Cloudflare Workers-এ প্রকাশিত হয়। কোনো ডাটাবেস, লগইন বা CMS নেই।
