import React, { useEffect, useState } from 'react'
import styles from '../styles/Header.module.css'
const backgrounds = [
  'https://images.pexels.com/photos/306066/pexels-photo-306066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',

  'https://images.pexels.com/photos/627975/pexels-photo-627975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/8891957/pexels-photo-8891957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
]

const mobileBackgrounds = [
  'https://images.pexels.com/photos/306066/pexels-photo-306066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/6765928/pexels-photo-6765928.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/7784603/pexels-photo-7784603.jpeg?auto=compress&cs=tinysrgb&w=600'
]

import Box from './utils/Box'
import { useRouter } from 'next/router'

const Header = ({ data }) => {
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const router = useRouter()
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex(prevIndex => (prevIndex + 1) % backgrounds.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [backgroundIndex, backgrounds.length])

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundImage: `url("${backgrounds[backgroundIndex]}")`,
        backgroundSize: 'cover'
      }}
    >
      <div className={styles.surface}></div>
      {router.locale == 'en-US' ? (
        <>
          {' '}
          <h1 className={styles.heading1}>
            find a <span>religious partner</span> of your choice
          </h1>
          <p>
            we made it easy for you to get your <span>life partner</span> in{' '}
            <span>your location </span>
          </p>
        </>
      ) : (
        <>
          <h1 className={styles.heading1}>
            আপনার পছন্দের একজন <span>ধার্মিক জীবনসঙ্গী </span>খুঁজুন
          </h1>
          <p>
            we made it easy for you to get your <span>life partner</span> in{' '}
            <span>your location </span>
          </p>
        </>
      )}
      <Box data={data} />
    </div>
  )
}

export default Header
