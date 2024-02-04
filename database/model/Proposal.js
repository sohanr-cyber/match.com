import mongoose from 'mongoose'

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
    status: { type: String, default: 'pending' },
    message: { type: String },
    resolvedAt: { type: Date },
    pockedAt: { type: Date },
    pokeCount: { type: Number, default: 0 }
  },
  { timestamps: true }
)

const Proposal =
  mongoose.models.Proposal || mongoose.model('Proposal', proposalSchema)
export default Proposal
