import mongoose from 'mongoose'

const religionScheama = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    outfit: { type: String },
    outfitDate: { type: String },
    mahram: { type: String },
    quranRecitation: {
      type: String
    },
    watch: {
      type: String
    },
    books: { type: String },
    prayer: { type: String },
    missingPrayer: { type: String },
    scholars: { type: String },
    piety: { type: String },
    interest: { type: String },
    regularDeeds: { type: String },
    badHabit: { type: String },
    mahr: { type: String },
    dowry: { type: String },
    sunnah: { type: String },
    beard: { type: String }
  },
  { timestamps: true }
)

if (mongoose.models.Religion && ['badHabit', 'mahr', 'dowry', 'sunnah', 'beard'].some(field => !mongoose.models.Religion.schema.path(field))) {
  mongoose.deleteModel('Religion')
}

const Religion =
  mongoose.models.Religion || mongoose.model('Religion', religionScheama)
export default Religion
