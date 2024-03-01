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

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const ln = router.locale

  const Login = async () => {
    if (!email || !password) {
      setError('Fill All The Field Correctly ')
      return
    }
    dispatch(startLoading())
    try {
      const { data } = await axios.post('/api/auth/login', {
        email,
        password
      })

      if (data.error) {
        setError(data.error)
      }
      if (!data.error) {
        console.log(data)
        router.push(`/profile/${data.id}`)
        dispatch(login(data))
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
            {error && (
              <div style={{ color: 'red', fontSize: '90%' }}>{error}</div>
            )}
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
