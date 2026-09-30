const mongoose = require('mongoose')
const { loadEnvConfig } = require('@next/env')

loadEnvConfig(process.cwd())

async function main () {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URI_PRODUCTION
  if (!uri) throw new Error('MONGODB_URI is not configured')
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  const users = mongoose.connection.collection('users')
  const proposals = mongoose.connection.collection('proposals')
  await Promise.all([
    users.createIndex({ active: 1, createdAt: -1 }, { name: 'active_createdAt' }),
    users.createIndex({ active: 1, gender: 1, createdAt: -1 }, { name: 'active_gender_createdAt' }),
    proposals.createIndex({ sender: 1, updatedAt: -1 }, { name: 'sender_updatedAt' }),
    proposals.createIndex({ reciever: 1, status: 1, updatedAt: -1 }, { name: 'reciever_status_updatedAt' })
  ])
  console.log('Member and proposal indexes are ready.')
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
}).finally(async () => {
  await mongoose.disconnect()
})
