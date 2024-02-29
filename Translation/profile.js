const dict = {
  name: {
    en: 'Name',
    bn: 'নাম'
  },
  age: {
    en: 'Age',
    bn: 'বয়স'
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
    bn: ''
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
    en: 'Do You Maintain Mahram , Non-Mahram?',
    bn: 'আপনি কি মাহরাম, অ-মাহরাম পালন করেন?'
  },
  work: {
    en: 'Write Some Good Things About You',
    bn: 'আপনার সম্পর্কে কিছু ভাল কিছু  লিখুন'
  },
  good: {
    en: 'write something about your piety / good things about you?',
    bn: 'আপনার তাকওয়া / আপনার সম্পর্কে ভাল জিনিস সম্পর্কে কিছু লিখুন?'
  },
  watch: {
    en: 'Do You Watch Movie / Tv Serial ?',
    bn: ''
  },
  deeds: {
    en: 'Beside Fardh Deeds , Do you have any Nafle/Sunnah Deeds that you never miss at least for 6 months ?',
    bn: ''
  },
  about: {
    en: 'Tell About Your Interest , Hobby',
    bn: ''
  },
  // .. address

  // ..family
  f: {
    en: 'Family',
    bn: ''
  },
  father: {
    en: 'Father Information',
    bn: ''
  },
  mother: {
    en: 'Mother Information',
    bn: ''
  },
  brother: {
    en: 'Brother Informatio',
    bn: ''
  },
  sister: {
    en: 'Sister Information',
    bn: ''
  },
  eStatus: {
    en: 'Family Status',
    bn: ''
  },
  rStatus: { en: 'How Much Do The Follow Religion', bn: '' },

  // ... expectation
  minAge: {
    en: 'Minimum Age',
    bn: ''
  },
  maxAge: {
    en: 'Maximum Age',
    bn: ''
  },
  minHeight: {
    en: 'Minimum Height',
    bn: ''
  },
  maxHeight: {
    en: 'Maximum Height',
    bn: ''
  },
  religion: {
    en: 'Religion',
    bn: ''
  },

  // .... others
  student: {
    en: 'Interested In Marrying Student/Job Seeker?',
    bn: ''
  },
  studentWithJob: {
    en: 'Interested In Marrying Student/Job Seeker Having Some Income?',
    bn: ''
  },
  emigrant: {
    en: 'Are You Emigrant?',
    bn: ''
  },
  interestedInEmigratin: {
    en: 'Interested In Emigrant?',
    bn: ''
  },
  polynomy: {
    en: 'Interested In Polynomy?',
    bn: ''
  },
  interestedInDivorced: {
    en: 'Interested In Marrying Divorced Individuals?',
    bn: ''
  },
  interestedInDivorcedChild: {
    en: 'Interested In Marrying Divorced Individuals Having Having Children?',
    bn: ''
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
