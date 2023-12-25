import mongoose from "mongoose";

const religionScheama = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    outfit: { type: String },
    outfitDate: { type: String },
    mahram: { type: String },
    quranRecitation: {
      type: String,
    },
    watch: {
      type: String,
    },
    bornAt: {
      type: String,
    },
  },
  { timestamps: true }
);

const Religion =
  mongoose.models.Religion || mongoose.model("Religion", religionScheama);
export default Religion;
