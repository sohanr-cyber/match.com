import mongoose from 'mongoose'
import { proposalStatuses } from '@/utility/proposal-timeline'

const proposalSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: { type: String, enum: proposalStatuses, default: 'pending' },
    timeline: [{
      type: { type: String, enum: ['created', 'status', 'reminder', 'snapshot'], required: true },
      status: { type: String, enum: proposalStatuses, required: true },
      actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      actorRole: { type: String, enum: ['member', 'admin'] },
      note: { type: String, maxlength: 1000 },
      at: { type: Date, required: true, default: Date.now }
    }],
    message: { type: String },
    resolvedAt: { type: Date },
    pockedAt: { type: Date },
    pokeCount: { type: Number, default: 0 }
  },
  { timestamps: true, optimisticConcurrency: true }
)

// Admin notes are returned only by the protected admin endpoint using lean().
proposalSchema.set('toJSON', { transform: (doc, ret) => { delete ret.timeline; return ret } })

proposalSchema.index({ sender: 1, updatedAt: -1 })
proposalSchema.index({ reciever: 1, status: 1, updatedAt: -1 })

// Next.js hot reload can retain the model compiled before timeline was added.
// Recompile that stale schema so population and status saves use the new fields.
if (mongoose.models.Proposal && (!mongoose.models.Proposal.schema.path('timeline.actor') ||
    proposalStatuses.some(status => !mongoose.models.Proposal.schema.path('status').enumValues.includes(status) ||
      !mongoose.models.Proposal.schema.path('timeline.status').enumValues.includes(status)))) {
  mongoose.deleteModel('Proposal')
}

const Proposal =
  mongoose.models.Proposal || mongoose.model('Proposal', proposalSchema)
export default Proposal
