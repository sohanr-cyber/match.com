import db from '../connection'
import Address from '../model/Address'

class AddressRepository {
  async CreateAddress (DataToCreate) {
    try {
      await db.connect()
      const instance = new Address({
        ...DataToCreate
      })
      const instanceResult = await instance.save()
      return instanceResult
    } catch (error) {
      console.log(error)
    }
  }

  async FindAddressByUserId (userId) {
    try {
      await db.connect()
      const existingAddress = await Address.findOne({ user: userId })
      await db.disconnect()
      return existingAddress
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateAddress (Id, DataToUpdate) {
    try {
      await db.connect()

      const UpdateAddress = await Address.findOneAndUpdate(
        { user: Id },
        {
          ...DataToUpdate
        },
        {
          new: true
        }
      )
      await db.disconnect()

      if (UpdateAddress) {
        return UpdateAddress
      } else {
        return { msg: 'Not Found!' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async DeleteAddressById (id) {
    try {
      await db.connect()
      const deletedAddress = await Address.deleteOne({ _id: id })
      await db.disconnect()
      return deletedAddress
    } catch (error) {
      console.log(error)
    }
  }
}

export default AddressRepository
