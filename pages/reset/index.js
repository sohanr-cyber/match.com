import React, { useState } from 'react'
import styles from '../../styles/Signin.module.css'
import Logo from '@/components/utils/Logo'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/redux/userSlice'
import axios from 'axios'
import * as EmailValidator from 'email-validator'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { getText } from '@/Translation/account'
import Ln from '@/components/utils/Ln'
import { NextSeo } from 'next-seo'
import { getText as seoText } from '@/Translation/seo'

const Verify = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const ln = router.locale

  const verifyCode = async () => {
    if (!email) {
      setError('Please Type The Code !')
      return
    }

    dispatch(startLoading())
    try {
      setError('')
      const { data } = await axios.post('/api/auth/existance', {
        email
      })

      if (data.error) {
        setError(data.error)
      }

      if (data && !data.error) {
        console.log(data)
        router.push('/reset/verify')
      }
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      setError('Something Went Wrong !')
      console.log(error)
    }
  }

  return (
    <>
      <NextSeo
        title={seoText('registerTitle', ln)}
        description={seoText('registerDesc', ln)}
      />
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.form__container}>
          <div className={styles.flex}>
            <div className={styles.left} onClick={() => router.push('/login')}>
              {getText('login', ln)}{' '}
            </div>{' '}
            <div
              className={styles.right}
              style={{ borderBottom: '2px solid blue' }}
              onClick={() => router.push('/register')}
            >
              {getText('reset', ln)}{' '}
            </div>
          </div>
          <form>
            <input
              type='text'
              placeholder={getText('rEmail', ln)}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            {error && (
              <div style={{ color: 'red', fontSize: '90%' }}>{error}</div>
            )}
          </form>
          <div className={styles.btn} onClick={() => verifyCode()}>
            {getText('verify', ln)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Verify
