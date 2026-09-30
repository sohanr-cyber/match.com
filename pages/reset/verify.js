import React, { useEffect, useState } from 'react'
import styles from '../../styles/Signin.module.css'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { showSnackBar } from '@/redux/notistackSlice'
import { NextSeo } from 'next-seo'
import { getText as seoText } from '@/Translation/seo'
import { normalizePhone } from '@/utility/phone'
import AuthFrame from '@/components/AuthFrame'

const ResetVerify = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [legacyEmail, setLegacyEmail] = useState(false)
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const bn = router.locale === 'bn'

  useEffect(() => {
    setPhone(sessionStorage.getItem('resetPhone') || '')
    setEmail(sessionStorage.getItem('resetEmail') || '')
  }, [])

  useEffect(() => {
    if (router.isReady) setLegacyEmail(router.query.legacy === '1')
  }, [router.isReady, router.query.legacy])

  const resetPassword = async event => {
    event.preventDefault()
    const normalized = normalizePhone(phone)
    if (!(legacyEmail ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : normalized) || !/^\d{6}$/.test(code) || !newPassword) {
      dispatch(showSnackBar({ message: 'Enter your phone, six-digit code, and new password.', option: { variant: 'error' } }))
      return
    }
    dispatch(startLoading())
    try {
      const { data } = await axios.post('/api/auth/reset', legacyEmail ? { email, code, newPassword } : { phone: normalized, code, newPassword })
      if (data.error) {
        dispatch(showSnackBar({ message: data.error, option: { variant: 'error' } }))
      } else {
        sessionStorage.removeItem('resetPhone')
        sessionStorage.removeItem('resetEmail')
        dispatch(showSnackBar({ message: data.message, option: { variant: 'success' } }))
        router.push('/login')
      }
    } catch (error) {
      dispatch(showSnackBar({ message: 'Could not reset password.', option: { variant: 'error' } }))
    } finally {
      dispatch(finishLoading())
    }
  }

  return (
    <>
      <NextSeo title={seoText('loginTitle', router.locale)} />
      <AuthFrame mode='login' locale={router.locale}>
        <div className={styles.heading}>
          <span className={styles.kicker}>{bn ? 'অ্যাকাউন্ট পুনরুদ্ধার' : 'ACCOUNT RECOVERY'}</span>
          <h2 id='auth-title'>{bn ? 'নতুন পাসওয়ার্ড দিন' : 'Choose a new password'}</h2>
          <p>{bn ? 'এসএমএস কোড এবং নতুন পাসওয়ার্ড লিখুন।' : 'Enter the SMS code and a new password.'}</p>
        </div>
        <form className={styles.form} onSubmit={resetPassword}>
          <div className={styles.field}>
            {legacyEmail ? (
              <>
                <label htmlFor='reset-verify-email'>{bn ? 'আগের ইমেইল ঠিকানা' : 'Existing account email'}</label>
                <input id='reset-verify-email' type='email' autoComplete='email' value={email} onChange={e => setEmail(e.target.value)} required />
              </>
            ) : (
              <>
                <label htmlFor='reset-verify-phone'>{bn ? 'ফোন নম্বর' : 'Phone number'}</label>
                <input id='reset-verify-phone' type='tel' inputMode='tel' autoComplete='tel' placeholder='01XXXXXXXXX' value={phone} onChange={e => setPhone(e.target.value)} required />
              </>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor='reset-code'>{bn ? 'যাচাইকরণ কোড' : 'Verification code'}</label>
            <input id='reset-code' type='text' inputMode='numeric' autoComplete='one-time-code' maxLength={6} placeholder='000000' value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ''))} required />
          </div>
          <div className={styles.field}>
            <label htmlFor='reset-password'>{bn ? 'নতুন পাসওয়ার্ড' : 'New password'}</label>
            <input id='reset-password' type='password' autoComplete='new-password' value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
          </div>
          <button className={styles.submit} type='submit'>{bn ? 'পাসওয়ার্ড পরিবর্তন করুন' : 'Reset password'} <span aria-hidden='true'>→</span></button>
        </form>
        <p className={styles.legacySwitch}><button type='button' className={styles.inlineButton} onClick={() => setLegacyEmail(!legacyEmail)}>{legacyEmail ? (bn ? 'ফোন নম্বর ব্যবহার করুন' : 'Use phone instead') : (bn ? 'আগের অ্যাকাউন্ট? ইমেইল ব্যবহার করুন' : 'Existing account? Use email')}</button></p>
      </AuthFrame>
    </>
  )
}

export default ResetVerify
