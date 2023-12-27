import PersonalRepository from '@/database/repository/personal-repository'
import { FormateData } from '@/utility'

class PersonalService {
  constructor () {
    this.repository = new PersonalRepository()
  }

  async FindPersonalByUserId (UserId) {
    try {
      const existingPersonal = await this.repository.FindPersonalByUserId(
        UserId
      )
      return FormateData(existingPersonal)
    } catch (error) {
      console.log(error)
    }
  }

  async UpdatePersonal (Id, DataToUpdate) {
    try {
      const existingPersonal = await this.repository.UpdatePersonal(
        Id,
        DataToUpdate
      )
      console.log(existingPersonal)
      return FormateData(existingPersonal)
    } catch (error) {
      console.log(error)
    }
  }
}

export default PersonalService
