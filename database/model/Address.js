import mongoose from 'mongoose'

const addressScheam = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    city: { type: String },
    district: { type: String },
    upazilla: { type: String },
    location: {
      type: String
    },
    GeolocationCoordinates: { type: String }
  },
  { timestamps: true }
)

const Address =
  mongoose.models.Address || mongoose.model('Address', addressScheam)
export default Address
