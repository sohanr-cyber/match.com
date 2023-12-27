import AddressRepository from '@/database/repository/address-repository'
import { FormateData } from '@/utility'

class AddressService {
  constructor () {
    this.repository = new AddressRepository()
  }

  async FindAddressByUserId (UserId) {
    try {
      const existingAddress = await this.repository.FindAddressByUserId(UserId)
      return FormateData(existingAddress)
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateAddress (Id, DataToUpdate) {
    try {
      const existingAddress = await this.repository.UpdateAddress(
        Id,
        DataToUpdate
      )
      console.log(existingAddress)
      return FormateData(existingAddress)
    } catch (error) {
      console.log(error)
    }
  }
}

export default AddressService
