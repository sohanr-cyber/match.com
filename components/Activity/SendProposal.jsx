import React, { useEffect, useState } from 'react'
import styles from '../../styles/Profile/SendProposal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { getText } from '@/Translation/profile'
import { showSnackBar } from '@/redux/notistackSlice'

const SendProposal = ({ setOpenForm, user }) => {
  const router = useRouter()
  const ln = router.locale
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const [userInput, setUserInput] = useState({
    sender: userInfo?.id,
    reciever: user._id,
    message: ''
  })

  useEffect(() => {
    if (!userInfo) {
      dispatch(
        showSnackBar({
          message: 'You Need To Login First To Send Proposal',
          option: {
            variant: 'info'
          }
        })
      )
      setOpenForm(false)
      router.push('/login')
    }
  })

  const send = async () => {
    let proposalSent = false
    try {
      dispatch(startLoading())
      const { data } = await axios.post(
        '/api/proposal',
        {
          ...userInput
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )
      if (data?.error) {
        dispatch(showSnackBar({ message: data.error, option: { variant: 'error' } }))
      } else if (data?._id) {
        proposalSent = true
        setOpenForm(false)
        dispatch(showSnackBar({ message: `Proposal sent to profile ID ${user.profileId}.` }))
        const localePrefix = router.locale && router.locale !== router.defaultLocale ? `/${router.locale}` : ''
        const destination = `${localePrefix}/proposal/${encodeURIComponent(String(data._id))}/`
        dispatch(finishLoading())
        window.location.assign(destination)
        return
      } else {
        throw new Error('The proposal was created without a details ID.')
      }
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.error('Could not send proposal or open its details:', error)
      dispatch(showSnackBar({ message: proposalSent ? `Proposal to profile ID ${user.profileId} was sent, but its details page could not be opened. Find it in your proposals.` : (error.response?.data?.error || 'Could not send proposal.'), option: { variant: 'error' } }))
    }
  }
  return (
    <div className={styles.wrapper} role='presentation' onMouseDown={event => { if (event.target === event.currentTarget) setOpenForm(false) }}>
      <form className={styles.form} role='dialog' aria-modal='true' aria-labelledby='send-proposal-title' onSubmit={event => { event.preventDefault(); send() }}>
        <div className={styles.header}>
          <span className={styles.headerIcon} aria-hidden='true'>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M21 3 9.8 14.2' /><path d='m21 3-7.2 18-4-8-8-4Z' />
            </svg>
          </span>
          <div className={styles.headerCopy}>
            <span className={styles.eyebrow}>{ln === 'bn' ? 'একটি সুন্দর শুরু' : 'A THOUGHTFUL FIRST STEP'}</span>
            <h2 id='send-proposal-title'>{getText('sendProposal', ln)}</h2>
          </div>
          <button type='button' className={styles.close} onClick={() => setOpenForm(false)} aria-label={getText('cancel', ln)}>×</button>
        </div>
        <p className={styles.intro}>{ln === 'bn' ? 'সম্মানের সঙ্গে পরিচিত হওয়ার জন্য একটি বার্তা পাঠান।' : 'Send a kind note to begin a respectful conversation.'}</p>
        <div className={styles.participants}>
          <label className={styles.field}>
            <span>{getText('sender', ln)}</span>
            <input type='text' value={userInfo?.profileId || userInfo?.id || ''} readOnly />
          </label>
          <label className={styles.field}>
            <span>{getText('reciever', ln)}</span>
            <input type='text' value={user.profileId || user._id || ''} readOnly />
          </label>
        </div>
        <label className={styles.field}>
          <span>{getText('message', ln)}</span>
          <textarea
            value={userInput.message}
            onChange={e => setUserInput({ ...userInput, message: e.target.value })}
            placeholder={ln === 'bn' ? 'একটি আন্তরিক বার্তা লিখুন…' : 'Write a warm introduction…'}
          />
        </label>
        <div className={styles.actions}>
          <button type='button' className={styles.cancel} onClick={() => setOpenForm(false)}>{getText('cancel', ln)}</button>
          <button type='submit' className={styles.send}>
            <span>{getText('send', ln)}</span><span aria-hidden='true'>↗</span>
          </button>
        </div>
      </form>
    </div>
  )}

export default SendProposal
