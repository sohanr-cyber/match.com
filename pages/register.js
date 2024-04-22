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
import { getText } from '@/Translation/account'
import Ln from '@/components/utils/Ln'
import { NextSeo } from 'next-seo'
import { getText as seoText } from '@/Translation/seo'
import { showSnackBar } from '@/redux/notistackSlice'

const Login = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const ln = router.locale

  const register = async () => {
    if (!EmailValidator.validate(email) || !password || !name || !gender) {
      dispatch(
        showSnackBar({
          message: 'Fill All The  Field !',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }
    dispatch(startLoading())
    try {
      const { data } = await axios.post('/api/auth/register', {
        name,
        email,
        password,
        gender
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
            message: 'Registered ! Verification Code Sent To Your Mail'
          })
        )
        dispatch(login(data))
        router.push('/verify')
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
      {' '}
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
              {getText('signup', ln)}{' '}
            </div>
          </div>
          <form>
            <input
              type='text'
              placeholder={getText('name', ln)}
              value={name}
              onChange={e => setName(e.target.value)}
            />
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

            <label style={{ color: 'grey' }}>{getText('choseG', ln)}</label>
            <div className={styles.options}>
              {['Male', 'Female'].map((item, index) => (
                <span
                  style={
                    gender == item ? { background: 'blue', color: 'white' } : {}
                  }
                  onClick={() => setGender(item)}
                  key={index}
                >
                  <Ln item={item} />
                </span>
              ))}
            </div>

            {error && (
              <div style={{ color: 'red', fontSize: '90%' }}>{error}</div>
            )}
          </form>
          <div className={styles.btn} onClick={() => register()}>
            {getText('signup', ln)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
