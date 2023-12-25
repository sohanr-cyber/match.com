import React from 'react'
import styles from '../styles/RegisterBanner.module.css'
import { useRouter } from 'next/router'
const RegisterBanner = () => {
  const router = useRouter()
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        Why are you waiting for you dream Partner ?{' '}
      </div>
      <div className={styles.right}>
        <div className={styles.btn} onClick={() => router.push('/register')}>
          Register Here
        </div>
      </div>
    </div>
  )
}

export default RegisterBanner
