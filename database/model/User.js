import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
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
      type: Number
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
        ref: 'User',
        unique: true
      }
    ],
    proposalSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
      }
    ],
    proposalAccepted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
      }
    ],
    savedIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
      }
    ],

    saverIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
      }
    ],
    categories: [{ type: String }],
    active: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
