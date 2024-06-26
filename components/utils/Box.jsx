import React, { useState, useEffect, use } from 'react'
import styles from '../../styles/Header.module.css'

import axios from 'axios'
import { useRouter } from 'next/router'
import {
  professions,
  maritalStatuses,
  educationTypes,
  institutes
} from '@/pages/api/auth/data'
import SearchIcon from '@mui/icons-material/Search'
import Ln from './Ln'
import BASE_URL from '@/config'

const Box = ({ data }) => {
  const [city, setCity] = useState('All')
  const [districts, setDistricts] = useState([])
  const [currentDistrict, setCurrentDistrict] = useState()
  const [upazillas, setUpazzilas] = useState([])
  const [currentUpazilla, setCurrentUpazilla] = useState('All')
  const [gender, setGender] = useState('All')
  const [maritalStatus, setMaritalStatus] = useState('All')
  const router = useRouter()
  const [profileId, setProfileId] = useState('')

  const fetch = async city => {
    try {
      if (city == 'All') {
        setCurrentDistrict('All')
        setDistricts(['All'])
        setCurrentUpazilla(['All'])
        setUpazzilas([])
        return
      }
      const { data } = await axios.get(
        `${BASE_URL}/api/location/division/${city.toLowerCase()}`
      )
      setDistricts(data.data)
      // setCurrentDistrict(data.data[0].district);
    } catch (error) {
      console.log(error)
    }
  }

  const searchById = () => {
    router.push(`/profile/${profileId}`)
  }

  const search = () => {
    try {
      router.push(
        `/profile?gender=${gender}&maritalStatuses=${[maritalStatus].join(
          ','
        )}&city=${city}&district=${currentDistrict}&upazilla=${currentUpazilla}&feetFrom=${4}&inchesFrom=${5}&feetTo=${6}&inchesTo=${5}&page=${1}`
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch(city)
  }, [city])
  return (
    <div className={styles.box}>
      <form>
        <div className={styles.field}>
          {' '}
          <label>
            <Ln item={'I am Looking for'} />
          </label>
          <select default='All' onChange={e => setGender(e.target.value)}>
            {['All', 'Male', 'Female'].map((item, index) => (
              <option key={index}>
                <Ln item={item} />
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          {' '}
          <label>
            <Ln item={'Marital Status'} />
          </label>
          <select
            default='Unmarried'
            onChange={e => setMaritalStatus(e.target.value)}
          >
            {['All', 'Never Married', 'Married', 'Divorced', , 'Widowed'].map(
              (item, index) => (
                <option key={index}>
                  {' '}
                  <Ln item={item} />
                </option>
              )
            )}
          </select>
        </div>

        <div className={styles.field}>
          <label>
            <Ln item={'City'} />
          </label>
          <select onChange={e => setCity(e.target.value)}>
            {[{ division: 'All' }, ...data.data].map((item, index) => (
              <option
                key={index}
                value={item.division}
                selected={item.division == 'All' ? true : false}
              >
                <Ln item={item.division} />
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>
            {' '}
            <Ln item={'District'} />
          </label>
          <select
            onChange={e => {
              setCurrentDistrict(e.target.value)
              setUpazzilas(
                districts.find(item => item.district == e.target.value)
                  ? districts.find(item => item.district == e.target.value)
                      .upazilla
                  : []
              )
              e.target.value = 'All' & setCurrentUpazilla('All')
            }}
          >
            {[
              {
                district: 'All'
              },
              ...districts
            ].map(
              (item, index) =>
                item.district && (
                  <option
                    key={index}
                    value={item.district}
                    selected={item.district == currentDistrict ? true : false}
                  >
                    <Ln item={item.district} />
                  </option>
                )
            )}
          </select>
        </div>

        <div className={styles.field}>
          <label>
            <Ln item={'Upazilla'} />
          </label>
          <select onChange={e => setCurrentUpazilla(e.target.value)}>
            {['All', ...upazillas].map((item, index) => (
              <option
                key={index}
                selected={item == currentUpazilla ? true : false}
                value={item}
              >
                <Ln item={item} />
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className={styles.flex}>
        <div className={styles.search} onClick={() => search()}>
          <Ln item={'Search'} />
        </div>
        <div className={styles.searchbyId}>
          <input
            type='text'
            placeholder={
              router.locale == 'bn'
                ? 'আইডি দ্বারা প্রোফাইল অনুসন্ধান করুন'
                : 'Search Profile By Id'
            }
            value={profileId}
            onChange={e => setProfileId(e.target.value)}
          />
          <div className={styles.icon}>
            <SearchIcon onClick={() => searchById()} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Box
