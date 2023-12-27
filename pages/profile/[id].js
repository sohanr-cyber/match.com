import Personal from '@/components/Profile/Personal'
import React from 'react'
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
  return (
    <>
      <Navbar />
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
        </div>
        <div className={styles.right}>
          {/* <Similar similar={similar} /> */}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProfileDetails

export async function getServerSideProps ({ query }) {
  const { id } = query

  try {
    const { data } = await axios.get(`${BASE_URL}/api/auth/${id}`)
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
