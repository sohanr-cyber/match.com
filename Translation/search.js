const dict = {
  filter: {
    en: 'Filter',
    bn: 'ফিল্টার'
  },
  result: {
    en: 'Total Results',
    bn: 'মোট ফলাফল'
  },
  location: {
    en: 'Location',
    bn: 'অবস্থান'
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
