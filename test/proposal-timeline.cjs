const fs = require('node:fs')
const vm = require('node:vm')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')
const clean = path => fs.readFileSync(path, 'utf8').replace(/^import .*\r?\n/gm, '').replace(/export const /g, 'const ').replace(/export function /g, 'function ').replace(/export default ProposalService/, 'globalThis.Service = ProposalService').replace(/export default Proposal\s*$/, 'globalThis.Model = Proposal')
async function main () {
  const context = { console, mongoose, Date, db: { connect: async () => {} }, Message: class {} }
  vm.createContext(context)
  vm.runInContext(clean('utility/proposal-timeline.js'), context)
  vm.runInContext(clean('database/model/Proposal.js'), context)
  const actor = 'a'.repeat(24)
  const sender = 'b'.repeat(24)
  const reciever = 'c'.repeat(24)
  const model = new context.Model({ sender, reciever, status: 'pending' })
  model.createdAt = new Date('2026-09-01T00:00:00Z')
  model.updatedAt = new Date('2026-09-02T00:00:00Z')
  context.appendProposalEvent(model, { status: 'Accepted', actor, actorRole: 'admin', note: 'Reviewed' })
  assert.equal(model.timeline[0].type, 'snapshot')
  assert.equal(model.timeline[0].status, 'pending')
  assert.equal(model.timeline[1].note, 'Reviewed')
  assert.equal(model.timeline[1].actorRole, 'admin')
  assert.equal(model.toJSON().timeline, undefined, 'Admin notes must not leak in member mutation responses')
  assert.equal(model.validateSync(), undefined)
  const invalid = new context.Model({ sender, reciever, status: 'invalid' })
  assert.ok(invalid.validateSync().errors.status)
  let updates = []
  let saved = 0
  let duplicate = false
  let conflict = false
  context.Proposal = {
    findById: async () => model,
    exists: async query => query._id ? duplicate : query.status?.$in ? query.status.$in.includes(model.status) : model.status !== 'Withdrawn'
  }
  Object.assign(context.Model, context.Proposal)
  context.User = { updateOne: async (query, change) => { updates.push(change) } }
  model.save = async () => { if (conflict) { const error = new Error('Conflict'); error.name = 'VersionError'; throw error }; saved++; return model }
  vm.runInContext(clean('services/proposal-service.js'), context)
  const service = new context.Service()
  const args = { Id: String(model._id), actorId: actor, status: 'Accepted', note: 'Approved', expectedUpdatedAt: model.updatedAt.toISOString() }
  assert.equal((await service.AdminUpdateStatus({ ...args, expectedUpdatedAt: new Date(0).toISOString() })).code, 409)
  assert.equal(saved, 0)
  model.timeline = []
  const accepted = await service.AdminUpdateStatus(args)
  assert.ok(accepted.proposal)
  assert.equal(model.status, 'Accepted'); assert.ok(model.resolvedAt)
  assert.ok(updates.some(update => update.$addToSet?.proposalAccepted))
  assert.equal((await service.AdminUpdateStatus(args)).code, 400)
  for (const status of ['In Discussion', 'Family Discussion', 'Meeting Scheduled', 'Engaged', 'Married']) {
    updates = []
    await service.AdminUpdateStatus({ ...args, status })
    assert.equal(model.status, status)
    assert.equal(model.timeline[model.timeline.length - 1].status, status)
    assert.equal(model.validateSync(), undefined)
    assert.ok(updates.some(update => update.$addToSet?.proposalAccepted), status + ' must preserve accepted connections')
  }
  updates = []
  await service.AdminUpdateStatus({ ...args, status: 'Declined' })
  assert.ok(updates.some(update => update.$pull?.proposalAccepted))
  duplicate = true
  assert.equal((await service.AdminUpdateStatus({ ...args, status: 'pending' })).code, 409)
  duplicate = false
  await service.AdminUpdateStatus({ ...args, status: 'pending' })
  assert.equal(model.resolvedAt, undefined)
  conflict = true
  assert.equal((await service.AdminUpdateStatus({ ...args, status: 'Withdrawn' })).code, 409)
  console.log('Passed timeline checks: legacy snapshot, event attribution, schema validation, note privacy, status transitions, relationships, duplicate prevention, and concurrent edits.')
  const swc = require('next/dist/build/swc')
  await swc.transform(fs.readFileSync('pages/admin/proposal/[id].js', 'utf8'), { filename: 'pages/admin/proposal/[id].js', jsc: { parser: { syntax: 'ecmascript', jsx: true } }, module: { type: 'commonjs' } })
  console.log('Proposal details JSX compiled successfully.')
}
main().catch(error => { console.error(error); process.exitCode = 1 })