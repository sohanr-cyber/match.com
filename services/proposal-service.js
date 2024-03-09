import ProposalRepository from '@/database/repository/proposal-repository'
import { FormateData } from '@/utility'
import UserService from './user-service'
import NotificationService from './notification-service'
class ProposalService {
  constructor () {
    this.repository = new ProposalRepository()
    this.userService = new UserService()
    this.NotificationService = new NotificationService()
  }

  async FindProposalsByUserId (UserId) {
    try {
      const existingProposal = await this.repository.FindProposalsByUserId(
        UserId
      )

      return FormateData(existingProposal)
    } catch (error) {
      console.log(error)
    }
  }

  // Accept Proposal
  async UpdateProposal ({ Id, status, acceptor, sender }) {
    try {
      const existingProposal = await this.repository.UpdateProposal({
        Id,
        status
      })

      const existingUser = await this.userService.AcceptUserProposal({
        acceptor,
        sender
      })

      console.log(existingProposal)
      return FormateData(existingProposal)
    } catch (error) {
      console.log(error)
    }
  }

  // Decline Proposal
  async DeclineProposal ({ Id, status }) {
    try {
      const existingProposal = await this.repository.UpdateProposal({
        Id,
        status
      })
      console.log(existingProposal)
      return FormateData(existingProposal)
    } catch (error) {
      console.log(error)
    }
  }

  async WithdrawUserProposal ({ Id, sender, reciever, status }) {
    try {
      const existingProposal = await this.repository.UpdateProposal({
        Id,
        status
      })
      const updatedUsers = await this.userService.WithdrawUserProposal({
        Id,
        sender,
        reciever
      })
      return
    } catch (error) {}
  }

  async CreateProposal (DataToCreate) {
    try {
      const newProposal = await this.repository.CreateProposal(DataToCreate)
      const updatedUser = await this.userService.UpdateUserProposal({
        sender: newProposal.sender,
        reciever: newProposal.reciever
      })
      console.log({ updatedUser })

      // send proposal notification
      await this.NotificationService.sendProposalNotification({
        senderName: updatedUser.senderUpdated.name,
        senderId: updatedUser.senderUpdated._id,
        recieverEmail: 'sohanur25800@gmail.com'
      })
      return FormateData(newProposal)
    } catch (error) {
      console.log(error)
    }
  }

  async Pock ({ Id }) {
    try {
      const existing = await this.repository.UpdatePoke(Id)
      if (!existing.error) {
        // send  mail to user
        return { msg: `pocked(${existing.pokeCount}) sucesfull !` }
      } else {
        return { error: existing.error }
      }
    } catch (error) {
      return { error: 'error occured' }
    }
  }
}

export default ProposalService
