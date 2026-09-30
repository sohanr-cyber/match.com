import React, { useState } from 'react'
import styles from '../styles/Signin.module.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/redux/userSlice'
import axios from 'axios'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { NextSeo } from 'next-seo'
import { getText as seoText } from '@/Translation/seo'
import { showSnackBar } from '@/redux/notistackSlice'
import AuthFrame from '@/components/AuthFrame'

const Verify = () => {
  const router = useRouter()
  const [code, setCode] = useState('')
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const ln = router.locale
  const bn = ln === 'bn'

  const verifyCode = async event => {
    event.preventDefault()
    if (!userInfo?.id || !/^\d{6}$/.test(code)) {
      dispatch(showSnackBar({ message: 'Enter the six-digit code sent to your phone.', option: { variant: 'error' } }))
      return
    }
    dispatch(startLoading())
    try {
      const { data } = await axios.post('/api/auth/verify', { code, userId: userInfo.id })
      if (data.error) {
        dispatch(showSnackBar({ message: data.error, option: { variant: 'error' } }))
      } else {
        dispatch(login(data))
        dispatch(showSnackBar({ message: 'Phone number verified.', option: { variant: 'success' } }))
        router.push('/profile/' + data.profileId)
      }
    } catch (error) {
      dispatch(showSnackBar({ message: 'Could not verify the code.', option: { variant: 'error' } }))
    } finally {
      dispatch(finishLoading())
    }
  }

  const resendCode = async () => {
    if (!userInfo?.phone) {
      dispatch(showSnackBar({ message: 'Please sign in again to resend the code.', option: { variant: 'error' } }))
      return
    }
    dispatch(startLoading())
    try {
      const { data } = await axios.put('/api/auth/verify', { phone: userInfo.phone })
      dispatch(showSnackBar({ message: data.error || data.message, option: { variant: data.error ? 'error' : 'success' } }))
    } catch (error) {
      dispatch(showSnackBar({ message: 'Could not send SMS. Please try again.', option: { variant: 'error' } }))
    } finally {
      dispatch(finishLoading())
    }
  }

  return (
    <>
      <NextSeo title={seoText('registerTitle', ln)} description={seoText('registerDesc', ln)} />
      <AuthFrame mode='register' locale={ln}>
        <div className={styles.heading}>
          <span className={styles.kicker}>{bn ? 'আর একটি ধাপ' : 'ONE MORE STEP'}</span>
          <h2 id='auth-title'>{bn ? 'ফোন নম্বর যাচাই করুন' : 'Verify your phone'}</h2>
          <p>{bn ? 'আপনার ফোনে পাঠানো ৬ সংখ্যার কোডটি লিখুন।' : 'Enter the six-digit code sent by SMS to your phone.'}</p>
        </div>
        <form className={styles.form} onSubmit={verifyCode}>
          <div className={styles.field}>
            <label htmlFor='verification-code'>{bn ? 'যাচাইকরণ কোড' : 'Verification code'}</label>
            <input id='verification-code' type='text' inputMode='numeric' autoComplete='one-time-code' maxLength={6} placeholder='000000' value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ''))} required />
          </div>
          <button className={styles.submit} type='submit'>{bn ? 'যাচাই করুন' : 'Verify phone'} <span aria-hidden='true'>→</span></button>
        </form>
        <p className={styles.switchPrompt}>{bn ? 'কোড পাননি?' : "Didn't get the code?"} <button type='button' className={styles.inlineButton} onClick={resendCode}>{bn ? 'আবার পাঠান' : 'Resend code'}</button></p>
      </AuthFrame>
    </>
  )
}

export default Verify
