import React, { useState } from 'react'
import styles from '../styles/Signin.module.css'
import Logo from '@/components/utils/Logo'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/userSlice'
import axios from 'axios'
import { red } from '@mui/material/colors'
import * as EmailValidator from 'email-validator'
import { finishLoading, startLoading } from '@/redux/stateSlice'
const Login = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [error, setError] = useState('')

  const register = async () => {
    if (!EmailValidator.validate(email) || !password || !name) {
      setError('Fill All The Field Correctly !')
      return
    }
    dispatch(startLoading())
    try {
      const { data } = await axios.post('/api/auth/register', {
        name,
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
            <div className={styles.left} onClick={() => router.push('/login')}>
              Login
            </div>{' '}
            <div
              className={styles.right}
              style={{ borderBottom: '2px solid blue' }}
              onClick={() => router.push('/register')}
            >
              Signup
            </div>
          </div>
          <form>
            <input
              type='text'
              placeholder='Enter Your  Name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type='email'
              placeholder='Enter Your Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Enter Your Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            {error && (
              <div style={{ color: 'red', fontSize: '90%' }}>{error}</div>
            )}
          </form>
          <div className={styles.btn} onClick={() => register()}>
            Signup
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
