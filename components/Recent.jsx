import React from 'react'
import styles from '@/styles/Recent.module.css'
import Card from '@/components/Profile/Card'
import { useRouter } from 'next/router'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

const Recent = ({ recent = [] }) => {
  const router = useRouter()
  const isBangla = router.locale === 'bn'
  const browseProfiles = () => router.push('/profile?gender=All&maritalStatuses=All&city=All&district=All&upazilla=All&feetFrom=4&inchesFrom=5&feetTo=6&inchesTo=5&page=1')

  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.headingRow}>
          <div>
            <span className={styles.kicker}>{isBangla ? 'নতুন সংযোগ' : 'A PLACE TO BEGIN'}</span>
            <h2>{isBangla ? 'সম্প্রতি তৈরি করা প্রোফাইল সমূহ' : 'Recently created profiles'}</h2>
            <p>{isBangla ? 'আপনার পরবর্তী পরিচিতি এখান থেকে শুরু হতে পারে।' : 'Your next introduction could begin here.'}</p>
          </div>
          <button className={styles.browse} type='button' onClick={browseProfiles}>
            <SearchRoundedIcon /> {isBangla ? 'প্রোফাইল দেখুন' : 'Browse profiles'}
          </button>
        </div>
        {recent.length ? (
          <div className={styles.grid}>
            {recent.map((item, index) => <Card key={item._id || index} index={index} user={item} variant='glass' />)}
          </div>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}><FavoriteRoundedIcon /></span>
            <div>
              <h3>{isBangla ? 'নতুন প্রোফাইল শীঘ্রই আসছে' : 'New introductions are on the way'}</h3>
              <p>{isBangla ? 'প্রোফাইলগুলো দেখতে ব্রাউজ করুন অথবা পরে আবার আসুন।' : 'Browse member profiles or check back soon for recent additions.'}</p>
            </div>
            <button type='button' onClick={browseProfiles}>{isBangla ? 'সব প্রোফাইল দেখুন' : 'Explore profiles'} <SearchRoundedIcon /></button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Recent