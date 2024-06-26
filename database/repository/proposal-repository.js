import db from '../connection'
import Proposal from '../model/Proposal'

class ProposalRepository {
  async CreateProposal (DataToCreate) {
    try {
      await db.connect()
      const instance = new Proposal({
        ...DataToCreate
      })
      const instanceResult = await instance.save()

      await db.disconnect()

      // Send Mail to reciever

      return instanceResult
    } catch (error) {
      console.log(error)
      //   return {
      //     msg: error.Error
      //   }
    }
  }

  async FindProposalsByUserId (userId) {
    try {
      await db.connect()
      const existingProposal = await Proposal.find({
        $or: [{ sender: userId }, { reciever: userId }]
      })
        .populate(
          'sender',
          '_id , name  , email , gender , profession ,  height ,skinColor , city , district , upazilla '
        ) // Replace 'username' with the fields you want to populate for sender
        .populate(
          'reciever',
          '_id , name  , email , gender , profession ,  height ,skinColor , city , district , upazilla '
        ) // Replace 'username' with the fields you want to populate for receiver
        .exec()
      return existingProposal
    } catch (error) {
      console.log({ error })
      return {
        msg: 'error Occured'
      }
    }
  }

  async FindProposalById (Id) {
    try {
      await db.connect()
      const existingProposal = await Proposal.findOne({
        _id: Id
      })
        .populate(
          'sender',
          '_id , name  , email , gender , profession ,  height ,skinColor , city , district , upazilla , profileId'
        ) // Replace 'username' with the fields you want to populate for sender
        .populate(
          'reciever',
          '_id , name  , email , gender , profession ,  height ,skinColor , city , district , upazilla , profileId '
        ) // Replace 'username' with the fields you want to populate for receiver
        .exec()
      return existingProposal
    } catch (error) {
      console.log({ error })
      return {
        error: 'error Occured'
      }
    }
  }

  async UpdateProposal ({ Id, status }) {
    try {
      await db.connect()

      const existing = await Proposal.findOne({ _id: Id })
        .populate(
          'sender',
          '_id , name  , email , gender , profession ,  height ,skinColor '
        ) // Replace 'username' with the fields you want to populate for sender
        .populate(
          'reciever',
          '_id , name  , email , gender , profession ,  height ,skinColor '
        ) // Replace 'username' with the fields you want to populate for receiver
        .exec()

      existing.status = status
      await existing.save()
      console.log({ existing })
      await db.disconnect()
      return existing
    } catch (error) {
      console.log(error)
    }
  }

  async UpdatePoke (Id) {
    try {
      await db.connect()
      const existing = await Proposal.findOne({ _id: Id })
        .populate(
          'sender',
          '_id , name  , email , gender , profession ,  height ,skinColor '
        ) // Replace 'username' with the fields you want to populate for sender
        .populate(
          'reciever',
          '_id , name  , email , gender , profession ,  height ,skinColor '
        ) // Replace 'username' with the fields you want to populate for receiver
        .exec()
      if (existing.pokeCount > 33) {
        return {
          error: 'You have reached maximum pock '
        }
      } else {
        existing.pokeCount += 1
        await existing.save()
        await db.disconnect()
        return existing
      }
    } catch (error) {
      console.log(error)
      return { error: 'error occured' }
    }
  }

  async DeleteProposalById (id) {
    try {
      await db.connect()
      const deletedProposal = await Proposal.deleteOne({ _id: id })
      await db.disconnect()

      return deletedProposal
    } catch (error) {
      console.log(error)
    }
  }
}

export default ProposalRepository
