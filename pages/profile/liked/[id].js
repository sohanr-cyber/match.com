import Personal from '@/components/Profile/Personal'
import React, { useEffect, useState } from 'react'
import styles from './../../../styles/Profile/Details.module.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Introduction from '@/components/Profile/Introduction'
import Physical from '@/components/Profile/Physical'
import Education from '@/components/Profile/Education'
import Family from '@/components/Profile/Family'
import Address from '@/components/Profile/Address'
import Expectation from '@/components/Profile/Expectation'
import Piety from '@/components/Profile/Piety'
import Similar from '@/components/Profile/Similar'
import axios from 'axios'
import BASE_URL from '@/config'
import Proposal from '@/components/Activity/Proposal'
import Action from '@/components/Activity/Action'
import Saved from '@/components/Activity/Saved'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { parse } from 'cookie'

const ProfileDetails = ({}) => {
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <div
        className={styles.wrapper}
        style={{ minHeight: '100vh', paddingTop: '70px' }}
      >
        <div className={styles.left}>
          {isClient && router.query.id == userInfo?.id && <Saved />}
        </div>
        <div className={styles.right}></div>
      </div>
    </>
  )
}

export default ProfileDetails
