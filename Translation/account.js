const dict = {
  login: {
    en: 'Login',
    bn: 'লগইন'
  },
  register: {
    en: 'Signup',
    bn: 'নিবন্ধন'
  },
  signup: {
    en: 'Signup',
    bn: 'নিবন্ধন'
  },
  email: {
    en: 'Enter Your Email',
    bn: 'আপনার ইমেল লিখুন'
  },
  password: {
    en: 'Enter Your Password',
    bn: 'আপনার পাসওয়ার্ড লিখুন'
  },
  name: {
    en: 'Enter Your Name',
    bn: 'আপনার নাম লিখুন'
  },
  choseG: {
    en: 'Choose Your Gender',
    bn: 'আপনার লিঙ্গ নির্বাচন করুন'
  }
}
const getText = (key, ln) => {
  return dict[key][ln]
}

export { getText }
