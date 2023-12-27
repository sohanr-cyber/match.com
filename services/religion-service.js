import ReligionRepository from '@/database/repository/religion-repository'
import { FormateData } from '@/utility'

class ReligionService {
  constructor () {
    this.repository = new ReligionRepository()
  }

  async FindReligionByUserId (UserId) {
    try {
      const existingReligion = await this.repository.FindReligionByUserId(
        UserId
      )
      return FormateData(existingReligion)
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateReligion (Id, DataToUpdate) {
    try {
      const existingReligion = await this.repository.UpdateReligion(
        Id,
        DataToUpdate
      )
      console.log(existingReligion)
      return FormateData(existingReligion)
    } catch (error) {
      console.log(error)
    }
  }
}

export default ReligionService
