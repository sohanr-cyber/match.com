import db from '../connection'
import Personal from '../model/Personal'

class PersonalRepository {
  async CreatePersonal (DataToCreate) {
    try {
      const instance = new Personal({
        ...DataToCreate
      })
      const instanceResult = await instance.save()
      return instanceResult
    } catch (error) {
      console.log(error)
    }
  }

  async FindPersonalByUserId (userId) {
    try {
      await db.connect()
      const existingPersonal = await Personal.findOne({ user: userId })
      if (existingPersonal) {
        return existingPersonal
      } else {
        return { msg: 'Not Found!' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async UpdatePersonal (Id, DataToUpdate) {
    try {
      await db.connect()

      const UpdatePersonal = await Personal.findOneAndUpdate(
        { user: Id },
        {
          ...DataToUpdate
        },
        {
          new: true
        }
      )
      if (UpdatePersonal) {
        return UpdatePersonal
      } else {
        return { msg: 'Not Found!' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async DeletePersonalById (id) {
    try {
      await db.connect()
      const deletedPersonal = await Personal.findByIdAndRemove({ _id: id })
      return deletedPersonal
    } catch (error) {
      console.log(error)
    }
  }
}

export default PersonalRepository
