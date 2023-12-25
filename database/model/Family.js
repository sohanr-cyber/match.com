import mongoose from 'mongoose'

const familySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    father: { type: String },
    mother: { type: String },
    brother: { type: String },
    sister: {
      type: String
    },
    rStatus: {
      type: String
    },

    eStatus: {
      type: String
    }
  },
  { timestamps: true }
)

const Family = mongoose.models.Family || mongoose.model('Family', familySchema)
export default Family
