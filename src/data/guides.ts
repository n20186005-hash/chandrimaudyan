export interface GuideEntry {
  href: string;
  hrefEn: string;
  label: string;
  labelEn: string;
}

export interface GuideCluster {
  key: string;
  title: string;
  titleEn: string;
  note: string;
  noteEn: string;
  items: GuideEntry[];
}

export const guideClusters: GuideCluster[] = [
  {
    key: 'park',
    title: 'উদ্যান, ইতিহাস ও সংস্কৃতি',
    titleEn: 'The park, history and culture',
    note: 'চন্দ্রিমা উদ্যানের ইতিহাস, নাম, স্মৃতিস্থাপনা, লেক ও সেতু নিয়ে বিস্তারিত।',
    noteEn: 'History, naming, the memorial complex, the lake and the bridge, explained in detail.',
    items: [
      { href: '/history/', hrefEn: '/en/history/', label: 'চন্দ্রিমা উদ্যানের ইতিহাস', labelEn: 'History of Chandrima Udyan' },
      { href: '/zia-udyan-name/', hrefEn: '/en/zia-udyan-name/', label: 'নাম ও পরিচিতি: চন্দ্রিমা উদ্যান বনাম জিয়া উদ্যান', labelEn: 'Name and identity: Chandrima Udyan vs Zia Udyan' },
      { href: '/ziaur-rahman-mausoleum/', hrefEn: '/en/ziaur-rahman-mausoleum/', label: 'জিয়াউর রহমানের সমাধি কমপ্লেক্স', labelEn: 'Ziaur Rahman mausoleum complex' },
      { href: '/crescent-lake/', hrefEn: '/en/crescent-lake/', label: 'ক্রিসেন্ট লেক ভ্রমণ নির্দেশিকা', labelEn: 'Crescent Lake visitor guide' },
      { href: '/crescent-lake-bridge/', hrefEn: '/en/crescent-lake-bridge/', label: 'ক্রিসেন্ট লেকের আর্চ সেতু', labelEn: 'The arch bridge over Crescent Lake' },
      { href: '/memorial-complex/', hrefEn: '/en/memorial-complex/', label: 'স্মৃতিস্থাপনা, মসজিদ ও শিষ্টাচার', labelEn: 'Memorial complex, mosque and etiquette' },
      { href: '/park-map-entrances/', hrefEn: '/en/park-map-entrances/', label: 'উদ্যানের ম্যাপ ও প্রবেশপথ', labelEn: 'Park map, address and entrances' },
      { href: '/walking-photo-route/', hrefEn: '/en/walking-photo-route/', label: 'হাঁটা ও ছবি তোলার রুট', labelEn: 'Walking and photography route' },
    ],
  },
  {
    key: 'plan',
    title: 'পরিকল্পনা ও সাধারণ প্রশ্ন',
    titleEn: 'Planning and common questions',
    note: 'খোলার সময়, খরচ, কতক্ষণ লাগে, নিরাপত্তা, সুবিধা ও পরিবার-ভিত্তিক পরামর্শ।',
    noteEn: 'Opening times, costs, how long a visit takes, safety, facilities and family advice.',
    items: [
      { href: '/opening-hours/', hrefEn: '/en/opening-hours/', label: 'খোলার সময় ও সময়সূচি', labelEn: 'Opening hours and schedule' },
      { href: '/admission-fees/', hrefEn: '/en/admission-fees/', label: 'টিকিট ও ভ্রমণ খরচ', labelEn: 'Tickets and visit costs' },
      { href: '/visit-duration/', hrefEn: '/en/visit-duration/', label: 'কতক্ষণ সময় লাগে', labelEn: 'How long a visit takes' },
      { href: '/best-time-to-visit/', hrefEn: '/en/best-time-to-visit/', label: 'ভ্রমণের সেরা সময়', labelEn: 'Best time to visit' },
      { href: '/family-guide/', hrefEn: '/en/family-guide/', label: 'পরিবার ও শিশুদের জন্য নির্দেশিকা', labelEn: 'Family and children guide' },
      { href: '/accessibility/', hrefEn: '/en/accessibility/', label: 'প্রতিবন্ধী ও প্রবীণ দর্শনার্থী নির্দেশিকা', labelEn: 'Accessibility and older visitors' },
      { href: '/visitor-facilities/', hrefEn: '/en/visitor-facilities/', label: 'দর্শনার্থীর সুবিধা', labelEn: 'Visitor facilities' },
      { href: '/safety-and-etiquette/', hrefEn: '/en/safety-and-etiquette/', label: 'নিরাপত্তা ও শিষ্টাচার', labelEn: 'Safety and etiquette' },
      { href: '/monsoon-visit/', hrefEn: '/en/monsoon-visit/', label: 'বর্ষায় ভ্রমণ নির্দেশিকা', labelEn: 'Visiting in the monsoon' },
    ],
  },
  {
    key: 'transport',
    title: 'যাতায়াত ও পৌঁছানোর রুট',
    titleEn: 'Getting there and routes',
    note: 'মেট্রো, বাস, সিএনজি, রাইড-শেয়ার ও পার্কিং—শহরের বিভিন্ন স্থান থেকে পৌঁছানোর উপায়।',
    noteEn: 'Metro, bus, CNG, ride-share and parking — how to reach the park from across the city.',
    items: [
      { href: '/how-to-get-there/', hrefEn: '/en/how-to-get-there/', label: 'চন্দ্রিমা উদ্যানে কীভাবে যাবেন', labelEn: 'How to get to Chandrima Udyan' },
      { href: '/metro-bijoy-sarani/', hrefEn: '/en/metro-bijoy-sarani/', label: 'বিজয় সরণি মেট্রো স্টেশন থেকে', labelEn: 'From Bijoy Sarani metro station' },
      { href: '/metro-agargaon/', hrefEn: '/en/metro-agargaon/', label: 'আগারগাঁও মেট্রো স্টেশন থেকে', labelEn: 'From Agargaon metro station' },
      { href: '/from-farmgate/', hrefEn: '/en/from-farmgate/', label: 'ফার্মগেট থেকে কীভাবে যাবেন', labelEn: 'From Farmgate' },
      { href: '/from-dhanmondi/', hrefEn: '/en/from-dhanmondi/', label: 'ধানমন্ডি থেকে কীভাবে যাবেন', labelEn: 'From Dhanmondi' },
      { href: '/from-mirpur/', hrefEn: '/en/from-mirpur/', label: 'মিরপুর থেকে কীভাবে যাবেন', labelEn: 'From Mirpur' },
      { href: '/from-dhaka-airport/', hrefEn: '/en/from-dhaka-airport/', label: 'ঢাকা বিমানবন্দর থেকে কীভাবে যাবেন', labelEn: 'From Dhaka airport' },
      { href: '/parking-and-dropoff/', hrefEn: '/en/parking-and-dropoff/', label: 'পার্কিং ও রাইড-শেয়ার নামার স্থান', labelEn: 'Parking and ride-share drop-off' },
    ],
  },
  {
    key: 'nearby',
    title: 'কাছাকাছি দেখা, খাওয়া ও বিনোদন',
    titleEn: 'Nearby sights, food and entertainment',
    note: 'সংসদ ভবন, জাদুঘর, থিয়েটার এবং উদ্যানের আশপাশের খাবার ও ক্যাফে।',
    noteEn: 'The parliament building, museums, a planetarium, plus nearby food and cafés.',
    items: [
      { href: '/nearby/national-parliament/', hrefEn: '/en/nearby/national-parliament/', label: 'জাতীয় সংসদ ভবন', labelEn: 'National Parliament House' },
      { href: '/nearby/manik-mia-avenue/', hrefEn: '/en/nearby/manik-mia-avenue/', label: 'মানিক মিয়া অ্যাভিনিউ', labelEn: 'Manik Mia Avenue' },
      { href: '/nearby/military-museum/', hrefEn: '/en/nearby/military-museum/', label: 'বঙ্গবন্ধু সামরিক জাদুঘর', labelEn: 'Bangladesh Military Museum' },
      { href: '/nearby/novo-theatre/', hrefEn: '/en/nearby/novo-theatre/', label: 'নভো থিয়েটার', labelEn: 'Novo Theatre planetarium' },
      { href: '/nearby/science-museum/', hrefEn: '/en/nearby/science-museum/', label: 'জাতীয় বিজ্ঞান ও প্রযুক্তি জাদুঘর', labelEn: 'National Museum of Science and Technology' },
      { href: '/nearby/air-force-museum/', hrefEn: '/en/nearby/air-force-museum/', label: 'বাংলাদেশ বিমান বাহিনী জাদুঘর', labelEn: 'Bangladesh Air Force Museum' },
      { href: '/food/bijoy-sarani-restaurants/', hrefEn: '/en/food/bijoy-sarani-restaurants/', label: 'বিজয় সরণি এলাকার রেস্তোরাঁ', labelEn: 'Restaurants around Bijoy Sarani' },
      { href: '/food/coffee-and-tea/', hrefEn: '/en/food/coffee-and-tea/', label: 'ক্যাফে ও চা', labelEn: 'Cafés and tea' },
      { href: '/food/quick-snacks/', hrefEn: '/en/food/quick-snacks/', label: 'দ্রুত খাবার ও নাশতা', labelEn: 'Quick meals and snacks' },
      { href: '/entertainment/military-museum-cinema/', hrefEn: '/en/entertainment/military-museum-cinema/', label: 'সামরিক জাদুঘরের সিনেমা হল', labelEn: 'The cinema at the Military Museum' },
    ],
  },
  {
    key: 'itineraries',
    title: 'ভ্রমণ পরিকল্পনা',
    titleEn: 'Trip plans',
    note: 'সময়, বাজেট ও সঙ্গী অনুযায়ী তৈরি রেডিমেড রুট।',
    noteEn: 'Ready-made routes shaped by your time, budget and travel companions.',
    items: [
      { href: '/itineraries/park-parliament-2-hours/', hrefEn: '/en/itineraries/park-parliament-2-hours/', label: '২ ঘণ্টার রুট: উদ্যান ও সংসদ ভবন', labelEn: 'Two hours: the park and the parliament building' },
      { href: '/itineraries/park-museum-half-day/', hrefEn: '/en/itineraries/park-museum-half-day/', label: 'অর্ধদিবস: উদ্যান ও সামরিক জাদুঘর', labelEn: 'Half day: the park and the Military Museum' },
      { href: '/itineraries/family-science-day/', hrefEn: '/en/itineraries/family-science-day/', label: 'শিশুদের সঙ্গে বিজ্ঞান-দিন', labelEn: 'A science day out with children' },
      { href: '/itineraries/history-architecture/', hrefEn: '/en/itineraries/history-architecture/', label: 'ইতিহাস ও স্থাপত্য রুট', labelEn: 'History and architecture route' },
      { href: '/itineraries/car-free-metro-trip/', hrefEn: '/en/itineraries/car-free-metro-trip/', label: 'মেট্রোতে গাড়িবিহীন ভ্রমণ', labelEn: 'A car-free metro trip' },
      { href: '/itineraries/rainy-day-alternatives/', hrefEn: '/en/itineraries/rainy-day-alternatives/', label: 'বৃষ্টির দিনের বিকল্প পরিকল্পনা', labelEn: 'Rainy day alternatives' },
      { href: '/itineraries/budget-day-trip/', hrefEn: '/en/itineraries/budget-day-trip/', label: 'কম খরচের ভ্রমণ', labelEn: 'A low-budget day trip' },
    ],
  },
];

export const allGuides: GuideEntry[] = guideClusters.flatMap((cluster) => cluster.items);

/** Map from a Bengali guide path to its English counterpart, and back. */
export const guidePairs: Record<string, string> = allGuides.reduce((acc, g) => {
  acc[g.href] = g.hrefEn;
  acc[g.hrefEn] = g.href;
  return acc;
}, {} as Record<string, string>);

export function altGuidePath(pathname: string): string | undefined {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return guidePairs[normalized];
}
