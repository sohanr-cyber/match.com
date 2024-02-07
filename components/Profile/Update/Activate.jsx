import React, { useState } from 'react'
import styles from '../../../styles/Profile/Update/Basic.module.css'
import Icon from '@/components/utils/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import axios from 'axios'
import { Router, useRouter } from 'next/router'
const Activate = ({ profile }) => {
  const [worthActivating, setActivating] = useState(
    profile.user.gender &&
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

  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const update = async () => {
    try {
      setError('')
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

      router.reload()

      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
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
          Your Profile is Not Completed To Activate. Complete Your Profile
          Firstly .
        </div>
      ) : profile.user.active ? (
        <div
          style={{
            color: 'green',
            marginBottom: '10px'
          }}
        >
          You Can Also Deactivate Your Profile 
        </div>
      ) : (
        <div
          style={{
            color: 'green',
            marginBottom: '10px'
          }}
        >
          Your Profile Is Ready To Activate.
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
          title={profile.user.active ? 'Deactivate' : 'Activate'}
        />
      )}
    </div>
  )
}

export default Activate
