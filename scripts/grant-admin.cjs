const mongoose = require('mongoose')
const { loadEnvConfig } = require('@next/env')

loadEnvConfig(process.cwd())

const valueAfter = flag => {
  const index = process.argv.indexOf(flag)
  return index >= 0 ? process.argv[index + 1] : undefined
}

async function main () {
  const phoneInput = valueAfter('--phone')
  const emailInput = valueAfter('--email')
  if (Boolean(phoneInput) === Boolean(emailInput)) {
    throw new Error('Provide exactly one identifier: --phone NUMBER or --email ADDRESS')
  }

  const phoneDigits = String(phoneInput || '').replace(/\D/g, '')
  const phone = phoneDigits.startsWith('01') ? '88' + phoneDigits : phoneDigits
  const email = String(emailInput || '').trim().toLowerCase()
  if (phoneInput && !/^8801[3-9]\d{8}$/.test(phone)) throw new Error('Enter a valid Bangladeshi mobile number')
  if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Enter a valid email address')
  const filter = phoneInput ? { phone } : { email }
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URI_PRODUCTION
  if (!uri) throw new Error('MONGODB_URI is not configured')

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  const users = mongoose.connection.collection('users')
  const user = await users.findOne(filter, { projection: { _id: 1, isVerified: 1, role: 1 } })
  if (!user) throw new Error('Account not found')
  if (!user.isVerified) throw new Error('Account must be verified before granting admin access')

  const apply = process.argv.includes('--apply')
  console.log(JSON.stringify({ accountId: String(user._id), currentRole: user.role || 'user', mode: apply ? 'apply' : 'dry-run' }))
  if (apply && user.role !== 'admin') {
    await users.updateOne({ _id: user._id, isVerified: true }, { $set: { role: 'admin' } })
    console.log('Admin role granted.')
  }
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
}).finally(() => mongoose.disconnect())
