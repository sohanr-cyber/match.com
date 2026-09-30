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
    email: { type: String, unique: true, sparse: true },
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
    isDemo: { type: Boolean, default: false },
    phone: { type: String, unique: true, sparse: true, select: false },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String, select: false },
    verificationAttempts: { type: Number, default: 0, select: false },
    expirationTime: { type: Date, select: false },
    lastVerificationSentAt: { type: Date, select: false },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'moderator', 'premium_user']
    }
  },
  { timestamps: true }
)

userSchema.index({ active: 1, createdAt: -1 })
userSchema.index({ active: 1, gender: 1, createdAt: -1 })

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
