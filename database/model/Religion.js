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
    badHabit: { Type: String },
    mahr: { Type: String },
    dowry: { Type: String },
    sunnah: { Type: String },
    beard: { Type: String }
  },
  { timestamps: true }
)

const Religion =
  mongoose.models.Religion || mongoose.model('Religion', religionScheama)
export default Religion
