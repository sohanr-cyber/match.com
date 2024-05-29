import db from '../connection'
import Education from '../model/Education'

class EducationRepository {
  async CreateEducation (DataToCreate) {
    try {
      const instance = new Education({
        ...DataToCreate
      })
      const instanceResult = await instance.save()
      return instanceResult
    } catch (error) {
      console.log(error)
    }
  }
  async FindEducationByUserId (userId) {
    try {
      await db.connect()
      const existingEducation = await Education.findOne({ user: userId })
      return existingEducation
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateEducation (Id, DataToUpdate) {
    try {
      await db.connect()

      const UpdateEducation = await Education.findOneAndUpdate(
        { user: Id },
        {
          ...DataToUpdate
        },
        {
          new: true
        }
      )
      if (UpdateEducation) {
        return UpdateEducation
      } else {
        return { msg: 'Not Found!' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async DeleteEducationById (id) {
    try {
      await db.connect()
      const deletedEducation = await Education.deleteOne({ _id: id })
      return deletedEducation
    } catch (error) {
      console.log(error)
    }
  }
}

export default EducationRepository
