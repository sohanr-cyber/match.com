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

const ProfileDetails = ({ data, similar }) => {
  return (
    <>
      <Navbar />
      <div className={styles.wrapper} style={{ minHeight: '100vh' }}>
        <div className={styles.left}>
          <Introduction data={data} />
          <Personal />
          <Physical />
          <Education />
          <Piety />
          <Address />
          <Family />
          <Expectation />
        </div>
        <div className={styles.right}>
          <Similar similar={similar} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProfileDetails

export async function getServerSideProps ({ query }) {
  const { id } = query
  console.log({ id })

  const fetch = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/auth/${id}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSimilar = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/auth/recent`)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const data = await fetch()
  const similar = await fetchSimilar()

  return {
    props: {
      data,
      similar // Pass null or handle error scenario
    }
  }
}
