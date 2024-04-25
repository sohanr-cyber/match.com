import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    profileId: {
      type: String,
      required: true,
      unique: true,
      default: Math.floor(100000 + Math.random() * 900000)
    },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    gender: {
      type: String
    },
    maritalStatus: {
      type: String
    },

    city: {
      type: String
    },
    district: {
      type: String
    },
    upazilla: {
      type: String
    },

    educationType: { type: String },
    education: { type: String },
    institute: {
      type: String
    },
    session: {
      type: String
    },

    profession: {
      type: String
    },
    salt: {
      type: String
    },

    height: {
      type: Number
    },
    skinColor: {
      type: String
    },
    bodyType: { type: String },

    bornAt: {
      type: Date
    },
    approved: {
      type: Boolean,
      default: false
    },
    click: {
      type: Number,
      default: 0
    },
    impression: {
      type: Number
    },
    averageMonthlyIncome: {
      type: Number
    },
    proposalRecieved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    proposalSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    proposalAccepted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    savedIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    saverIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    categories: [{ type: String }],
    active: { type: Boolean, default: false },
    phone: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    expirationTime: { type: Date }
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
