import React, { useEffect, useState } from 'react'
import styles from '../../styles/Profile/Proposal.module.css'
import BASE_URL from '@/config'
import axios from 'axios'
import Card from '../Profile/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Table from '../Profile/Table'
import { finishLoading, startLoading } from '@/redux/stateSlice'

const Saved = () => {
  const [proposals, setProposals] = useState([])
  const [table, setTable] = useState(true)
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const dispatch = useDispatch()
  
  const handleLike = async () => {
    try {
      if (!userInfo) {
        router.push('/login')
      }
      dispatch(startLoading())
      const { data } = await axios.put(
        '/api/user',
        {
          savedId: router.query.id
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )
      recentUsers()
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }

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
      </div>
      {
        <div className={styles.flex}>
          {proposals?.map((item, index) => (
            <>
              <div className={styles.item}>
                <Card user={item} index={index} handleLike={handleLike} />
              </div>
            </>
          ))}
        </div>
      }
    </div>
  )
}

export default Saved
