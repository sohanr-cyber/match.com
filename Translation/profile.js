const dict = {
  name: {
    en: 'Name',
    bn: 'নাম'
  },
  age: {
    en: 'Age',
    bn: 'বয়স'
  },
  brithdate: {
    en: 'Date Of Birth',
    bn: 'জন্ম তারিখ'
  },
  height: {
    en: 'Height',
    bn: 'উচ্চতা'
  },
  color: {
    en: 'Skin Color',
    bn: 'গায়ের  রঙ'
  },
  body: {
    en: 'Body Type',
    bn: 'শারীরিক ধরণ '
  },
  bodyType: {
    en: 'Body Type',
    bn: 'শারীরিক ধরণ '
  },
  education: {
    en: 'Education',
    bn: 'শিক্ষা'
  },
  educationType: {
    en: 'Education Type',
    bn: 'শিক্ষার ধরন'
  },
  ocupation: {
    en: 'Ocupation',
    bn: 'পেশা'
  },
  location: {
    en: 'Location',
    bn: 'অবস্থান'
  },
  piety: {
    en: 'Piety',
    bn: 'ধার্মিকতা'
  },
  maritalStatus: {
    en: 'Marital Status',
    bn: 'বৈবাহিক অবস্থা'
  },
  optional: {
    en: 'Optional',
    bn: 'ঐচ্ছিক'
  },

  // ...Physical Attribute
  pa: {
    en: 'Physical Attributes',
    bn: 'শারীরিক বৈশিষ্ট্য'
  },
  weight: {
    en: 'Weight',
    bn: 'ওজন'
  },
  blood: {
    en: 'Blood Group',
    bn: 'রক্তের গ্রুপ'
  },
  hair: {
    en: 'Hair Color',
    bn: 'চুলের রঙ'
  },
  issue: {
    en: 'Do You Have Any Physical Issue?',
    bn: 'আপনার কোন শারীরিক সমস্যা আছে?'
  },

  // ... education & career
  ec: { en: 'Education & Career', bn: 'শিক্ষা ও কর্মজীবন' },
  income: {
    en: 'Monthly Income',
    bn: 'মাসিক আয়'
  },
  skills: {
    en: 'Skills',
    bn: 'দক্ষতা'
  },
  uni: {
    en: 'College/University',
    bn: 'কলেজ/বিশ্ববিদ্যালয়'
  },
  session: {
    en: 'Universtiy Session',
    bn: 'বিশ্ববিদ্যালয় সেশন'
  },
  sscUpdate: {
    en: 'SSC/Equivalent (School-Date-Result)',
    bn: 'এসএসসি/সমমান (স্কুল-তারিখ-ফলাফল)'
  },
  hscUpdate: {
    en: 'HSC/Equivalent (College-Date-Result)',
    bn: 'এইচএসসি/সমমান (কলেজ-তারিখ-ফলাফল)'
  },
  honsUpdate: {
    en: 'HONS/Equivalent (College/Uni-Date-Result)',
    bn: 'হন্স/সমমান (কলেজ/বিশ্ববিদ্যালয়-তারিখ-ফলাফল)'
  },
  masterUpdate: {
    en: 'Master/Equivalent (College/Uni-Date-Result)',
    bn: 'মাস্টার/সমমান (কলেজ/বিশ্ববিদ্যালয়-তারিখ-ফলাফল)'
  },

  ssc: {
    en: 'SSC/Equivalent',
    bn: 'এসএসসি/সমমান'
  },
  hsc: {
    en: 'HSC/Equivalent',
    bn: 'এইচএসসি/সমমান'
  },
  hons: {
    en: 'Hons/Equivalent',
    bn: 'অনার্স/সমমান'
  },
  jobAfter: {
    en: 'Do You Have Intention Of Doing Job After Marriage ?',
    bn: 'আপনার বিবাহের পরে চাকরি করার উদ্দেশ্য আছে?'
  },
  studyAfter: {
    en: 'Do You Have Intention Of Continuing Study After Marriage ?',
    bn: 'আপনার বিবাহের পরে অধ্যয়ন চালিয়ে যাওয়ার উদ্দেশ্য আছে?'
  },
  // ... personal and religion
  pr: {
    en: 'Personal & Religion',
    bn: 'ব্যক্তিগত এবং ধর্মীয়'
  },
  prayer: {
    en: 'Do You Pray 5 Times a day? How Long have you doing so?',
    bn: 'আপনি কি দিনে 5 ওয়াক্ত নামাজ পড়েন? কতদিন ধরে আপনি তাই করছেন?'
  },
  missing: {
    en: 'How Many Times You Missed Prayer A Week ?',
    bn: 'আপনি সপ্তাহে কতবার নামাজ মিস করেছেন?'
  },
  outfit: {
    en: 'How Is Your Outfit Outside Home ?',
    bn: 'বাড়ির বাইরে আপনার পোশাক কেমন?'
  },
  quran: {
    en: 'How Is Your Quran Recitation ?',
    bn: 'আপনার কোরআন তেলাওয়াত কেমন?'
  },
  books: {
    en: 'Write Some Islamic Book You Have Read ',
    bn: 'আপনার পড়া কিছু ইসলামিক বই লিখুন'
  },
  scholars: {
    en: 'Write Some Of Your Islamic Schoolars',
    bn: 'আপনার ইসলামিক পণ্ডিতদের কিছু লিখুন'
  },
  habit: {
    en: 'Do You Have Any Habit Of Drug(...Smoking)',
    bn: 'আপনার কি মাদকের অভ্যাস আছে (...ধূমপান)'
  },
  mahram: {
    en: 'Do you maintain boundaries between Mahram and Non-Mahram individuals?',
    bn: 'আপনি কি মাহরাম, অ-মাহরাম পালন করেন?'
  },
  work: {
    en: 'Write Some Good Things About You',
    bn: 'আপনার সম্পর্কে কিছু ভাল কিছু  লিখুন'
  },
  good: {
    en: 'Describe your Piety or positive qualities',
    bn: 'আপনার তাকওয়া / আপনার সম্পর্কে ভাল জিনিস সম্পর্কে কিছু লিখুন?'
  },
  watch: {
    en: 'Do you watch movies or TV serials?',
    bn: 'আপনি মুভি বা টিভি সিরিয়াল দেখেন?'
  },
  deeds: {
    en: 'Beside Fardh Deeds , Do you have any Nafle/Sunnah Deeds that you have never missed at least for 6 months ?',
    bn: '..'
  },

  interest: {
    en: 'Tell About Your Interests, Hobbies, Dreams, etc.',
    bn: 'আপনার আগ্রহ, শখ, স্বপ্ন ইত্যাদি সম্পর্কে বলুন।'
  },
  // .. address
  address: {
    en: 'permanent address',
    bn: 'স্থায়ী ঠিকানা'
  },

  city: {
    en: 'City',
    bn: 'শহর'
  },
  district: {
    en: 'District',
    bn: 'জেলা'
  },
  upazilla: {
    en: 'Upazilla',
    bn: 'উপজেলা'
  },
  location: {
    en: 'Location',
    bn: 'অবস্থান'
  },
  // ..family
  family: {
    en: 'Family Information',
    bn: 'পারিবারিক তথ্য'
  },
  father: {
    en: 'Father Information',
    bn: 'পিতার তথ্য'
  },
  mother: {
    en: 'Mother Information',
    bn: 'মায়ের তথ্য'
  },
  brother: {
    en: 'Brother Information',
    bn: 'ভাইদের তথ্য'
  },
  sister: {
    en: 'Sister Information',
    bn: 'বোনদের তথ্য'
  },
  eStatus: {
    en: 'Family Status',
    bn: 'পরিবারের অবস্থা'
  },
  rStatus: {
    en: 'How deeply does your family follow religion?',
    bn: 'আপনার পরিবার কতটা গভীরভাবে ধর্ম অনুসরণ করে?'
  },
  agreement: {
    en: 'Do They Agree To you Marriage?',
    bn: 'তারা আপনার বিয়ের সাথে কি একমত?'
  },

  // ... expectation
  expectation: {
    en: 'Expectation From Your Partner',
    bn: 'প্রত্যাশিত জীবনসঙ্গী'
  },
  minAge: {
    en: 'Minimum Age',
    bn: 'ন্যূনতম বয়স'
  },
  maxAge: {
    en: 'Maximum Age',
    bn: 'সর্বোচ্চ বয়স'
  },
  minHeight: {
    en: 'Minimum Height',
    bn: 'ন্যূনতম উচ্চতা'
  },
  maxHeight: {
    en: 'Maximum Height',
    bn: 'সর্বোচ্চ উচ্চতা'
  },
  religion: {
    en: 'Religion',
    bn: 'ধর্ম'
  },

  // .... others
  others: { en: 'Others', bn: 'অন্যান্য' },
  student: {
    en: 'Interested In Marrying Student/Job Seeker?',
    bn: 'শিক্ষার্থী/কাজের সন্ধানকারীর সাথে বিবাহে আগ্রহী?'
  },
  studentWithJob: {
    en: 'Interested In Marrying Student/Job Seeker Having Some Income?',
    bn: 'অবসরের পেশাজীবী/শিক্ষার্থীর সাথে বিবাহে আগ্রহী যাদের আয় আছে?'
  },
  emigrant: {
    en: 'Are You Emigrant?',
    bn: 'আপনি প্রবাসী?'
  },
  interestedInEmigrant: {
    en: 'Interested In Marrying Emigrant?',
    bn: 'প্রবাসীর সাথে বিবাহে আগ্রহী?'
  },
  polynomy: {
    en: 'Interested In Polynomy?',
    bn: 'বহুবিবাহে আগ্রহী?'
  },
  InterestedInDivorced: {
    en: 'Interested In Marrying Divorced Individuals?',
    bn: 'তালাকপ্রাপ্ত ব্যক্তিদের সাথে বিবাহে আগ্রহী?'
  },
  InterestedInDivorcedChild: {
    en: 'Interested In Marrying Divorced Individuals Having Having Children?',
    bn: 'তালাকপ্রাপ্ত ব্যক্তিদের সাথে বিবাহে আগ্রহী যাদের সন্তান আছে?'
  },

  autism: {
    en: 'Are You Autistic?',
    bn: 'আপনি প্রতিবন্ধী?'
  },
  orphan: {
    en: 'Are You an Orphan?',
    bn: 'আপনি একজন অনাথ?'
  },
  newMuslim: {
    en: 'Are You a New Muslim?',
    bn: 'আপনি নতুন মুসলিম?'
  },
  nulliparous: {
    en: 'Are you Nulliparous?',
    bn: 'আপনি নুলিপ্যারাস?'
  },

  yes: {
    en: 'Yes',
    bn: 'হ্যাঁ'
  },
  no: {
    en: 'NO',
    bn: 'না'
  },
  // misc
  save: {
    en: 'Save',
    bn: 'সংরক্ষণ করুন'
  },
  required: {
    en: 'Required',
    bn: 'প্রয়োজনীয়'
  },
  feet: {
    en: 'feet',
    bn: 'ফুট'
  },
  inches: {
    en: 'inches',
    bn: 'ইঞ্চি'
  },
  basic: {
    en: 'Basic Information',
    bn: 'মৌলিক তথ্য'
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
