const dict = {
  login: {
    en: 'Login',
    bn: 'লগইন'
  },
  register: {
    en: 'Signup',
    bn: 'রেজিস্ট্রেশন'
  },
  signup: {
    en: 'Signup',
    bn: 'রেজিস্ট্রেশন'
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
    en: 'Type The Verification Code Sent To your Mail',
    bn: 'আপনার মেইলে পাঠানো কোডটা লিখুন'
  },
  verify: {
    en: 'Verify',
    bn: 'ভেরিফাই'
  },
  rEmail: {
    en: 'Type Your Email',
    bn: 'আপনার ইমেইলটি লিখুন'
  },
  newPassword: {
    en: 'Enter Your New Password',
    bn: 'নতুন পাসওয়ার্ড সেট করুন'
  },
  forgetP: {
    en: 'Forget Your Password ?',
    bn: 'পাসওয়ার্ড ভুলে গেছেন?'
  },
  resetP: {
    en: 'Reset Password',
    bn: 'নতুন পাসওয়ার্ড সেট করুন'
  },
  submit: {
    en: 'Submit',
    bn: 'সাবমিট'
  },
  reset: {
    en: 'Reset',
    bn: 'নতুন পাসওয়ার্ড '
  }
}
const getText = (key, ln) => {
  if (ln == 'en-US') {
    ln = 'en'
  }
  return dict[key] ? dict[key][ln] : key
}

export { getText }
