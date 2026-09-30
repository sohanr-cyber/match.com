import React from 'react'
import styles from '../styles/RegisterBanner.module.css'
import { useRouter } from 'next/router'
import { getText } from '@/Translation/banner'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
const RegisterBanner = () => {
  const router = useRouter()
  const ln = router.locale
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.copy}>
          <span className={styles.icon}><FavoriteRoundedIcon /></span>
          <div>
            <span className={styles.kicker}>{ln === 'bn' ? 'আপনার গল্প এখান থেকে শুরু' : 'MAKE ROOM FOR SOMETHING REAL'}</span>
            <h2>{getText('t', ln)}</h2>
            <p>{ln === 'bn' ? 'একটি প্রোফাইল তৈরি করে আপনার যাত্রা শুরু করুন।' : 'Create a profile and begin your search for a meaningful connection.'}</p>
          </div>
        </div>
        <button className={styles.btn} onClick={() => router.push('/register')}>
          {getText('btn', ln)} <ArrowForwardRoundedIcon />
        </button>
      </div>
    </section>
  )
}
export default RegisterBanner