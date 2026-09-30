const hasValue = value => {
  if (value === null || value === undefined || value === '') return false
  if (typeof value === 'string') return value.trim() !== '' && !/^(not selected|select|choose one)$/i.test(value.trim())
  if (Array.isArray(value)) return value.some(hasValue)
  if (typeof value === 'number') return Number.isFinite(value) && value > 0
  return Boolean(value)
}

export function calculateProfileCompletion ({ user = {}, education = {}, physical = {}, religion = {}, address = {}, family = {}, expectation = {} }) {
  // Draft height inputs take precedence over the saved height, including cleared fields.
  const heightParts = record => ({
    feet: record.heightFeet ?? (record.height ? Math.floor(record.height / 12) : ''),
    inches: record.heightInches ?? (record.height ? record.height % 12 : '')
  })
  const basicHeight = heightParts(user)
  const physicalHeight = heightParts(physical)
  const hasInches = value => value !== '' && value !== null && value !== undefined && Number.isFinite(Number(value)) && Number(value) >= 0 && Number(value) < 12
  const definitions = {
    basic: [user.name, user.bornAt, user.profession, user.education, user.educationType, user.skinColor, user.city, user.district, user.upazilla, user.maritalStatus, basicHeight.feet, hasInches(basicHeight.inches)],
    education: [education.educationType, education.profession, education.education],
    physical: [hasValue(physicalHeight.feet) && hasInches(physicalHeight.inches), physical.mass, physical.issue, physical.skinColor, physical.blood],
    religion: [religion.outfit, religion.mahram, religion.quranRecitation, religion.watch, religion.books, religion.missingPrayer, religion.scholars, religion.piety, religion.mahr, religion.sunnah, religion.dowry, religion.badHabit, religion.regularDeeds, religion.interest, ...(user.gender === 'Male' ? [religion.beard] : [])],
    address: [address.city, address.district, address.upazilla, address.location, address.phone, address.phone2, address.email],
    family: [family.father, family.mother, family.brother, family.sister, family.rStatus, family.eStatus, family.agreement],
    expectation: [expectation.minAge, expectation.maxAge, expectation.educations, expectation.professions],
    others: []
  }
  const sections = Object.fromEntries(Object.entries(definitions).map(([key, values]) => {
    const total = values.length
    const completed = values.filter(hasValue).length
    const optional = total === 0
    return [key, { completed, total, percent: optional ? null : Math.round(completed / total * 100), complete: !optional && completed === total, optional }]
  }))
  const total = Object.values(sections).reduce((sum, section) => sum + section.total, 0)
  const completed = Object.values(sections).reduce((sum, section) => sum + section.completed, 0)
  return { sections, completed, total, percent: total ? Math.round(completed / total * 100) : 0 }
}