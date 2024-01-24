import db from '../connection'
import Expectation from '../model/Expectation'

class ExpectationRepository {
  async CreateExpectation (DataToCreate) {
    try {
      const instance = new Expectation({
        ...DataToCreate
      })
      const instanceResult = await instance.save()
      return instanceResult
    } catch (error) {
      console.log(error)
    }
  }
  async FindExpectationByUserId (userId) {
    try {
      await db.connect()
      const existingExpectation = await Expectation.findOne({ user: userId })
      return existingExpectation
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateExpectation (Id, DataToUpdate) {
    try {
      await db.connect()

      const UpdatedExpectation = await Expectation.findOneAndUpdate(
        { user: Id },
        {
          ...DataToUpdate
        },
        {
          new: true
        }
      )
      if (UpdatedExpectation) {
        return UpdatedExpectation
      } else {
        return { msg: 'Not Found!' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async DeleteExpectationById (id) {
    try {
      await db.connect()
      const deletedExpectation = await Expectation.findByIdAndRemove({
        _id: id
      })
      return deletedExpectation
    } catch (error) {
      console.log(error)
    }
  }
}

export default ExpectationRepository
