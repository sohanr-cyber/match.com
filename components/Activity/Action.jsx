import React, { useState } from 'react'
import styles from '../../styles/Profile/Action.module.css'
import SendProposal from './SendProposal'
import { useSelector } from 'react-redux'
const Action = ({ user }) => {
  const [openForm, setOpenForm] = useState(false)
  const userInfo = useSelector(state => state.user.userInfo)
  console.log(user)
  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <div className={styles.item}>
          {/* {user?.saverIds.find(i => i == userInfo?.id) ? (
            <div className={styles.title} onClick={() => setOpenForm(true)}>
              Proposed
            </div>
          ) : (
            <div className={styles.title} onClick={() => setOpenForm(true)}>
              Send Proposal
            </div>
          )} */}

          <div className={styles.title} onClick={() => setOpenForm(true)}>
            Send Proposal
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Save This Biodata</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Decline This Biodata</div>
        </div>
      </div>
      {openForm && <SendProposal setOpenForm={setOpenForm} />}
    </div>
  )
}

export default Action
