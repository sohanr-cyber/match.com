import React, { useState } from 'react'
import styles from '../../styles/Profile/SendProposal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'
import { finishLoading, startLoading } from '@/redux/stateSlice'

const SendProposal = ({ setOpenForm }) => {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const [userInput, setUserInput] = useState({
    sender: userInfo?.id,
    reciever: router.query.id,
    message: ''
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
            Authorizations: 'Bearer ' + userInfo.token
          }
        }
      )
      if (data) {
        setOpenForm(false)
        console.log({ data })
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
        <label>Sender</label>
        <input type='text' value={userInput.sender} />
        <label>Reciever</label>
        <input type='text' value={userInput.reciever} />
        <label>Personalized Message</label>
        <textarea
          type='text'
          value={userInfo?.message}
          onClick={e => setUserInput({ ...userInput, message: e.target.value })}
        ></textarea>
        <div className={styles.flex}>
          <div className={styles.send} onClick={() => send()}>
            Send
          </div>
          <div className={styles.cancel} onClick={() => setOpenForm(false)}>
            Cancel
          </div>
        </div>
      </form>
    </div>
  )
}

export default SendProposal