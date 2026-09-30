const mongoose = require('mongoose')
const faker = require('faker')
const { loadEnvConfig } = require('@next/env')

loadEnvConfig(process.cwd())

const uri = process.env.MONGODB_URI || process.env.MONGODB_URI_PRODUCTION
if (!uri) throw new Error('Set MONGODB_URI before seeding demo profiles.')
if (process.env.NODE_ENV === 'production') {
  throw new Error('Refusing to seed demo profiles while NODE_ENV=production.')
}

const cities = [
  { city: 'Dhaka', district: 'Dhaka', upazilla: 'Dhaka Sadar' },
  { city: 'Chittagong', district: 'Chittagong', upazilla: 'Chittagong Sadar' },
  { city: 'Sylhet', district: 'Sylhet', upazilla: 'Sylhet Sadar' },
  { city: 'Rajshahi', district: 'Rajshahi', upazilla: 'Rajshahi Sadar' },
  { city: 'Khulna', district: 'Khulna', upazilla: 'Khulna Sadar' },
  { city: 'Barisal', district: 'Barisal', upazilla: 'Barisal Sadar' },
  { city: 'Rangpur', district: 'Rangpur', upazilla: 'Rangpur Sadar' },
  { city: 'Mymensingh', district: 'Mymensingh', upazilla: 'Mymensingh Sadar' }
]
const maleNames = ['Abdullah', 'Adnan', 'Ahsan', 'Arif', 'Ashik', 'Farhan', 'Hasan', 'Imran', 'Mahmud', 'Mahin', 'Nabil', 'Nayeem', 'Raihan', 'Rafi', 'Sami', 'Tahmid', 'Tanvir', 'Zubair']
const femaleNames = ['Ayesha', 'Anika', 'Farzana', 'Fariha', 'Fatima', 'Jannat', 'Mahira', 'Nusrat', 'Rafia', 'Sabiha', 'Sohana', 'Sumaiya', 'Zara', 'Samira', 'Nadia', 'Maliha']
const surnames = ['Ahmed', 'Chowdhury', 'Hossain', 'Islam', 'Khan', 'Mahmud', 'Rahman', 'Siddique', 'Uddin', 'Kabir', 'Hasan', 'Mia']
const professions = ['Accountant', 'Architect', 'Banker', 'Business Owner', 'Consultant', 'Dentist', 'Designer', 'Doctor', 'Engineer', 'Teacher', 'Software Professional', 'University Lecturer', 'Government Service', 'Pharmacist', 'Researcher', 'Entrepreneur']
const institutes = ['University of Dhaka', 'North South University', 'BRAC University', 'Jahangirnagar University', 'University of Chittagong', 'Rajshahi University', 'Khulna University', 'Shahjalal University of Science and Technology', 'Bangladesh University of Engineering and Technology', 'Daffodil International University']
const educationTypes = ['General', 'Alia', 'Koumi']
const educations = ['Bachelors', 'BBA', 'BSC', 'HSC', 'MBA', 'Masters', 'MBBS', 'LLB', 'Diploma']
const skinColors = ['Fair', 'Light Brown', 'Brown', 'Very Fair']
const bodyTypes = ['Average', 'Slim', 'Athletic']
const sessions = ['2018-19', '2019-20', '2020-21', '2021-22', '2022-23']
const statuses = ['Never Married', 'Never Married', 'Never Married', 'Divorced', 'Widowed']
const bioLines = [
  'Values kindness, thoughtful conversation and building a peaceful home together.',
  'Enjoys family time, learning new things and keeping a balanced lifestyle.',
  'Hopes to meet someone sincere, respectful and ready to grow together.',
  'Close to family and appreciates honesty, warmth and a good sense of humor.',
  'Looking for a compatible partner who values faith, care and mutual respect.'
]
const choose = values => values[faker.random.number({ min: 0, max: values.length - 1 })]
const makeName = gender => `${choose(gender === 'Male' ? maleNames : femaleNames)} ${choose(surnames)}`
const makeBirthDate = () => {
  const year = faker.random.number({ min: 1988, max: 2002 })
  const month = faker.random.number({ min: 0, max: 11 })
  const day = faker.random.number({ min: 1, max: 27 })
  return new Date(Date.UTC(year, month, day))
}

function makeRecords (index) {
  const gender = index % 2 === 0 ? 'Male' : 'Female'
  const name = makeName(gender)
  const [firstName, ...rest] = name.split(' ')
  const lastName = rest.join(' ')
  const location = choose(cities)
  const bornAt = makeBirthDate()
  const education = choose(educations)
  const educationType = choose(educationTypes)
  const institute = choose(institutes)
  const profession = choose(professions)
  const height = faker.random.number({ min: 58, max: 74 })
  const skinColor = choose(skinColors)
  const bodyType = choose(bodyTypes)
  const maritalStatus = choose(statuses)
  const id = new mongoose.Types.ObjectId()
  const now = new Date()
  const email = `demo.profile.${String(index).padStart(3, '0')}@example.invalid`
  const profileId = `D${String(900000 + index)}`

  const user = {
    _id: id, name, profileId, email,
    gender, maritalStatus,
    city: location.city, district: location.district, upazilla: location.upazilla,
    educationType, education, institute, session: choose(sessions), profession,
    height, skinColor, bodyType, bornAt,
    approved: true, active: true, isVerified: true, isDemo: true,
    click: 0, impression: faker.random.number({ min: 8, max: 400 }),
    averageMonthlyIncome: faker.random.number({ min: 25000, max: 160000 }),
    categories: [], role: 'user',
    createdAt: now, updatedAt: now
  }
  const child = fields => ({
    user: id,
    ...fields,
    createdAt: now,
    updatedAt: now
  })

  return {
    user,
    address: child({
      city: location.city, district: location.district, upazilla: location.upazilla
    }),
    educationRecord: child({
      institute, profession, educationType, education, session: user.session,
      income: user.averageMonthlyIncome,
      institutes: [{ name: institute, start: String(bornAt.getUTCFullYear() + 18), end: String(bornAt.getUTCFullYear() + 22) }]
    }),
    family: child({
      father: makeName('Male'), mother: makeName('Female'),
      brother: String(faker.random.number({ min: 0, max: 3 })),
      sister: String(faker.random.number({ min: 0, max: 3 })),
      rStatus: 'Middle class', eStatus: 'Respectable family',
      agreement: 'Family is supportive of a suitable match.'
    }),
    personal: child({
      firstName, lastName, gender, maritalStatus, bornAt: bornAt.toISOString(),
      languageSpeak: ['Bangla', 'English'], languageRead: ['Bangla', 'English'],
      children: maritalStatus === 'Never Married' ? 0 : faker.random.number({ min: 0, max: 2 })
    }),
    physical: child({
      gender, height, skinColor, bodyType,
      mass: faker.random.number({ min: 48, max: 90 }), blood: choose(['A+', 'B+', 'O+', 'AB+'])
    }),
    religion: child({
      outfit: gender === 'Female' ? choose(['Hijab', 'Modest clothing']) : choose(['Traditional', 'Smart casual']),
      quranRecitation: choose(['Learning', 'Regular', 'Can recite']),
      prayer: choose(['Regularly', 'Most of the time', 'Working on consistency']),
      piety: choose(['Practicing', 'Learning and growing']),
      interest: choose(['Reading', 'Family time', 'Community service', 'Travel'])
    }),
    expectation: child({
      professions: [choose(professions)], minHeight: 58, maxHeight: 74,
      educations: [choose(educations)], educationTypes: [educationType],
      meritalStatuses: ['Never Married'], skinColors: [skinColor], bodyTypes: [bodyType],
      minAge: 23, maxAge: 38,
      districts: [location.district], description: choose(bioLines)
    })
  }
}

async function seed () {
  faker.seed(20260930)
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 })
  const db = mongoose.connection.db
  const users = db.collection('users')
  const collections = {
    addresses: db.collection('addresses'),
    educations: db.collection('educations'),
    families: db.collection('families'),
    personals: db.collection('personals'),
    physicals: db.collection('physicals'),
    religions: db.collection('religions'),
    expectations: db.collection('expectations')
  }
  const newRecords = []
  for (let index = 1; index <= 100; index += 1) {
    const email = `demo.profile.${String(index).padStart(3, '0')}@example.invalid`
    const existing = await users.findOne({ email }, { projection: { isDemo: 1 } })
    if (existing) {
      if (existing.isDemo !== true) throw new Error(`Reserved demo email already belongs to a non-demo record (slot ${index}).`)
      continue
    }
    newRecords.push(makeRecords(index))
  }

  const insertedIds = newRecords.map(record => record.user._id)
  try {
    if (newRecords.length) {
      await users.insertMany(newRecords.map(record => record.user), { ordered: true })
      const childRows = {
        addresses: newRecords.map(record => record.address),
        educations: newRecords.map(record => record.educationRecord),
        families: newRecords.map(record => record.family),
        personals: newRecords.map(record => record.personal),
        physicals: newRecords.map(record => record.physical),
        religions: newRecords.map(record => record.religion),
        expectations: newRecords.map(record => record.expectation)
      }
      for (const [name, rows] of Object.entries(childRows)) {
        if (rows.length) await collections[name].insertMany(rows, { ordered: true })
      }
    }
  } catch (error) {
    for (const collection of Object.values(collections)) {
      await collection.deleteMany({ user: { $in: insertedIds } }).catch(() => {})
    }
    await users.deleteMany({ _id: { $in: insertedIds } }).catch(() => {})
    throw error
  }

  const count = await users.countDocuments({ isDemo: true })
  const verified = await users.countDocuments({ isDemo: true, isVerified: true, active: true })
  console.log(`Demo profiles ready: ${count}; active and verified: ${verified}.`)
  await mongoose.disconnect()
  if (count !== 100 || verified !== 100) process.exitCode = 1
}

seed().catch(async error => {
  console.error(`Demo profile seeding failed: ${error.message}`)
  await mongoose.disconnect().catch(() => {})
  process.exitCode = 1
})