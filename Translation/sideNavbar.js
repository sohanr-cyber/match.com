const dict = {
  mProfile: {
    en: 'My Profile',
    bn: 'প্রোফাইল'
  },
  eProfile: {
    en: 'Edit Profile',
    bn: 'প্রফাইল এডিট করুন'
  },
  proposal: {
    en: 'Proposal',
    bn: 'প্রস্তাব'
  },
  liked: {
    en: 'Liked',
    bn: 'পছন্দ'
  },
  logout: {
    en: 'Logout',
    bn: 'লগ আউট'
  },
  setting: {
    en: 'Setting',
    bn: 'সেটিং'
  },
  search: {
    en: 'Search',
    bn: ''
  },
  

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
