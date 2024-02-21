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
import Moment from 'react-moment/dist'

const Basic = ({ personal: data }) => {
  const [personal, setPersonal] = useState({ ...data })
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  console.log({ personal })
  const [error, setError] = useState('')
  const update = async () => {
    if (
      !personal.bornAt ||
      !personal.firstName ||
      !personal.lastName ||
      !personal.maritalStatus
    ) {
      setError('Fill All The Field !')
      return
    }
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
        <div className={styles.left}>
          <span>2</span>
          <div className={styles.title}>Personal Information</div>
        </div>
        {personal.updatedAt && (
          <div className={styles.right}>
            Updated <Moment fromNow>{personal.updatedAt}</Moment>
          </div>
        )}
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
          <label>Marital Status</label>
          <div className={styles.options}>
            {[...maritalStatuses].map((item, index) => (
              <span
                style={
                  personal.maritalStatus == item
                    ? { background: 'blue', color: 'white' }
                    : {}
                }
                onClick={() =>
                  setPersonal({ ...personal, maritalStatus: item })
                }
                key={index}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </form>
      {error && <p style={{ fontSize: '80%', color: 'red' }}>{error}</p>}
      <div className={styles.save} onClick={() => update()}>
        Save
      </div>
    </div>
  )
}

export default Basic
