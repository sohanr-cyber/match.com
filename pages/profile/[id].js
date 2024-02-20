import Personal from '@/components/Profile/Personal'
import React, { useEffect, useState } from 'react'
import styles from './../../styles/Profile/Details.module.css'
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
import Activate from '@/components/Profile/Update/Activate'
import SideNavbar from '@/components/Profile/SideNavbar'
import Others from '@/components/Profile/Others'

const ProfileDetails = ({
  user,
  address,
  religion,
  physical,
  education,
  expectation,
  personal,
  family
}) => {
  console.log({ address })
  const userInfo = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <div className={styles.wrapper} style={{ minHeight: '100vh' }}>
        <div className={styles.left}>
          <Introduction data={user} />
          <Personal personal={personal} />
          <Physical physical={physical} />
          <Education education={education} />
          <Piety religion={religion} />
          <Address address={address} />
          <Family family={family} />
          <Expectation expectation={expectation} />
          <Others data={user} />
          {isClient && router.query.id != userInfo?.id && (
            <Action user={user} />
          )}
          {isClient && router.query.id == userInfo?.id && (
            <Activate
              profile={{
                user,
                address,
                religion,
                physical,
                education,
                expectation,
                personal,
                family
              }}
            />
          )}
        </div>
        <div className={styles.right}>
          {/* <Similar similar={similar} /> */}
        </div>
      </div>
    </>
  )
}

export default ProfileDetails

export async function getServerSideProps (context) {
  const { id } = context.query
  const { req } = context
  const cookies = parse(req.headers.cookie || '')
  console.log({ cookies })
  const userInfo = cookies['userInfo']

  try {
    const { data } = userInfo
      ? await axios.get(`${BASE_URL}/api/auth/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(userInfo)?.token}`
          }
        })
      : await axios.get(`${BASE_URL}/api/auth/${id}`)
    const {
      existingUser,
      address,
      religion,
      physical,
      education,
      expectation,
      personal,
      family
    } = data

    return {
      props: {
        user: existingUser,
        address,
        religion,
        physical,
        education,
        expectation,
        personal,
        family
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {} // Return an empty props object or handle errors accordingly
    }
  }
}
