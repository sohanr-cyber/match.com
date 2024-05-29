import React, { useState } from 'react'
import styles from '../../styles/Profile/Action.module.css'
import SendProposal from './SendProposal'
import { useSelector } from 'react-redux'
import Icon from '../utils/Icon'
import { useRouter } from 'next/router'
import { getText } from '@/Translation/profile'
const Action = ({ user }) => {
  const [openForm, setOpenForm] = useState(false)
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const ln = router.locale

  // console.log(user)
  return (
    <div className={styles.wrapper}>
      {' '}
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

          <Icon
            image={'https://cdn-icons-png.flaticon.com/128/8500/8500126.png'}
            title={
              user?.proposalAccepted?.find(i => i == userInfo?.id)
                ? getText('Proposal Accepted', ln)
                : user?.proposalRecieved?.find(i => i == userInfo?.id)
                ? getText('proposalSent', ln)
                : user?.proposalSent?.find(i => i == userInfo?.id)
                ? getText('proposalRecieved', ln)
                : getText('sendProposal', ln)
            }
            handleClick={() => {
              setOpenForm(true)
            }}
            allowed={
              user?.proposalRecieved?.find(i => i == userInfo?.id) ||
              user?.proposalSent?.find(i => i == userInfo?.id)
                ? false
                : true
            }
          />
        </div>
        {/* <div className={styles.item}>
          <Icon
            image={'https://cdn-icons-png.flaticon.com/128/3318/3318502.png'}
            title={
              user.saverIds.find(i => i == userInfo.id)
                ? 'Save Biodata'
                : 'Biodata Saved'
            }
            handleClick={() => {}}
          />
        </div> */}
        {/* <div className={styles.item}>
          <Icon
            image={'https://cdn-icons-png.flaticon.com/128/550/550233.png'}
            title={
              user.proposalRecieved.find(i => i == userInfo.id)
                ? 'Decline Biodata'
                : 'Biodata Declined'
            }
            handleClick={() => {}}
          />{' '}
        </div> */}
      </div>
      {openForm && <SendProposal setOpenForm={setOpenForm} user={user} />}
    </div>
  )
}

export default Action
