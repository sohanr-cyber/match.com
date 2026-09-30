export const proposalStages = ['pending', 'Accepted', 'In Discussion', 'Family Discussion', 'Meeting Scheduled', 'Engaged', 'Married']
export const connectedProposalStatuses = proposalStages.slice(1)
export const proposalStatuses = [...proposalStages, 'Declined', 'Withdrawn']

export function appendProposalEvent (proposal, { status = proposal.status, actor, actorRole = 'member', note = '', type = 'status' }) {
  if (!proposal.timeline?.length) {
    proposal.timeline = [{
      type: 'snapshot', status: proposal.status,
      at: proposal.updatedAt || proposal.createdAt || new Date(),
      note: 'Status recorded before timeline tracking began.'
    }]
  }
  proposal.timeline.push({ type, status, actor, actorRole, note, at: new Date() })
}