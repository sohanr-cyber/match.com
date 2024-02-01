import React, { useEffect, useState } from 'react'
import styles from '../../styles/Profile/Proposal.module.css'
import BASE_URL from '@/config'
import axios from 'axios'
import Card from '../Profile/Card'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const Saved = () => {
  const [proposals, setProposals] = useState([])
  const [open, setOpen] = useState(false)
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()

  const recentUsers = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/user?UserId=${router.query.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )
      setProposals(data.savedIds)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    recentUsers()
  }, [router.query.id])

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>Saved Profile (0{proposals.length})</div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>
      {open && (
        <div className={styles.flex}>
          {proposals?.map((item, index) => (
            <>
              <div className={styles.item}>
                <Card user={item} index={index} />
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  )
}

export default Saved
