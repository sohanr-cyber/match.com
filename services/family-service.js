import FamilyRepository from '@/database/repository/family-repository'
import { FormateData } from '@/utility'

class FamilyService {
  constructor () {
    this.repository = new FamilyRepository()
  }

  async FindFamilyByUserId (UserId) {
    try {
      const existingFamily = await this.repository.FindFamilyByUserId(
        UserId
      )
      return FormateData(existingFamily)
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateFamily (Id, DataToUpdate) {
    try {
      const existingFamily = await this.repository.UpdateFamily(
        Id,
        DataToUpdate
      )
      console.log(existingFamily)
      return FormateData(existingFamily)
    } catch (error) {
      console.log(error)
    }
  }
}

export default FamilyService
