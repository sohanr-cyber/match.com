import React, { useState } from 'react'
import styles from '../../../styles/Profile/Update/Basic.module.css'
import Icon from '@/components/utils/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import axios from 'axios'
import { Router, useRouter } from 'next/router'
import { login } from '@/redux/userSlice'
import { getText } from '@/Translation/profile'
import { showSnackBar } from '@/redux/notistackSlice'
const Activate = ({ profile }) => {
  const [worthActivating, setActivating] = useState(
    profile.user.gender &&
      profile.user.isVerified &&
      profile.user.maritalStatus &&
      profile.user.city &&
      profile.religion.prayer &&
      profile.expectation.minAge &&
      profile.education.educationType &&
      profile.physical.skinColor &&
      profile.personal.gender &&
      profile.family.father
      ? true
      : false
  )

  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const ln = router.locale
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const update = async () => {
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        '/api/auth/register',
        {
          ...profile.user,
          active: profile.user.active == true ? false : true
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )

      dispatch(
        showSnackBar({
          message: `Now Your Prfile Is ${data.active ? 'Active' : 'De-Active'}`
        })
      )
      dispatch(
        login({
          ...userInfo,
          active: profile.user.active == true ? false : true
        })
      )
      router.reload()

      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
      dispatch(
        showSnackBar({
          message: 'Something Went Wrong !',
          option: {
            variant: 'error'
          }
        })
      )
    }
  }
  return (
    <div className={styles.wrapper}>
      {!worthActivating ? (
        <div
          style={{
            color: 'red',
            marginBottom: '10px'
          }}
        >
          {getText('ActivateError', ln)}
        </div>
      ) : profile.user.active ? (
        <div
          style={{
            color: 'green',
            marginBottom: '10px'
          }}
        >
          {getText('deactivateText', ln)}
        </div>
      ) : (
        <div
          style={{
            color: 'green',
            marginBottom: '10px'
          }}
        >
          {getText('activateText', ln)}
        </div>
      )}

      {profile.user && (
        <Icon
          allowed={worthActivating}
          image={
            profile.user.active == true
              ? 'https://cdn-icons-png.flaticon.com/128/10134/10134253.png'
              : 'https://cdn-icons-png.flaticon.com/128/4943/4943215.png'
          }
          handleClick={update}
          title={
            profile.user.active
              ? getText('deactivate', ln)
              : getText('activate', ln)
          }
        />
      )}
    </div>
  )
}

export default Activate
