import React, { useState } from 'react'
import styles from '../styles/Signin.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/userSlice'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { getText } from '@/Translation/account'
import { NextSeo } from 'next-seo'
import { getText as seoText } from '@/Translation/seo'
import { showSnackBar } from '@/redux/notistackSlice'
import Link from 'next/link'
import AuthFrame from '@/components/AuthFrame'
import { normalizePhone } from '@/utility/phone'

const Login = () => {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [legacyEmail, setLegacyEmail] = useState(false)
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const ln = router.locale
  const bn = ln === 'bn'

  const handleLogin = async event => {
    event.preventDefault()
    if (!(legacyEmail ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : normalizePhone(phone)) || !password) {
      dispatch(showSnackBar({ message: 'Fill All The Field', option: { variant: 'error' } }))
      return
    }
    dispatch(startLoading())
    try {
      const { data } = await axios.post('/api/auth/login', legacyEmail ? { email, password } : { phone, password })
      if (data.error) {
        dispatch(showSnackBar({ message: data.error, option: { variant: 'error' } }))
      } else {
        dispatch(showSnackBar({ message: 'Logged In Successfully', option: { variant: 'success' } }))
        dispatch(login(data))
        router.push(data.isVerified || data.legacyEmail ? '/profile/' + data.profileId : '/verify')
      }
    } catch (error) {
      dispatch(showSnackBar({ message: 'Something Went Wrong!', option: { variant: 'error' } }))
      console.error(error)
    } finally {
      dispatch(finishLoading())
    }
  }

  return (
    <>
      <NextSeo title={seoText('loginTitle', ln)} description={seoText('loginDesc', ln)} />
      <AuthFrame mode='login' locale={ln}>
        <div className={styles.heading}>
          <span className={styles.kicker}>{bn ? 'আবার স্বাগতম' : 'WELCOME BACK'}</span>
          <h2 id='auth-title'>{bn ? 'আপনার অ্যাকাউন্টে লগইন করুন' : 'Welcome back'}</h2>
          <p>{bn ? 'আপনার যাত্রা যেখানে থেমেছিল, সেখান থেকেই শুরু করুন।' : 'Pick up where your journey left off.'}</p>
        </div>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.field}>
            {legacyEmail ? (
              <>
                <label htmlFor='login-email'>{bn ? 'আগের ইমেইল ঠিকানা' : 'Existing account email'}</label>
                <input id='login-email' type='email' autoComplete='email' placeholder={getText('email', ln)} value={email} onChange={e => setEmail(e.target.value)} required />
              </>
            ) : (
              <>
                <label htmlFor='login-phone'>{bn ? 'ফোন নম্বর' : 'Phone number'}</label>
                <input id='login-phone' type='tel' inputMode='tel' autoComplete='tel' placeholder='01XXXXXXXXX' value={phone} onChange={e => setPhone(e.target.value)} required />
              </>
            )}
          </div>
          <div className={styles.field}>
            <div className={styles.fieldTop}><label htmlFor='login-password'>{bn ? 'পাসওয়ার্ড' : 'Password'}</label><Link href={legacyEmail ? '/reset?legacy=1' : '/reset'} className={styles.textLink}>{getText('resetP', ln)}</Link></div>
            <input id='login-password' type='password' autoComplete='current-password' placeholder={getText('password', ln)} value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className={styles.submit} type='submit'>{getText('login', ln)} <span aria-hidden='true'>→</span></button>
        </form>
        <p className={styles.legacySwitch}><button type='button' className={styles.inlineButton} onClick={() => setLegacyEmail(!legacyEmail)}>{legacyEmail ? (bn ? 'ফোন নম্বর দিয়ে লগইন করুন' : 'Sign in with phone instead') : (bn ? 'আগের অ্যাকাউন্ট? ইমেইল দিয়ে লগইন করুন' : 'Existing account? Sign in with email')}</button></p>
        <p className={styles.switchPrompt}>{bn ? 'নতুন এখানে?' : 'New here?'} <Link href='/register'>{bn ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create an account'}</Link></p>
      </AuthFrame>
    </>
  )
}

export default Login
