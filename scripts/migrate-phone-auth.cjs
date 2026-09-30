const mongoose = require('mongoose')
const { loadEnvConfig } = require('@next/env')

loadEnvConfig(process.cwd())

async function main () {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URI_PRODUCTION
  if (!uri) throw new Error('MONGODB_URI is not configured')
  const apply = process.argv.includes('--apply')
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  const users = mongoose.connection.collection('users')

  const duplicatePhone = await users.aggregate([
    { $match: { phone: { $type: 'string' } } },
    { $group: { _id: '$phone', count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } },
    { $limit: 1 }
  ]).toArray()
  if (duplicatePhone.length) {
    throw new Error('Duplicate phone values exist. Resolve them before creating the unique index.')
  }

  const legacyWithoutPhone = await users.countDocuments({ $or: [{ phone: { $exists: false } }, { phone: null }, { phone: '' }] })
  const indexes = await users.indexes()
  const emailIndex = indexes.find(index => index.key?.email === 1 && Object.keys(index.key).length === 1)
  const phoneIndex = indexes.find(index => index.key?.phone === 1 && Object.keys(index.key).length === 1)
  const needsPhoneIndex = !phoneIndex || !phoneIndex.unique || !phoneIndex.sparse
  const needsEmailIndex = !emailIndex || !emailIndex.unique || !emailIndex.sparse

  console.log(JSON.stringify({
    phoneIndex: needsPhoneIndex ? 'needs unique sparse index' : 'ready',
    emailIndex: needsEmailIndex ? 'needs unique sparse index' : 'ready',
    mode: apply ? 'apply' : 'dry-run',
    legacyWithoutPhone
  }))

  if (!apply) return
  if (needsPhoneIndex) {
    if (phoneIndex) await users.dropIndex(phoneIndex.name)
    await users.createIndex({ phone: 1 }, { unique: true, sparse: true, name: 'phone_1' })
  }
  if (needsEmailIndex) {
    if (emailIndex) await users.dropIndex(emailIndex.name)
    try {
      await users.createIndex({ email: 1 }, { unique: true, sparse: true, name: 'email_1' })
    } catch (error) {
      if (emailIndex) {
        await users.createIndex({ email: 1 }, { unique: true, name: emailIndex.name })
      }
      throw error
    }
  }
  console.log('Phone auth indexes are ready.')
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
}).finally(async () => {
  await mongoose.disconnect()
})
