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

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const Login = async () => {
    if (!email || !password) {
      return
    }
    dispatch(startLoading())
    try {
      const { data } = await axios.post('/api/auth/login', {
        email,
        password
      })

      if (data) {
        console.log(data)
        router.push(`/profile/${data.id}`)
        dispatch(login(data))
      }
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())

      console.log(error)
    }
  }
  return (
    <>
      <Navbar />
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
              Login
            </div>{' '}
            <div
              className={styles.right}
              onClick={() => router.push('/register')}
            >
              Signup
            </div>
          </div>
          <form>
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
          </form>
          <div className={styles.btn} onClick={() => Login()}>
            Login
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
