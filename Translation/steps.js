const dict = {
  h1: {
    en: 'How You Can Coneect With Us',
    bn: ''
  },
  p: {
    en: 'Get Started In 3 Easy Steps',
    bn: '3 টি সহজ ধাপে শুরু করুন৷'
  },
  c1h: {
    en: 'Create Your Profile',
    bn: 'আপনার প্রোফাইল তৈরি করুন'
  },
  c1p: {
    en: 'Create your profile with required data',
    bn: 'প্রয়োজনীয় ডেটা দিয়ে আপনার প্রোফাইল তৈরি করুন'
  },
  c2h: {
    en: 'Search Your Partner',
    bn: 'আপনার জীবনসঙ্গী খুঁজুন'
  },
  c2p: {
    en: 'Browse to search your partne',
    bn: 'আপনার জীবনসঙ্গী অনুসন্ধান করতে ব্রাউজ করুন'
  },
  c3h: {
    en: 'Start Communication',
    bn: 'যোগাযোগ করুন'
  },
  c3p: {
    en: 'Start communicating by sending proposal',
    bn: 'প্রস্তাব পাঠিয়ে যোগাযোগ শুরু করুন'
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
