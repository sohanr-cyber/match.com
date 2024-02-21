import React from 'react'
import styles from '../../styles/Utils/Logo.module.css'
import { useRouter } from 'next/router'

const Logo = () => {
  const router = useRouter()
  return (
    <div className={styles.wrapper} onClick={() => router.push('/')}>
      <span>M</span>uslim<span>M</span>atch<span>M</span>aker
    </div>
  )
}

export default Logo
