import React from 'react'
import styles from '../styles/Header.module.css'
import Box from './utils/Box'
import { useRouter } from 'next/router'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

const Header = ({ data }) => {
  const router = useRouter()
  const isBangla = router.locale === 'bn'

  return (
    <section className={styles.wrapper}>
      <div className={styles.backdrop} aria-hidden='true' />
      <div className={styles.heroContent}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>
            <FavoriteRoundedIcon />
            <span>{isBangla ? 'আপনার জীবনের সঙ্গী খুঁজুন' : 'A more meaningful way to meet'}</span>
          </div>
          {isBangla ? (
            <h1 className={styles.heading1}>
              আপনার পছন্দের <span>জীবনসঙ্গী</span><br />খুঁজে নিন
            </h1>
          ) : (
            <h1 className={styles.heading1}>
              Find someone who <span>shares your values.</span>
            </h1>
          )}
          <p className={styles.heroDescription}>
            {isBangla
              ? 'আপনার বিশ্বাস, মূল্যবোধ ও ভবিষ্যৎ পরিকল্পনার সঙ্গে মানানসই মানুষ খুঁজুন।'
              : 'Meet people who share your faith, values, and hopes for the future.'}
          </p>
          <div className={styles.promiseRow}>
            <span><VerifiedRoundedIcon />{isBangla ? 'মূল্যবোধকে গুরুত্ব দিন' : 'Values come first'}</span>
            <span><FavoriteRoundedIcon />{isBangla ? 'সম্পর্ক গড়ুন নিজের গতিতে' : 'Meet at your own pace'}</span>
          </div>
        </div>
        <div className={styles.searchWrap} id='home-search'>
          <div className={styles.searchHeading}>
            <div>
              <span className={styles.searchKicker}>{isBangla ? 'শুরু করুন' : 'YOUR NEXT CHAPTER'}</span>
              <h2>{isBangla ? 'আপনার পছন্দের মানুষ খুঁজুন' : 'Start your search'}</h2>
              <p>{isBangla ? 'আপনার জন্য গুরুত্বপূর্ণ বিষয়গুলো বেছে নিন' : 'Choose what matters to you in a partner.'}</p>
            </div>
            <div className={styles.searchMark}><SearchRoundedIcon /></div>
          </div>
          <Box data={data} />
        </div>
      </div>
    </section>
  )
}

export default Header