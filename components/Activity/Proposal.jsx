import React, { useEffect, useState } from 'react'
import styles from '../../styles/Profile/Proposal.module.css'
import BASE_URL from '@/config'
import axios from 'axios'
import Card from '../Profile/Card'

const Proposal = () => {
  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false)

  const recentUsers = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/auth/recent`)
      setUsers(data)
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
        <div className={styles.title}>Proposal Recieved</div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>
      {open && (
        <div className={styles.flex}>
          {users?.map((item, index) => (
            <>
              <div className={styles.item}>
                <Card user={item} index={index} />
                <div className={styles.action}>
                  <div className={styles.accept}>Accept</div>
                  <div className={styles.decline}>Decline</div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  )
}

export default Proposal
