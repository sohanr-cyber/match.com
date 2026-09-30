import React, { useState } from 'react'
import styles from '../../styles/Profile/Index.module.css'
import Card from '@/components/Profile/Card'
import axios from 'axios'
import BASE_URL from '@/config'
import Search from '@/components/Search'
import Pagination from '@/components/Pagination'
import { useRouter } from 'next/router'
import { englishToBangla } from '@/utils'
import { getText } from '@/Translation/search'
import { divisions } from '@/utility/divisions'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'

const emptyData = { users: [], totalPages: 1, totalUsers: 0, currentPage: 1 }

const Profile = ({ data = emptyData, locationData = divisions, dataError = false }) => {
  const router = useRouter()
  const [openfilter, setOpenFilter] = useState(false)
  const ln = router.locale
  const users = Array.isArray(data?.users) ? data.users : []
  const totalUsers = Number(data?.totalUsers) || 0
  const isBangla = ln === 'bn'

  return (
    <main className={styles.wrapper}>
      {openfilter && <Search setOpenFilter={setOpenFilter} locationData={locationData?.data || []} />}
      <div className={styles.inner}>
        <header className={styles.pageHeading}>
          <span className={styles.kicker}>{isBangla ? 'আপনার পছন্দের মানুষ' : 'FIND YOUR PERSON'}</span>
          <h1>{isBangla ? 'আপনার জীবনসঙ্গী খুঁজুন' : 'Explore profiles'}</h1>
          <p>{isBangla ? 'আপনার মূল্যবোধের সঙ্গে মানানসই মানুষ খুঁজুন।' : 'Discover people who share your values and hopes for the future.'}</p>
        </header>
        <section className={styles.resultsPanel}>
          <div className={styles.resultsBar}>
            <div className={styles.resultCount}>
              <span className={styles.countNumber}>{englishToBangla(totalUsers, ln)}</span>
              <span>{getText('result', ln)}</span>
            </div>
            <button className={styles.filter} type='button' onClick={() => setOpenFilter(true)}>
              <TuneRoundedIcon /> {getText('filter', ln)}
            </button>
          </div>
          {dataError ? (
            <div className={styles.emptyState} role='alert'>
              <span className={styles.emptyIcon}><SearchOffRoundedIcon /></span>
              <h2>{isBangla ? 'প্রোফাইলগুলো এখন লোড করা যাচ্ছে না' : 'Profiles are temporarily unavailable'}</h2>
              <p>{isBangla ? 'আবার চেষ্টা করুন। সমস্যা চলতে থাকলে পরে ফিরে আসুন।' : 'We could not connect to the profile service. Please try again in a moment.'}</p>
              <button className={styles.retry} type='button' onClick={() => router.replace(router.asPath)}>
                <RefreshRoundedIcon /> {isBangla ? 'আবার চেষ্টা করুন' : 'Try again'}
              </button>
            </div>
          ) : users.length ? (
            <div className={styles.profile__cards}>
              {users.map((user, index) => <Card key={user._id || index} user={user} index={index} variant='glass' />)}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}><SearchOffRoundedIcon /></span>
              <h2>{isBangla ? 'কোনো প্রোফাইল মেলেনি' : 'No profiles found'}</h2>
              <p>{isBangla ? 'ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।' : 'Try adjusting your filters to see more profiles.'}</p>
              <button className={styles.retry} type='button' onClick={() => setOpenFilter(true)}>
                <TuneRoundedIcon /> {isBangla ? 'ফিল্টার পরিবর্তন করুন' : 'Adjust filters'}
              </button>
            </div>
          )}
          {!dataError && users.length > 0 && Number(data?.totalPages) > 1 && (
            <Pagination totalPages={data.totalPages} currentPage={data.currentPage || 1} />
          )}
        </section>
      </div>
    </main>
  )
}

export async function getServerSideProps (context) {
  const query = context.query || {}
  const keys = [
    'gender', 'maritalStatuses', 'city', 'district', 'upazilla', 'professions',
    'feetFrom', 'inchesFrom', 'feetTo', 'inchesTo', 'educationTypes',
    'universityNames', 'educationalStatuses', 'bornAtFrom', 'bornAtTo',
    'categories', 'page', 'skinColors'
  ]
  const params = new URLSearchParams()
  const defaults = { gender: 'All', maritalStatuses: 'All', city: 'All', district: 'All', upazilla: 'All', professions: 'All', educationTypes: 'All', universityNames: 'All', educationalStatuses: 'All', bornAtFrom: 'All', bornAtTo: 'All', categories: 'All', page: '1', skinColors: 'All' }
  keys.forEach(key => {
    const value = query[key] ?? defaults[key]
    if (value !== undefined) params.set(key, Array.isArray(value) ? value.join(',') : String(value))
  })

  try {
    const { data } = await axios.get(`${BASE_URL}/api/auth/user-filter?${params.toString()}`, { timeout: 10000 })
    return { props: { data, locationData: divisions, dataError: false } }
  } catch (error) {
    console.error('Unable to load profile results:', error.message)
    return { props: { data: emptyData, locationData: divisions, dataError: true } }
  }
}

export default Profile