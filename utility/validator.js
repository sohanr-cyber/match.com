const isPhysicalValid = physical => {
  if (
    !physical.issue ||
    !physical.skinColor ||
    // !physical.bodyType ||
    !physical.blood ||
    !physical.mass
  ) {
    return false
  } else {
    return true
  }
}

const isEducationValid = education => {
  if (
    !education.educationType ||
    !education.profession ||
    !education.education
  ) {
    return false
  }
  return true
}

const isAddressValid = address => {
  if (
    !address.city ||
    !address.district ||
    !address.upazilla ||
    !address.location ||
    !address.phone ||
    !address.phone2 ||
    !address.email
  ) {
    return false
  }
  return true
}

const isPersonalValid = personal => {
  if (
    !personal.outfit ||
    // !personal.outfitDate ||
    !personal.mahram ||
    !personal.quranRecitation ||
    !personal.watch ||
    !personal.books ||
    !personal.missingPrayer ||
    !personal.scholars ||
    !personal.piety ||
    !personal.mahr ||
    !personal.sunnah ||
    !personal.dowry ||
    !personal.badHabit ||
    !personal.regularDeeds ||
    !personal.interest
  ) {
    return false
  }
  return true
}

const isExpectationValid = expectation => {
  if (
    !education.educationType ||
    !education.outfitDate ||
    !education.mahram ||
    !education.quranRecitation ||
    !education.watch ||
    !education.books ||
    !education.missingPrayer ||
    !education.scholars ||
    !education.piety ||
    !education.mahr ||
    !education.sunnah ||
    !education.dowry
  ) {
    return false
  }
  return true
}

const isReligionValid = religion => {
  if (
    !education.educationType ||
    !education.profession ||
    !education.education
  ) {
    return false
  }
  return true
}

const isFamilyValid = family => {
  if (
    !family.father ||
    !family.mother ||
    !family.brother ||
    !family.sister ||
    !family.rStatus ||
    !family.eStatus ||
    !family.agreement
  ) {
    return false
  }
  return true
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
