import db from '../connection'
import Address from '../model/Address'

class AddressRepository {
  async CreateAddress (DataToCreate) {
    try {
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
      console.log(existingAddress)
      return existingAddress
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateAddress (Id, DataToUpdate) {
    try {
      await db.connect()

      const UpdateAddress = await Address.findOneAndUpdate(
        { _id: Id },
        {
          ...DataToUpdate
        },
        {
          new: true
        }
      )
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
      const deletedAddress = await Address.findByIdAndRemove({ _id: id })
      return deletedAddress
    } catch (error) {
      console.log(error)
    }
  }
  
}

export default AddressRepository
