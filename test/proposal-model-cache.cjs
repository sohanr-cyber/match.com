const fs = require('node:fs')
const vm = require('node:vm')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')
async function main () {
  mongoose.model('User', new mongoose.Schema({ name: String, profileId: Number }))
  const cached = mongoose.model('Proposal', new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reciever: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: String
  }))
  cached.collection.findOne = async () => ({ _id: new mongoose.Types.ObjectId(), sender: null, reciever: null, status: 'pending' })
  await assert.rejects(cached.findOne().populate('timeline.actor').lean(), { name: 'StrictPopulateError' })
  const context = { mongoose }
  vm.createContext(context)
  const clean = path => fs.readFileSync(path, 'utf8').replace(/^import .*\r?\n/gm, '').replace(/export const /g, 'const ').replace(/export function /g, 'function ').replace(/export default Proposal\s*$/, 'globalThis.Model = Proposal')
  vm.runInContext(clean('utility/proposal-timeline.js'), context)
  vm.runInContext(clean('database/model/Proposal.js'), context)
  assert.notEqual(context.Model, cached)
  assert.ok(context.Model.schema.path('timeline.actor'))
  assert.equal(context.Model.schema.options.optimisticConcurrency, true)
  context.Model.collection.findOne = async () => ({ _id: new mongoose.Types.ObjectId(), sender: null, reciever: null, status: 'pending' })
  const proposal = await context.Model.findOne()
    .select('sender reciever status message resolvedAt pockedAt pokeCount createdAt updatedAt timeline')
    .populate('sender', 'name profileId').populate('reciever', 'name profileId')
    .populate('timeline.actor', 'name').lean()
  assert.equal(proposal.status, 'pending')
  vm.runInContext(clean('database/model/Proposal.js').replace('const proposalSchema', 'var proposalSchema').replace('const Proposal =', 'var Proposal ='), vm.createContext({ mongoose, proposalStatuses: ['pending', 'Accepted', 'In Discussion', 'Family Discussion', 'Meeting Scheduled', 'Engaged', 'Married', 'Declined', 'Withdrawn'] }))
  assert.equal(mongoose.models.Proposal, context.Model, 'Current model remains reusable')
  console.log('Passed: reproduced stale-schema failure, refreshed model, details query succeeds for legacy record, current model reused.')
}
main().catch(error => { console.error(error); process.exitCode = 1 })