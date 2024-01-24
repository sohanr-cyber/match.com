import mongoose from 'mongoose'

const PersonalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    firstName: { type: String },
    lastName: { type: String },
    gender: {
      type: String
    },
    maritalStatus: {
      type: String
    },

    bornAt: {
      type: String
    },
    languageSpeak: [{ type: String }],
    languageRead: [{ type: String }],
    children: { type: Number }
  },
  { timestamps: true }
)

const Personal =
  mongoose.models.Personal || mongoose.model('Personal', PersonalSchema)
export default Personal
