const dict = {
  name: {
    en: 'Name',
    bn: 'নাম'
  },
  age: {
    en: 'Age',
    bn: 'বয়স'
  },
  gender: {
    en: 'Gender',
    bn: 'লিঙ্গ'
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
  createdAt: {
    en: 'Biodate Created At',
    bn: 'বায়োডাটা তৈরীর সময়'
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
    en: 'Do You Have Any Major Physical Issue?',
    bn: 'শারিরিক বড় কোন রোগ আছে কি?	'
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
  moreEC: {
    en: 'Write if you have more to say about education and career',
    bn: 'শিক্ষা এবং কর্মজীবন সম্পর্কে আরও কিছু বলার থাকলে লিখুন'
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
    en: 'Write Some Of Your Favourite Islamic Schoolars',
    bn: 'আপনার প্রিয় কিছু আলেম/শায়েখের নাম?'
  },
  habit: {
    en: 'Do You Have Any Habit Of Drug?',
    bn: 'আপনি কি কোন নেশাদার দ্রব্য খান/পান করেন?'
  },
  mahram: {
    en: 'Do you maintain boundaries between Mahram and Non-Mahram individuals?',
    bn: 'মাহরাম-নন মাহরাম মানা হয় কি?'
  },
  work: {
    en: 'Write Some Good Things About You',
    bn: 'আপনার সম্পর্কে কিছু ভাল কিছু  লিখুন'
  },
  good: {
    en: 'Describe your Piety or positive qualities',
    bn: 'আপনার ধর্মীয় ও অন্যান্য ভালো দিকগুলো সম্পর্কে কিছু লিখুন?'
  },
  watch: {
    en: 'Do you watch movies or TV serials?',
    bn: 'আপনি মুভি বা টিভি সিরিয়াল দেখেন?'
  },
  deeds: {
    en: 'Beside Fardh Deeds , Do you have any Nafle/Sunnah Deeds that you have never missed at least for 6 months ?',
    bn: 'নিয়মিত কোনটি অধ্যয়ন করেন?	'
  },

  interest: {
    en: 'Tell About Your Interests, Hobbies, Dreams, etc.',
    bn: 'আপনার আগ্রহ, শখ, স্বপ্ন ইত্যাদি সম্পর্কে বলুন।'
  },
  mahr: {
    en: 'What is your opinion regarding mahr?',
    bn: 'দেনমোহরের ব্যাপারে আপনার মন্তব্য কি?'
  },
  dowry: {
    en: 'Do you want to get dowry/Kabin in some other worldly way?',
    bn: 'আপনি কি বিবাহে যৌতুক/কাবিন অন্য কোনভাবে দুনিয়াবি লাভবান হতে চান?'
  },
  sunnah: {
    en: 'Do you want to marry according to the rules of Islam?',
    bn: 'বিয়ে কি সুন্নাতি নিয়মে করতে চান?'
  },
  // .. address
  address: {
    en: 'address & contact information',
    bn: 'ঠিকানা এবং যোগাযোগের তথ্য'
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

  phone: {
    en: 'phone number',
    bn: 'ফোন নম্বর'
  },
  phone2: {
    en: 'guardian phone number',
    bn: 'অভিভাবকের ফোন নম্বর'
  },
  email: { en: 'contact email', bn: 'যোগাযোগের ই-মেইল' },

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
    en: 'How do other members of your family practice religion?',
    bn: 'আপনার পরিবারে অন্যান্য সদস্যরা কেমন দ্বীন পালন করেন?'
  },
  agreement: {
    en: 'Do They Agree To you Marriage?',
    bn: 'তারা আপনার বিয়ের সাথে কি একমত?'
  },
  moreF: {
    en: 'Write if you have more to say about the family',
    bn: 'পরিবার সম্পর্কে আরও কিছু বলার থাকলে লিখুন'
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
  moreE: {
    en: 'Write if you have more to say about expected life partner',
    bn: 'প্রত্যাশিত জীবনসঙ্গী সম্পর্কে আরও কিছু বলার থাকলে লিখুন'
  },

  // .... others
  others: { en: 'Others', bn: 'অন্যান্য' },
  student: {
    en: 'Interested In Marrying Student/Job Seeker?',
    bn: 'শিক্ষার্থী/চাকুরি সন্ধানে আছে এমন পাত্র বিবাহ করতে আগ্রহী কিনা?'
  },
  studentWithJob: {
    en: 'Interested In Marrying Student/Job Seeker Having Some Income?',
    bn: 'শিক্ষার্থী/চাকুরি সন্ধানে + আয় আছে এমন পাত্র বিবাহ করতে আগ্রহী কিনা??'
  },
  emigrant: {
    en: 'Are You Emigrant?',
    bn: 'আপনি প্রবাসী/সিটিজেন?'
  },
  interestedInEmigrant: {
    en: 'Interested In Marrying Emigrant?',
    bn: 'প্রবাসী/সিটিজেন পাত্র/পাত্রী বিয়ে করতে আগ্রহী আছেন কি?'
  },
  polynomy: {
    en: 'Interested In Polynomy?',
    bn: 'দ্বিতীয় স্ত্রী (মাসনা)হতে/করতে আগ্রহী আছেন কিনা?'
  },
  InterestedInDivorced: {
    en: 'Interested In Marrying Divorced Individuals?',
    bn: 'ডিভোর্স/বউ/স্বামী মারা গেছে এমন কাওকে বিয়ে করতে আগ্রহী আছেন?'
  },

  InterestedInDivorcedChild: {
    en: 'Interested In Marrying Divorced Individuals Having Children?',
    bn: 'ডিভোর্স/বউ/স্বামী  মারা গেছে + সন্তান আছে  এমন কাওকে বিয়ে করতে আগ্রহী আছেন?'
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
  },
  id: {
    en: 'Id',
    bn: 'আইডি'
  },
  // accept: {
  //   en: 'Accept',
  //   bn: 'প্রস্তাব গ্রহণ করুন'
  // },
  // accepted: {
  //   en: 'Accepted',
  //   bn: 'প্রস্তাব গৃহীত'
  // },
  // decline: {
  //   en: 'Decline',
  //   bn: 'প্রত্যাখ্যান করুন '
  // },
  // declined: {
  //   en: 'Declined',
  //   bn: 'প্রত্যাখ্যাত'
  // },
  // resend: {
  //   en: 'Resend',
  //   bn: 'পুনরায় পাঠান'
  // },
  // resent: {
  //   en: 'Resent',
  //   bn: 'পুনরায় পাঠান'
  // },
  // withdraw: {
  //   en: 'Withdraw',
  //   bn: 'প্রত্যাহার'
  // },
  // withdrawn: {
  //   en: 'Withdrawn',
  //   bn: 'অপসারিত'
  // }
  status: {
    en: 'Status',
    bn: 'স্ট্যাটাস'
  },
  proposal: {
    en: 'Proposal',
    bn: 'প্রস্তাব'
  },
  sendProposal: {
    en: 'Send Proposal',
    bn: 'প্রস্তাব পাঠান'
  },
  proposalSent: {
    en: 'Proposal Sent Already',
    bn: 'প্রস্তাব পাঠানো হয়েছে'
  },
  proposalRecieved: {
    en: 'Proposal Recieved Already',
    bn: 'প্রস্তাব ইতিমধ্যে গৃহীত'
  },
  sender: {
    en: 'Sender',
    bn: 'প্রেরক'
  },
  reciever: {
    en: 'Reciever',
    bn: 'প্রাপক'
  },
  message: {
    en: 'Personalized Message (optional)',
    bn: 'বার্তা (ঐচ্ছিক)'
  },
  send: {
    en: 'Send',
    bn: 'পাঠান'
  },
  cancel: {
    en: 'Cancel',
    bn: 'বাতিল'
  },
  activate: {
    en: 'Activate',
    bn: 'একটিভ করুন '
  },
  deactivate: {
    en: 'Deactivate',
    bn: 'ডিএক্টিভ করুন '
  },
  activateText: {
    en: 'Your Profile Is Ready To Activate ',
    bn: 'আপনার প্রোফাইল একটিভ করার জন্য প্রস্তুত  '
  },
  deactivateText: {
    bn: 'আপনি চাইলে আপনার প্রোফাইল ডিএক্টিভ করতে পারেন',
    en: 'You Can Also Deactivate Your Profile'
  },
  ActivateError: {
    en: 'Your Profile is Not Completed To Activate. Complete Your Profile Firstly',
    bn: 'আপনার প্রোফাইল একটিভ করার জন্য প্রস্তুত হয়নি. প্রথমে আপনার প্রোফাইল সম্পূর্ণ করুন'
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
