import ProposalRepository from '@/database/repository/proposal-repository'
import { FormateData } from '@/utility'

class ProposalService {
  constructor () {
    this.repository = new ProposalRepository()
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


  async UpdateProposal (Id, DataToUpdate) {
    try {
      const existingProposal = await this.repository.UpdateProposal(
        Id,
        DataToUpdate
      )
      console.log(existingProposal)
      return FormateData(existingProposal)
    } catch (error) {
      console.log(error)
    }
  }


  async CreateProposal (DataToCreate) {
    try {
      const newProposal = await this.repository.CreateProposal(DataToCreate)
      console.log(newProposal)
      return FormateData(newProposal)
    } catch (error) {
      console.log(error)
    }
  }

  
}

export default ProposalService
