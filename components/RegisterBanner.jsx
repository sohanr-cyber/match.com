import React from 'react'
import styles from '../styles/RegisterBanner.module.css'
import { useRouter } from 'next/router'
import { getText } from '@/Translation/banner'
const RegisterBanner = () => {
  const router = useRouter()
  const ln = router.locale

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>{getText('t', ln)} </div>
      <div className={styles.right}>
        <div className={styles.btn} onClick={() => router.push('/register')}>
          {getText('btn', ln)}
        </div>
      </div>
    </div>
  )
}

export default RegisterBanner
