import React, { useState } from 'react'
import styles from '../styles/Signin.module.css'
import Logo from '@/components/utils/Logo'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/userSlice'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { getText } from '@/Translation/account'
import { NextSeo } from 'next-seo'
import { getText as seoText } from '@/Translation/seo'
import { showSnackBar } from '@/redux/notistackSlice'
import Link from 'next/link'
const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const ln = router.locale

  const Login = async () => {
    if (!email || !password) {
      dispatch(
        showSnackBar({
          message: 'Fill All The Field ',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }
    dispatch(startLoading())
    try {
      const { data } = await axios.post('/api/auth/login', {
        email,
        password
      })

      if (data.error) {
        dispatch(
          showSnackBar({
            message: data.error,
            option: {
              variant: 'error'
            }
          })
        )
      }
      if (!data.error) {
        console.log(data)
        dispatch(
          showSnackBar({
            message: 'Logged In Succesfully ',
            option: {
              variant: 'success'
            }
          })
        )
        router.push(`/profile/${data.id}`)
        dispatch(login(data))
      }
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Something Went Wrong !',
          option: {
            variant: 'error'
          }
        })
      )
      console.log(error)
    }
  }

  return (
    <>
      <NextSeo
        title={seoText('loginTitle', ln)}
        description={seoText('loginDesc', ln)}
      />
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.form__container}>
          <div className={styles.flex}>
            <div
              className={styles.left}
              style={{ borderBottom: '2px solid blue' }}
            >
              {getText('login', ln)}
            </div>{' '}
            <div
              className={styles.right}
              onClick={() => router.push('/register')}
            >
              {getText('signup', ln)}
            </div>
          </div>
          <form>
            <input
              type='email'
              placeholder={getText('email', ln)}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder={getText('password', ln)}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <p>
              <span> {getText('forgetP', ln)}</span>&nbsp;
              <span style={{ color: 'blue', cursor: 'pointer' }}>
                <Link href='/reset'> {getText('resetP', ln)} </Link>
              </span>
            </p>
          </form>
          <div className={styles.btn} onClick={() => Login()}>
            {getText('login', ln)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
