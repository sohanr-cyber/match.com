import React, { useEffect, useState } from 'react'
import styles from '../../styles/Profile/Proposal.module.css'
import BASE_URL from '@/config'
import axios from 'axios'
import Card from '../Profile/Card'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const Proposal = () => {
  const [proposals, setProposals] = useState([])
  const [open, setOpen] = useState(false)
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  
  const recentUsers = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/proposal?userId=${userInfo.id}`
      )
      setProposals(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    recentUsers()
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>
          Proposal Recieved (0{proposals.length || "0"})
        </div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>
      {open && (
        <div className={styles.flex}>
          {proposals?.map((item, index) => (
            <>
              <div className={styles.item}>
                <Card
                  user={
                    router.query.id == item.sender._id
                      ? item.reciever
                      : item.sender
                  }
                  index={index}
                />
                {userInfo.id == router.query.id && (
                  <div className={styles.action}>
                    <div className={styles.accept}>Accept</div>
                    <div className={styles.decline}>Decline</div>
                  </div>
                )}
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  )
}

export default Proposal
