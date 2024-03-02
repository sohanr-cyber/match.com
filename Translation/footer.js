const dict = {
  c: {
    en: 'At MuslimMatch.com, we believe in fostering meaningful connections grounded in faith, culture, and shared values. Our platform is dedicated to helping individuals within the Muslim community find their ideal life partners while upholding the principles of Islam',
    bn: 'MuslimMatch.com-এ, আমরা বিশ্বাস, সংস্কৃতি এবং ভাগ করা মূল্যবোধের ভিত্তিতে অর্থপূর্ণ সংযোগ গড়ে তুলতে বিশ্বাস করি। আমাদের প্ল্যাটফর্মটি ইসলামের নীতিগুলি সমুন্নত রেখে মুসলিম সম্প্রদায়ের মধ্যে ব্যক্তিদের তাদের আদর্শ জীবন সঙ্গী খুঁজে পেতে সহায়তা করার জন্য নিবেদিত'
  },
  h1: {
    en: 'Our Site',
    bn: 'আমাদের সাইট'
  },
  h2: {
    en: 'Contact Us',
    bn: 'যোগাযোগ করুন'
  },
  home: {
    en: 'Home',
    bn: 'হোম'
  },
  search: {
    en: 'Search',
    bn: 'খুঁজুন'
  },
  plans: {
    en: 'Plans',
    bn: 'প্ল্যান'
  },
  software: {
    en: 'Our Software',
    bn: 'আমাদের সফটওয়্যার'
  },
  privacy: {
    en: 'Privacy Policy',
    bn: 'গোপনীয়তা নীতি'
  },
  terms: {
    en: 'Terms & Condition',
    bn: 'শর্তাবলী'
  },
  mail: {
    en: 'Mail Us',
    bn: 'আমাদের মেইল ​​করুন'
  },
  call: {
    en: 'Call Us',
    bn: 'আমাদের কল করুন'
  }
}
const getText = (key, ln) => {
  if (ln == 'en-US') {
    ln = 'en'
  }
  if (ln == 'fr') {
    ln = 'bn'
  }

  return dict[key][ln]
}

export { getText }
