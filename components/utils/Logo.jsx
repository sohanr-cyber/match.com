import React from 'react'
import Link from 'next/link'
import Logo2 from './Logo2'
import styles from '@/styles/Utils/Logo.module.css'

export default function Logo ({ className = '' }) {
  return <Link href='/' className={styles.wrapper + ' ' + className} aria-label='Muslim Match Maker home'>
    <Logo2 className={styles.mark} />
    <span className={styles.wordmark}>
      <span className={styles.name}>Muslim</span>
      <span className={styles.subtitle}>MATCH MAKER</span>
    </span>
  </Link>
}