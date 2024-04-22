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
  },
  logout: {
    en: 'Logout',
    bn: 'লগআউট'
  },
  code: {
    en: 'Type The Verification Code Sent To your Mail'
  },
  verify: {
    en: 'Verify'
  },
  rEmail: {
    en: 'Type Your Email'
  },
  newPassword: {
    en: 'Enter Your New Password'
  }
}
const getText = (key, ln) => {
  if (ln == 'en-US') {
    ln = 'en'
  }
  return dict[key] ? dict[key][ln] : key
}

export { getText }
