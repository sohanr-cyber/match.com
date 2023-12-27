import db from '../connection'
import Physical from '../model/Physical'

class PhysicalRepository {
  async CreatePhysical (DataToCreate) {
    try {
      const instance = new Physical({
        ...DataToCreate
      })
      const instanceResult = await instance.save()
      return instanceResult
    } catch (error) {
      console.log(error)
    }
  }

  async FindPhysicalByUserId (userId) {
    try {
      await db.connect()
      const existingPhysical = await Physical.findOne({ user: userId })
      return existingPhysical
    } catch (error) {
      console.log(error)
    }
  }

  async UpdatePhysical (Id, DataToUpdate) {
    try {
      await db.connect()

      const UpdatePhysical = await Physical.findOneAndUpdate(
        { _id: Id },
        {
          ...DataToUpdate
        },
        {
          new: true
        }
      )
      if (UpdatePhysical) {
        return UpdatePhysical
      } else {
        return { msg: 'Not Found!' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async DeletePhysicalById (id) {
    try {
      await db.connect()
      const deletedPhysical = await Physical.findByIdAndRemove({ _id: id })
      return deletedPhysical
    } catch (error) {
      console.log(error)
    }
  }
}

export default PhysicalRepository
