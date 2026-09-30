import React, { useEffect, useState } from 'react'
import styles from '../../styles/Header.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import WcRoundedIcon from '@mui/icons-material/WcRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import PublicRoundedIcon from '@mui/icons-material/PublicRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import Ln from './Ln'
import BASE_URL from '@/config'

const Box = ({ data }) => {
  const [city, setCity] = useState('All')
  const [districts, setDistricts] = useState([])
  const [currentDistrict, setCurrentDistrict] = useState('All')
  const [upazillas, setUpazillas] = useState([])
  const [currentUpazilla, setCurrentUpazilla] = useState('All')
  const [gender, setGender] = useState('All')
  const [maritalStatus, setMaritalStatus] = useState('All')
  const [profileId, setProfileId] = useState('')
  const router = useRouter()

  const fetchDistricts = async selectedCity => {
    if (selectedCity === 'All') {
      setDistricts([])
      setCurrentDistrict('All')
      setUpazillas([])
      setCurrentUpazilla('All')
      return
    }
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/location/division/${selectedCity.toLowerCase()}`
      )
      setDistricts(data.data || [])
      setCurrentDistrict('All')
      setUpazillas([])
      setCurrentUpazilla('All')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDistricts(city)
  }, [city])

  const search = () => {
    router.push(
      `/profile?gender=${gender}&maritalStatuses=${[maritalStatus].join(',')}&city=${city}&district=${currentDistrict}&upazilla=${currentUpazilla}&feetFrom=4&inchesFrom=5&feetTo=6&inchesTo=5&page=1`
    )
  }

  const searchById = () => {
    if (profileId.trim()) router.push(`/profile/${profileId.trim()}`)
  }

  const fields = [
    { label: 'I am Looking for', icon: <WcRoundedIcon />, value: gender, onChange: setGender, options: ['All', 'Male', 'Female'] },
    { label: 'Marital Status', icon: <FavoriteRoundedIcon />, value: maritalStatus, onChange: setMaritalStatus, options: ['All', 'Never Married', 'Married', 'Divorced', 'Widowed'] }
  ]

  return (
    <div className={styles.box}>
      <form onSubmit={event => event.preventDefault()}>
        {fields.map(field => (
          <div className={styles.field} key={field.label}>
            <label>{field.icon}<Ln item={field.label} /></label>
            <select value={field.value} onChange={event => field.onChange(event.target.value)}>
              {field.options.map(option => <option key={option} value={option}><Ln item={option} /></option>)}
            </select>
          </div>
        ))}
        <div className={styles.field}>
          <label><LocationOnRoundedIcon /><Ln item='City' /></label>
          <select value={city} onChange={event => setCity(event.target.value)}>
            <option value='All'><Ln item='All' /></option>
            {(data?.data || []).map(item => (
              <option key={item._id} value={item.division}><Ln item={item.division} /></option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label><PublicRoundedIcon /><Ln item='District' /></label>
          <select value={currentDistrict} onChange={event => {
            const nextDistrict = event.target.value
            setCurrentDistrict(nextDistrict)
            const match = districts.find(item => item.district === nextDistrict)
            setUpazillas(match?.upazilla || [])
            setCurrentUpazilla('All')
          }}>
            <option value='All'><Ln item='All' /></option>
            {districts.map(item => <option key={item.district} value={item.district}><Ln item={item.district} /></option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label><LocationOnRoundedIcon /><Ln item='Upazilla' /></label>
          <select value={currentUpazilla} onChange={event => setCurrentUpazilla(event.target.value)}>
            <option value='All'><Ln item='All' /></option>
            {upazillas.map(item => <option key={item} value={item}><Ln item={item} /></option>)}
          </select>
        </div>
      </form>
      <div className={styles.flex}>
        <button className={styles.search} type='button' onClick={search}>
          <SearchRoundedIcon />
          <Ln item='Search' />
        </button>
        <div className={styles.searchbyId}>
          <input
            type='text'
            placeholder={router.locale === 'bn' ? 'আইডি দিয়ে প্রোফাইল খুঁজুন' : 'Search by profile ID'}
            value={profileId}
            onChange={event => setProfileId(event.target.value)}
            onKeyDown={event => { if (event.key === 'Enter') searchById() }}
            aria-label={router.locale === 'bn' ? 'প্রোফাইল আইডি' : 'Profile ID'}
          />
          <button className={styles.icon} type='button' onClick={searchById} aria-label='Search profile ID'>
            <SearchRoundedIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Box