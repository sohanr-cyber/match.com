import PhysicalRepository from '@/database/repository/physical-repository'
import { FormateData } from '@/utility'

class PhysicalService {
  constructor () {
    this.repository = new PhysicalRepository()
  }

  async FindPhysicalByUserId (UserId) {
    try {
      const existingPhysical = await this.repository.FindPhysicalByUserId(
        UserId
      )
      return FormateData(existingPhysical)
    } catch (error) {
      console.log(error)
    }
  }

  async UpdatePhysical (Id, DataToUpdate) {
    try {
      const existingPhysical = await this.repository.UpdatePhysical(
        Id,
        DataToUpdate
      )
      console.log(existingPhysical)
      return FormateData(existingPhysical)
    } catch (error) {
      console.log(error)
    }
  }
}

export default PhysicalService
