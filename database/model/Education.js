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
    educationType: { type: String },
    sscDate: { type: String },
    sscResult: { type: String },
    hscDate: { type: String },
    hscResult: { type: String },
    honsDate: { type: String },
    honsResult: { type: String },
    mastersDate: { type: String },
    mastersResult: { type: String },
    current: { type: String },
    other: { type: String }
  },
  { timestamps: true }
)

const Education =
  mongoose.models.Education || mongoose.model('Education', educationSchema)
export default Education
