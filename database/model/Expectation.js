import mongoose from 'mongoose'

const expectationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    professions: [
      {
        type: String
      }
    ],
    minHeight: {
      type: Number
    },
    maxHeight: { type: Number },
    educations: [{ type: String }],
    educationTypes: [{ type: String }],
    meritalStatuses: [{ type: String }],
    skinColors: [
      {
        type: String
      }
    ],
    bodyTypes: [{ type: String }],

    minAge: { type: Number },
    maxAge: { type: Number },
    districts: [{ type: String }],
    description: { type: String },
    more: { type: String }
  },
  { timestamps: true }
)

const Expectation =
  mongoose.models.Expectation ||
  mongoose.model('Expectation', expectationSchema)
export default Expectation
