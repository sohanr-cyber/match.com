import React, { useState } from 'react'
import styles from '../styles/Signin.module.css'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/userSlice'
import axios from 'axios'
import { normalizePhone } from '@/utility/phone'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { getText } from '@/Translation/account'
import Ln from '@/components/utils/Ln'
import { NextSeo } from 'next-seo'
import { getText as seoText } from '@/Translation/seo'
import { showSnackBar } from '@/redux/notistackSlice'
import Link from 'next/link'
import AuthFrame from '@/components/AuthFrame'

const Register = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const dispatch = useDispatch()
  const ln = router.locale
  const bn = ln === 'bn'

  const register = async event => {
    event.preventDefault()
    if (!normalizePhone(phone) || !password || !name || !gender) {
      dispatch(showSnackBar({ message: 'Fill All The Field!', option: { variant: 'error' } }))
      return
    }
    dispatch(startLoading())
    try {
      const { data } = await axios.post('/api/auth/register', { name, phone, password, gender })
      if (data.error) {
        dispatch(showSnackBar({ message: data.error, option: { variant: 'error' } }))
      } else {
        dispatch(showSnackBar({ message: data.smsSent ? 'Verification code sent to your phone.' : 'Account created, but SMS could not be sent. Please resend the code on the next screen.', option: { variant: data.smsSent ? 'success' : 'warning' } }))
        dispatch(login(data))
        router.push('/verify')
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
      <NextSeo title={seoText('registerTitle', ln)} description={seoText('registerDesc', ln)} />
      <AuthFrame mode='register' locale={ln}>
        <div className={styles.heading}>
          <span className={styles.kicker}>{bn ? 'আজই শুরু করুন' : 'GET STARTED'}</span>
          <h2 id='auth-title'>{bn ? 'আপনার অ্যাকাউন্ট তৈরি করুন' : 'Create your account'}</h2>
          <p>{bn ? 'কয়েকটি তথ্য দিয়ে আপনার যাত্রা শুরু করুন।' : 'A few details are all it takes to begin.'}</p>
        </div>
        <form className={styles.form} onSubmit={register}>
          <div className={styles.field}>
            <label htmlFor='register-name'>{bn ? 'আপনার নাম' : 'Your name'}</label>
            <input id='register-name' type='text' autoComplete='name' placeholder={getText('name', ln)} value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className={styles.field}>
            <label htmlFor='register-phone'>{bn ? 'ফোন নম্বর' : 'Phone number'}</label>
            <input id='register-phone' type='tel' inputMode='tel' autoComplete='tel' placeholder='01XXXXXXXXX' value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
          <div className={styles.field}>
            <label htmlFor='register-password'>{bn ? 'পাসওয়ার্ড' : 'Password'}</label>
            <input id='register-password' type='password' autoComplete='new-password' placeholder={getText('password', ln)} value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <fieldset className={styles.genderField}>
            <legend>{getText('choseG', ln)}</legend>
            <div className={styles.options}>
              {['Male', 'Female'].map(item => (
                <label className={gender === item ? styles.selectedOption : styles.option} key={item}>
                  <input type='radio' name='gender' value={item} checked={gender === item} onChange={() => setGender(item)} required />
                  <Ln item={item} />
                </label>
              ))}
            </div>
          </fieldset>
          <button className={styles.submit} type='submit'>{getText('signup', ln)} <span aria-hidden='true'>→</span></button>
        </form>
        <p className={styles.switchPrompt}>{bn ? 'ইতোমধ্যে অ্যাকাউন্ট আছে?' : 'Already have an account?'} <Link href='/login'>{getText('login', ln)}</Link></p>
      </AuthFrame>
    </>
  )
}

export default Register
