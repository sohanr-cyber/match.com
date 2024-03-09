const dict = {
  title: {
    en: 'Find Your Perfect Match on Muslim Match Maker - Islamic Matrimony Site',
    bn: 'Muslim Match Maker - ইসলামিক ম্যাট্রিমনি সাইটে আপনার নিখুঁত মিল খুঁজুন'
  },
  desc: {
    en: "Welcome to Muslim Match Maker, your trusted platform for Islamic matrimony. Finding a life partner who shares your faith, values, and cultural background is now easier than ever. Our platform is designed to connect Muslim singles worldwide, facilitating meaningful connections that lead to lifelong companionship and happiness. Whether you're looking for love, companionship, or marriage, Muslim Match Maker is here to help you find your perfect match.",
    bn: 'Muslim Match Maker এ স্বাগতম, ইসলামিক বিবাহের জন্য আপনার বিশ্বস্ত প্ল্যাটফর্ম। আপনার বিশ্বাস, মূল্যবোধ এবং সাংস্কৃতিক পটভূমি শেয়ার করে এমন একজন জীবনসঙ্গী খুঁজে পাওয়া এখন আগের চেয়ে সহজ। আমাদের প্ল্যাটফর্মটি বিশ্বব্যাপী মুসলিম এককদের সংযোগ করার জন্য ডিজাইন করা হয়েছে, অর্থপূর্ণ সংযোগগুলিকে সহজতর করে যা আজীবন সাহচর্য এবং সুখের দিকে নিয়ে যায়। আপনি প্রেম, সাহচর্য বা বিবাহ খুঁজছেন কিনা, Muslim Match Maker আপনাকে আপনার নিখুঁত মিল খুঁজে পেতে সহায়তা করার জন্য এখানে।'
  },
  loginTitle: {
    en: 'Login - Muslim Match Maker',
    bn: 'লগইন - Muslim Match Maker'
  },
  loginDesc: {
    en: 'Log in to your Muslim Match Maker account to connect with like-minded individuals and find your perfect match',
    bn: 'সমমনা ব্যক্তিদের সাথে সংযোগ করতে এবং আপনার নিখুঁত মিল খুঁজে পেতে আপনার Muslim Match Maker অ্যাকাউন্টে লগ ইন করুন।'
  },
  registerTitle: {
    en: 'Register - Muslim Match Maker',
    bn: 'রেজিস্টার - Muslim Match Maker'
  },
  registerDesc: {
    en: 'Join thousands of Muslims worldwide who trust Muslim Match Maker to find their life partner. Create your account today and start your journey towards finding love and companionship.',
    bn: 'বিশ্বব্যাপী হাজার হাজার মুসলিমদের সাথে যোগ দিন যারা তাদের জীবনসঙ্গী খুঁজে পেতে মুসলিম ম্যাচ মেকারকে বিশ্বাস করে। আজই আপনার অ্যাকাউন্ট তৈরি করুন এবং প্রেম এবং সাহচর্য খোঁজার দিকে আপনার যাত্রা শুরু করুন'
  }
}
const getText = (key, ln) => {
  if (ln == 'en-US') {
    ln = 'en'
  }
  if (ln == 'fr') {
    ln = 'bn'
  }
  return dict[key] ? dict[key][ln] : key
}

export { getText }
