import ExpectationRepository from '@/database/repository/expectation-repository'
import { FormateData } from '@/utility'

class ExpectationService {
  constructor () {
    this.repository = new ExpectationRepository()
  }

  async FindExpectationByUserId (UserId) {
    try {
      const existingExpectation = await this.repository.FindExpectationByUserId(
        UserId
      )
      return FormateData(existingExpectation)
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateExpectation (Id, DataToUpdate) {
    try {
      const existingExpectation = await this.repository.UpdateExpectation(
        Id,
        DataToUpdate
      )
      console.log(existingExpectation)
      return FormateData(existingExpectation)
    } catch (error) {
      console.log(error)
    }
  }
}

export default ExpectationService
