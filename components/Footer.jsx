import React from 'react'
import Logo from './utils/Logo'
import styles from '../styles/Footer.module.css'
import Image from 'next/image'
import CopyrightIcon from '@mui/icons-material/Copyright'
import { useRouter } from 'next/router'
import { getText } from '@/Translation/footer'
const Footer = () => {
  const router = useRouter()
  const ln = router.locale
  console.log(router)
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Logo />
          <div className={styles.about}>{getText('c', ln)}</div>
        </div>
        <div className={styles.mid}>
          <h2 className={styles.heading}>{getText('h1', ln)}</h2>
          <div className={styles.flex}>
            <div className={styles.link} onClick={() => router.push('/')}>
              {getText('home', ln)}
            </div>
            <div className={styles.link}>{getText('search', ln)}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.link}>{getText('plans', ln)}</div>
            <div
              className={styles.link}
              onClick={() => router.push('https://quince-tech.vercel.app')}
            >
              {getText('software', ln)}
            </div>
          </div>
          <div className={styles.flex}>
            <div
              className={styles.link}
              onClick={() => router.push('/privacy-policy')}
            >
              {getText('privacy', ln)}
            </div>
            <div
              className={styles.link}
              onClick={() => router.push('/terms-and-conditions')}
            >
              {getText('terms', ln)}{' '}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <h2 className={styles.heading}>{getText('h2', ln)}</h2>
          <div className={styles.mail}>
            {getText('mail', ln)}: <span>mail@gmail.com</span>
          </div>
          <div className={styles.call}>
            {getText('call', ln)}: <span>mail@gmail.com</span>
          </div>
          <div className={styles.social__media__links}>
            <Image
              src={'https://cdn-icons-png.flaticon.com/128/5968/5968764.png'}
              width='35'
              height='35'
              alt=''
            />
            <Image
              src={'https://cdn-icons-png.flaticon.com/128/3955/3955024.png'}
              width='35'
              height='35'
              alt=''
            />
            <Image
              src={'https://cdn-icons-png.flaticon.com/128/733/733585.png'}
              width='35'
              height='35'
              alt=''
            />
          </div>
        </div>
      </div>
      <div className={styles.rights}>
        <CopyrightIcon />
        2022 All Rights Reserved
      </div>
    </>
  )
}

export default Footer
