import React from 'react'
import Logo from './utils/Logo'
import styles from '../styles/Footer.module.css'
import Image from 'next/image'
import CopyrightIcon from '@mui/icons-material/Copyright'
import { useRouter } from 'next/router'
import { getText } from '@/Translation/footer'
import { mail, phone } from '@/const'
const Footer = () => {
  const router = useRouter()
  const ln = router.locale
  // console.log(router)
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
            <div
              className={styles.link}
              onClick={() =>
                router.push(
                  '/profile?gender=All&maritalStatuses=All&city=All&district=All&upazilla=All&feetFrom=4&inchesFrom=5&feetTo=6&inchesTo=5&page=1'
                )
              }
            >
              {getText('search', ln)}
            </div>
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
          <div
            className={styles.mail}
            onClick={() => router.push(`mailto:${mail}`)}
          >
            {getText('mail', ln)}: <span>{mail}</span>
          </div>
          {/* <div className={styles.call}>
            {getText('call', ln)}: <span>{phone}</span>
          </div> */}
          <div className={styles.social__media__links}>
            <Image
              src={'https://cdn-icons-png.flaticon.com/128/5968/5968764.png'}
              width='35'
              height='35'
              alt=''
              onClick={() =>
                router.push(
                  'https://www.facebook.com/profile.php?id=61563578257362'
                )
              }
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
      <div className={styles.rights} style={{ display: 'none' }}>
        <p className={styles.c}>
          <CopyrightIcon />
          2022 All Rights Reserved
        </p>
        <p style={{ color: '' }}>
          Design, Developed and Technical Supported by{' '}
          <span
            style={{
              color: 'purple',
              fontSize: '110%',
              fontWeight: 'bold',
              borderBottom: '1px solid blue',
              paddingBottom: '3px'
            }}
            onClick={() => router.push('https://quince-software.vercel.app')}
          >
            Quince.Tech
          </span>
        </p>
      </div>
    </>
  )
}

export default Footer
