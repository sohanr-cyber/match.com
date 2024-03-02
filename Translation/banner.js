const dict = {
  t: {
    en: 'Why are you waiting for you dream Partner ?',
    bn: 'কেন আপনি আপনার স্বপ্নের সঙ্গীর জন্য অপেক্ষা করছেন?'
  },
  btn: {
    en: 'Register Here',
    bn: 'বায়োডাটা তৈরি করুন'
  },
  searchBy: {
    en: 'Search By Profile Id',
    bn: 'প্রোফাইল আইডি দ্বারা অনুসন্ধান করুন'
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
