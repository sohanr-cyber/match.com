import db from '../connection'
import Family from '../model/Family'

class FamilyRepository {
  async CreateFamily (DataToCreate) {
    try {
      const instance = new Family({
        ...DataToCreate
      })
      const instanceResult = await instance.save()
      return instanceResult
    } catch (error) {
      console.log(error)
    }
  }

  async FindFamilyByUserId (userId) {
    try {
      await db.connect()
      const existingFamily = await Family.findOne({ user: userId })
      if (existingFamily) {
        return existingFamily
      } else {
        return {}
      }
    } catch (error) {
      console.log(error)
    }
  }

  async UpdateFamily (Id, DataToUpdate) {
    try {
      await db.connect()

      const UpdateFamily = await Family.findOneAndUpdate(
        { user: Id },
        {
          ...DataToUpdate
        },
        {
          new: true
        }
      )
      if (UpdateFamily) {
        return UpdateFamily
      } else {
        return { msg: 'Not Found!' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async DeleteFamilyById (id) {
    try {
      await db.connect()
      const deletedFamily = await Family.deleteOne({ _id: id })
      return deletedFamily
    } catch (error) {
      console.log(error)
    }
  }
}

export default FamilyRepository
