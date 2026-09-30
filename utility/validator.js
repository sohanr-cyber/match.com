const isPhysicalValid = physical => {
  const value = physical || {}
  return Boolean(value.issue && value.skinColor && value.blood && value.mass)
}

const isEducationValid = education => {
  const value = education || {}
  return Boolean(value.educationType && value.profession && value.education)
}

const isAddressValid = address => {
  const value = address || {}
  return Boolean(value.city && value.district && value.upazilla && value.location && value.phone && value.phone2 && value.email)
}

const isPersonalValid = personal => {
  const value = personal || {}
  return Boolean(
    value.outfit && value.mahram && value.quranRecitation && value.watch &&
    value.books && value.missingPrayer && value.scholars && value.piety &&
    value.mahr && value.sunnah && value.dowry && value.badHabit &&
    value.regularDeeds && value.interest
  )
}

const isExpectationValid = expectation => {
  const value = expectation || {}
  return Boolean(
    value.minAge && value.maxAge &&
    Array.isArray(value.educations) && value.educations.length &&
    Array.isArray(value.professions) && value.professions.length
  )
}

const isReligionValid = religion => isPersonalValid(religion)

const isFamilyValid = family => {
  const value = family || {}
  return Boolean(
    value.father && value.mother && value.brother && value.sister &&
    value.rStatus && value.eStatus && value.agreement
  )
}

export {
  isPhysicalValid,
  isEducationValid,
  isFamilyValid,
  isReligionValid,
  isExpectationValid,
  isPersonalValid,
  isAddressValid
}