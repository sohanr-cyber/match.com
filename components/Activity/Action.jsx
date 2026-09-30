import React, { useState } from 'react'
import styles from '../../styles/Profile/Action.module.css'
import SendProposal from './SendProposal'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getText } from '@/Translation/profile'

const Action = ({ user }) => {
  const [openForm, setOpenForm] = useState(false)
  const userInfo = useSelector(state => state.user.userInfo)
  const { locale: ln } = useRouter()
  const containsViewer = ids => Boolean(userInfo?.id && ids?.some(id => String(id) === String(userInfo.id)))
  const accepted = containsViewer(user?.proposalAccepted)
  const sent = containsViewer(user?.proposalRecieved)
  const received = containsViewer(user?.proposalSent)
  const existingProposal = accepted || sent || received
  const title = accepted
    ? getText('Proposal Accepted', ln)
    : sent
      ? getText('proposalSent', ln)
      : received
        ? getText('proposalRecieved', ln)
        : getText('sendProposal', ln)

  return <>
    <button
      type='button'
      className={styles.proposalButton}
      onClick={() => setOpenForm(true)}
      disabled={existingProposal}
      aria-haspopup='dialog'
      aria-expanded={openForm}
    >
      <span className={styles.proposalIcon} aria-hidden='true'>
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round'>
          {existingProposal
            ? <path d='m5 12 4 4L19 6' />
            : <><path d='m21 3-6.5 18-4-7.5L3 9.5 21 3Z' /><path d='m10.5 13.5 5-5' /></>}
        </svg>
      </span>
      <span>{title}</span>
      {!existingProposal && <span className={styles.proposalArrow} aria-hidden='true'>↗</span>}
    </button>
    {openForm && <SendProposal setOpenForm={setOpenForm} user={user} />}
  </>
}

export default Action
