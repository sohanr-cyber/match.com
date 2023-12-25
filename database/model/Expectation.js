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
    minheight: {
      type: Number
    },
    maxHeight: { type: Number },
    educations: [{ type: String }],
    meritalStatuses: [{ type: String }],
    skinColors: [
      {
        type: String
      }
    ],
    bodyTypes: [{ type: String }],

    bornAtFrom: {
      type: Date
    },
    bornAtTo: {
      type: Date
    },
    districts: [{ type: String }],
    description: { type: String }
  },
  { timestamps: true }
)

const Expectation =
  mongoose.models.Expectation ||
  mongoose.model('Expectation', expectationSchema)
export default Expectation
