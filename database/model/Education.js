import mongoose from 'mongoose'

const educationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    institutes: [
      {
        name: { type: String },
        start: { type: String },
        end: { type: String }
      }
    ],
    institute: { type: String },
    profession: { type: String },
    educationType: { type: String },
    ssc: { type: String },
    hsc: { type: String },
    hons: { type: String },
    masters: { type: String },
    income: { type: Number },
    education: { type: String },
    current: { type: String },
    session: { type: String },
    subject: { type: String },
    skills: { type: String }
  },
  { timestamps: true }
)

const Education =
  mongoose.models.Education || mongoose.model('Education', educationSchema)
export default Education
