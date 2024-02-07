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
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Moment from 'react-moment/dist'

const Religion = ({ family: data }) => {
  const [family, setFamily] = useState({
    ...data
  })
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [error, setError] = useState('')

  const update = async () => {
    if (
      !family.father ||
      !family.mother ||
      !family.brother ||
      !family.sister ||
      !family.rStatus ||
      !family.eStatus ||
      !family.agreement
    ) {
      setError('Fill All The Field')
      return
    }
    try {
      setError('')
      dispatch(startLoading())
      const { data } = await axios.put(
        `/api/family/${router.query.id}`,
        {
          ...family
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )

      setFamily(data)
      dispatch(finishLoading())
    } catch (error) {
      setError('Something Went Wrong !')
      dispatch(finishLoading())
      console.log(error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.left}>
          <span>7</span>
          <div className={styles.title}>Family Information</div>
        </div>
        {family.updatedAt && (
          <div className={styles.right}>
            Updated <Moment fromNow>{family.updatedAt}</Moment>
          </div>
        )}
      </div>
      <form className={styles.formContainer}>
        <div className={styles.field}>
          <label>Father Information</label>
          <textarea
            value={family.father}
            onChange={e => setFamily({ ...family, father: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>Mother Information</label>
          <textarea
            value={family.mother}
            onChange={e => setFamily({ ...family, mother: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>Brother Information</label>
          <textarea
            value={family.brother}
            onChange={e => setFamily({ ...family, brother: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>Sister Information</label>
          <textarea
            value={family.sister}
            onChange={e => setFamily({ ...family, sister: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>How much religion they practice ? </label>
          <textarea
            value={family.rStatus}
            onChange={e => setFamily({ ...family, rStatus: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>Family Status </label>
          <div className={styles.options}>
            {[
              'Lower Class',
              'Lower Middle Class',
              'Middle Class',
              'Higher Class'
            ].map((item, index) => (
              <span
                style={
                  family.eStatus == item
                    ? { background: 'blue', color: 'white' }
                    : {}
                }
                onClick={() => setFamily({ ...family, eStatus: item })}
                key={index}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.field}>
          <label>Do They Agree To you Marriage ? </label>
          <textarea
            value={family.agreement}
            onChange={e => setFamily({ ...family, agreement: e.target.value })}
          ></textarea>
        </div>
      </form>{' '}
      {error && <p style={{ color: 'red', fontSize: '90%' }}>{error}</p>}
      <div className={styles.save} onClick={() => update()}>
        Save
      </div>
    </div>
  )
}

export default Religion
