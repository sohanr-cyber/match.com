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

const ResetRequest = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [legacyEmail, setLegacyEmail] = useState(false)
  const bn = router.locale === 'bn'

  useEffect(() => {
    if (router.isReady) setLegacyEmail(router.query.legacy === '1')
  }, [router.isReady, router.query.legacy])

  const requestCode = async event => {
    event.preventDefault()
    const normalized = normalizePhone(phone)
    if (!(legacyEmail ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) : normalized)) {
      dispatch(showSnackBar({ message: 'Enter a valid phone number or existing account email.', option: { variant: 'error' } }))
      return
    }
    dispatch(startLoading())
    try {
      const { data } = await axios.post('/api/auth/existance', legacyEmail ? { email } : { phone: normalized })
      if (data.error) {
        dispatch(showSnackBar({ message: data.error, option: { variant: 'error' } }))
      } else {
        if (legacyEmail) {
          sessionStorage.setItem('resetEmail', email)
          sessionStorage.removeItem('resetPhone')
        } else {
          sessionStorage.setItem('resetPhone', normalized)
          sessionStorage.removeItem('resetEmail')
        }
        dispatch(showSnackBar({ message: data.message, option: { variant: 'success' } }))
        router.push(legacyEmail ? '/reset/verify?legacy=1' : '/reset/verify')
      }
    } catch (error) {
      dispatch(showSnackBar({ message: 'Could not send a reset code.', option: { variant: 'error' } }))
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
          <h2 id='auth-title'>{bn ? 'পাসওয়ার্ড পরিবর্তন করুন' : 'Reset your password'}</h2>
          <p>{legacyEmail ? (bn ? 'আপনার আগের অ্যাকাউন্টের ইমেইলে কোড পাঠানো হবে।' : 'We will email a code to your existing account.') : (bn ? 'আপনার ফোনে একটি যাচাইকরণ কোড পাঠানো হবে।' : 'We will text a verification code to your phone.')}</p>
        </div>
        <form className={styles.form} onSubmit={requestCode}>
          <div className={styles.field}>
            {legacyEmail ? (
              <>
                <label htmlFor='reset-email'>{bn ? 'আগের ইমেইল ঠিকানা' : 'Existing account email'}</label>
                <input id='reset-email' type='email' autoComplete='email' value={email} onChange={e => setEmail(e.target.value)} required />
              </>
            ) : (
              <>
                <label htmlFor='reset-phone'>{bn ? 'ফোন নম্বর' : 'Phone number'}</label>
                <input id='reset-phone' type='tel' inputMode='tel' autoComplete='tel' placeholder='01XXXXXXXXX' value={phone} onChange={e => setPhone(e.target.value)} required />
              </>
            )}
          </div>
          <button className={styles.submit} type='submit'>{bn ? 'কোড পাঠান' : 'Send code'} <span aria-hidden='true'>→</span></button>
        </form>
        <p className={styles.legacySwitch}><button type='button' className={styles.inlineButton} onClick={() => setLegacyEmail(!legacyEmail)}>{legacyEmail ? (bn ? 'ফোন নম্বর ব্যবহার করুন' : 'Use phone instead') : (bn ? 'আগের অ্যাকাউন্ট? ইমেইল ব্যবহার করুন' : 'Existing account? Use email')}</button></p>
      </AuthFrame>
    </>
  )
}

export default ResetRequest
