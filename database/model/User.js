import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    gender: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },

    city: {
      type: String,
    },
    district: {
      type: String,
    },
    upazilla: {
      type: String,
    },
    educationType: { type: String },
    education: { type: String },
    institute: {
      type: String,
    },
    session: {
      type: String,
    },

    profession: {
      type: String,
    },

    height: {
      type: Number,
    },
    skinColor: {
      type: String,
    },
    bodyType: { type: String },

    bornAt: {
      type: Date,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    click: {
      type: Number,
    },
    impression: {
      type: Number,
    },
    averageMonthlyIncome: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
