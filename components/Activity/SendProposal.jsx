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
      if (data) {
        setOpenForm(false)
        console.log({ data })
        dispatch(
          showSnackBar({
            message: 'Proposal Sent'
          })
        )
        router.reload()
      }
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <label>{getText('sender', ln)}</label>
        <input type='text' value={userInfo?.profileId || userInfo?.id} />
        <label>{getText('reciever', ln)}</label>
        <input type='text' value={user.profileId || user._id} />
        <label>{getText('message', ln)}</label>
        <textarea
          type='text'
          value={userInfo?.message}
          onClick={e => setUserInput({ ...userInput, message: e.target.value })}
        ></textarea>
        <div className={styles.flex}>
          <div className={styles.send} onClick={() => send()}>
            {getText('send', ln)}
          </div>
          <div className={styles.cancel} onClick={() => setOpenForm(false)}>
            {getText('cancel', ln)}
          </div>
        </div>
      </form>
    </div>
  )
}

export default SendProposal
