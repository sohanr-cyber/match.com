import db from '../connection'
import Proposal from '../model/Proposal'

class ProposalRepository {
  async CreateProposal (DataToCreate) {
    try {
      const instance = new Proposal({
        ...DataToCreate
      })
      const instanceResult = await instance.save()
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
          '_id , name  , email , gender , profession ,  height ,skinColor '
        ) // Replace 'username' with the fields you want to populate for sender
        .populate(
          'reciever',
          '_id , name  , email , gender , profession ,  height ,skinColor '
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

  async FindAllProposals () {}

  async UpdateProposal (Id, DataToUpdate) {
    try {
      await db.connect()

      const UpdateProposal = await Proposal.findOneAndUpdate(
        { user: Id },
        {
          ...DataToUpdate
        },
        {
          new: true
        }
      )
      if (UpdateProposal) {
        return UpdateProposal
      } else {
        return { msg: 'Not Found!' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async DeleteProposalById (id) {
    try {
      await db.connect()
      const deletedProposal = await Proposal.findByIdAndRemove({ _id: id })
      return deletedProposal
    } catch (error) {
      console.log(error)
    }
  }
}

export default ProposalRepository
