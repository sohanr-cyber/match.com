import React, { useState } from 'react'
import styles from '../styles/Signin.module.css'
import Logo from '@/components/utils/Logo'
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/userSlice'
import axios from 'axios'
const Login = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const register = async () => {
    if (!email || !password || !name) {
      return
    }
    try {
      const { data } = await axios.post('/api/auth/register', {
        name,
        email,
        password
      })

      if (data) {
        console.log(data)
        router.push(`/profile/${data.id}`)
        dispatch(login(data))
      }
    } catch (error) {
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
          </form>
          <div className={styles.btn} onClick={() => register()}>
            Signup
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
