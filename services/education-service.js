import EducationRepository from '@/database/repository/education-repository'
import { FormateData } from '@/utility'

class EducationService {
  constructor () {
    this.repository = new EducationRepository()
  }

  async FindEducationByUserId (UserId) {
    try {
      const existingEducation = await this.repository.FindEducationByUserId(
        UserId
      )
      return FormateData(existingEducation)
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateEducation (Id, DataToUpdate) {
    try {
      const existingEducation = await this.repository.UpdateEducation(
        Id,
        DataToUpdate
      )
      console.log(existingEducation)
      return FormateData(existingEducation)
    } catch (error) {
      console.log(error)
    }
  }
}

export default EducationService
