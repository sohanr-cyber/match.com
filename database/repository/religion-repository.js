import db from '../connection'
import Religion from '../model/Religion'

class ReligionRepository {
  async CreateReligion (DataToCreate) {
    try {
      const instance = new Religion({
        ...DataToCreate
      })
      const instanceResult = await instance.save()
      return instanceResult
    } catch (error) {
      console.log(error)
    }
  }

  async FindReligionByUserId (userId) {
    try {
      await db.connect()
      const existingReligion = await Religion.findOne({ user: userId })
      return existingReligion
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateReligion (Id, DataToUpdate) {
    try {
      await db.connect()

      const UpdateReligion = await Religion.findOneAndUpdate(
        { _id: Id },
        {
          ...DataToUpdate
        },
        {
          new: true
        }
      )
      if (UpdateReligion) {
        return UpdateReligion
      } else {
        return { msg: 'Not Found!' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async DeleteReligionById (id) {
    try {
      await db.connect()
      const deletedReligion = await Religion.findByIdAndRemove({ _id: id })
      return deletedReligion
    } catch (error) {
      console.log(error)
    }
  }
}

export default ReligionRepository
