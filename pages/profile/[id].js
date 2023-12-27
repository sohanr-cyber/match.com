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
  data,
  similar,
  personal,
  family,
  expectation,
  physical,
  address,
  education,
  religion
}) => {
  console.log({ address })
  return (
    <>
      <Navbar />
      <div className={styles.wrapper} style={{ minHeight: '100vh' }}>
        <div className={styles.left}>
          <Introduction data={data} />
          <Personal personal={personal} />
          <Physical physical={physical} />
          <Education education={education} />
          <Piety religion={religion} />
          <Address address={address} />
          <Family family={family} />
          <Expectation expectation={expectation} />
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

  const fetchPersonal = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/personal/${id}`)
    return data
  }
  const fetchFamily = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/family/${id}`)
    return data
  }
  const fetchEducation = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/education/${id}`)
    return data
  }

  const fetchPhysical = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/physical/${id}`)
    return data
  }

  const fetchAddress = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/address/${id}`)
    return data
  }

  const fetchReligion = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/family/${id}`)
    return data
  }

  const fetchExpectation = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/expectation/${id}`)
    return data
  }

  const data = await fetch()
  const similar = await fetchSimilar()
  const personal = await fetchPersonal()
  const family = await fetchFamily()
  const expectation = await fetchExpectation()
  const physical = await fetchPhysical()
  const address = await fetchAddress()
  const religion = await fetchReligion()
  const education = await fetchEducation()

  return {
    props: {
      data,
      similar,
      personal,
      family,
      expectation,
      physical,
      address,
      religion,
      education
    }
  }
}
