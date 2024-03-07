import React from 'react'
import styles from '../../styles/Utils/Logo.module.css'
import { useRouter } from 'next/router'

const Logo = () => {
  const router = useRouter()
  return (
    <div className={styles.wrapper} onClick={() => router.push('/')}>
      <div className={styles.top}>Muslim</div>
      <div className={styles.bottom}>
        <span>Match </span>
        <span>Maker</span>
      </div>
    </div>
  )
}

export default Logo
