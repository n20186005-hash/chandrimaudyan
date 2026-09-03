# চন্দ্রিমা উদ্যান ঢাকা ভ্রমণ নির্দেশিকা

Astro + Tailwind CSS + TypeScript + Cloudflare Workers ভিত্তিক সাইট।

## কনফিগারেশন

সাইটের ক্যানোনিক্যাল ডোমেইন `astro.config.mjs`-এ ডিফল্ট হিসেবে `https://chandrimaudyan.com` পিন করা আছে। প্রয়োজনে build পরিবেশে `PUBLIC_SITE_URL` দিয়ে সম্পূর্ণ `https://` URL ওভাররাইড করা যায়।

## কমান্ড

```bash
corepack enable
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm deploy
```

## ছবি

সাইটের HTML/CSS স্থানীয় JPG নাম ব্যবহার করে। এই স্যান্ডবক্সে বহিরাগত বাইনারি ডাউনলোড বন্ধ থাকায় বর্তমান `public/images`-এর JPG গুলো স্পষ্টভাবে চিহ্নিত অস্থায়ী চিত্র; এগুলোকে বাস্তব ছবি হিসেবে গণ্য করবেন না। যাচাইকৃত বাস্তব ছবির সরাসরি URL, filename ও কৃতিত্ব `PHOTO-SOURCES.md`-এ এবং সীমাবদ্ধতার বিবরণ `PHOTO-BINARY-STATUS.md`-এ আছে।

## Google Analytics

GA4 আইডি: `G-HXM22WWPKP`। ব্যবহারকারী কুকি সেটিংসে বিশ্লেষণ সম্মতি না দেওয়া পর্যন্ত loader চালু হয় না।
