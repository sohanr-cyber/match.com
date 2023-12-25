import React, { useState } from 'react'
import styles from '../../styles/Profile/Index.module.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Card from '@/components/Profile/Card'
import axios from 'axios'
import BASE_URL from '@/config'
import Search from '@/components/Search'
import Pagination from '@/components/Pagination'
const Profile = ({ data, locationData }) => {
  const [openfilter, setOpenFilter] = useState(false)
  return (
    <>
      {openfilter && (
        <Search
          setOpenFilter={setOpenFilter}
          locationData={locationData.data}
        />
      )}
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.flex}>
          <div
            className={styles.filter}
            onClick={() => {
              setOpenFilter(true)
            }}
          >
            Filter
          </div>
          <div className={styles.total}>Total Results : {data.totalUsers}</div>
        </div>
        <div className={styles.profile__cards}>
          {data.users.map((user, index) => (
            <Card key={index} user={user} index={index} />
          ))}
        </div>
        <Pagination
          totalPages={data.totalPages}
          currentPage={data.currentPage}
        />
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps (context) {
  const {
    city,
    district,
    upazilla,
    gender,
    professions,
    maritalStatuses,
    feetFrom,
    inchesFrom,
    feetTo,
    inchesTo,
    educationTypes,
    universityNames,
    educationalStatuses,
    bornAtTo,
    bornAtFrom,
    page
  } = context.query

  const url = `${BASE_URL}/api/auth/user-filter?gender=${
    gender || 'All'
  }&maritalStatuses=${maritalStatuses || 'All'}&city=${
    city || 'All'
  }&district=${district || 'All'}&upazilla=${upazilla || 'All'}&professions=${
    professions || 'All'
  }&feetFrom=${feetFrom}&inchesFrom=${inchesFrom}&feetTo=${feetTo}&inchesTo=${inchesTo}&educationTypes=${
    educationTypes || 'All'
  }&universityNames=${universityNames || 'All'}&educationalStatuses=${
    educationalStatuses || 'All'
  }&bornAtFrom=${bornAtFrom || 'All'}&bornAtTo=${bornAtTo || 'All'}&page=${
    page || 1
  }`

  const fetchData = async () => {
    try {
      const { data } = await axios.get('https://bdapis.com/api/v1.1/divisions')
      return data
    } catch (error) {
      console.log(error)
    }
  }

  try {
    const { data } = await axios.get(url)
    const locationData = await fetchData()
    return {
      props: {
        data: data,
        locationData
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        data: null // Pass null or handle error scenario
      }
    }
  }
}

export default Profile
