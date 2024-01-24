import React, { useState } from 'react'
import styles from '@/styles/Profile/Update/Basic.module.css'
import {
  professions,
  skinColors,
  bodyTypes,
  educationTypes,
  educationalStatus,
  institutes,
  sessions,
  maritalStatuses
} from '@/pages/api/auth/data'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'

const Basic = ({ personal: data }) => {
  const [personal, setPersonal] = useState({ ...data })
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  console.log({personal})

  const update = async () => {
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        `/api/personal/${router.query.id}`,
        {
          ...personal
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )
      console.log(data)
      setPersonal(data)
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }

  return (
    <div
      className={styles.wrapper}
      style={{ backgroundColor: 'aliceblue', paddingTop: '25px' }}
    >
      <div className={styles.heading}>
        <span className={styles.number}>2</span>
        <div className={styles.title}>Personal Information</div>
      </div>
      <form className={styles.formContainer}>
        <div className={styles.field}>
          <label>First Name</label>
          <input
            type='text'
            onChange={e =>
              setPersonal({ ...personal, firstName: e.target.value })
            }
            value={personal.firstName}
          />
        </div>
        <div className={styles.field}>
          <label>Last Name</label>
          <input
            type='text'
            onChange={e =>
              setPersonal({ ...personal, lastName: e.target.value })
            }
            value={personal.lastName}
          />
        </div>
        <div className={styles.field}>
          <label>Date Of Birth</label>
          <input
            type='date'
            value={
              personal.bornAt &&
              new Date(personal.bornAt).toISOString().split('T')[0]
            }
            onChange={e => setPersonal({ ...personal, bornAt: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label>Gender</label>
          <select
            onChange={e => setPersonal({ ...personal, gender: e.target.value })}
          >
            {['Male', 'Female'].map((item, index) => (
              <option
                value={item}
                key={index}
                selected={item == personal.gender ? true : false}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>Marital Status</label>
          <select
            onChange={e =>
              setPersonal({ ...personal, maritalStatus: e.target.value })
            }
          >
            {maritalStatuses.map((item, index) => (
              <option
                value={item}
                key={index}
                selected={item == personal.maritalStatus ? true : false}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className={styles.save} onClick={() => update()}>
        Save
      </div>
    </div>
  )
}

export default Basic
