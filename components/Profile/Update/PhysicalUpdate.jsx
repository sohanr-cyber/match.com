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
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import axios from 'axios'
import Moment from 'react-moment/dist'
import dict from '@/Translation/dictionary'
import Ln from '../../utils/Ln'
import { getText } from '@/Translation/profile'
import { showSnackBar } from '@/redux/notistackSlice'
import { isPhysicalValid } from '@/utility/validator'
import { routes } from '@/utility/data'

const Basic = ({ physical: data, ln }) => {
  const [physical, setPhysical] = useState({
    ...data,
    heightFeet: parseInt(data.height / 12),
    heightInches: data.height % 12
  })
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [error, setError] = useState('')
  const update = async () => {
    if (
      !physical.heightFeet ||
      !physical.heightInches ||
      !isPhysicalValid(physical)
    ) {
      dispatch(
        showSnackBar({
          message: 'Fill All The  Field !',
          option: {
            variant: 'error'
          }
        })
      )
      return
    }
    try {
      setError('')
      dispatch(startLoading())
      const { data } = await axios.put(
        `/api/physical/${router.query.id}`,
        {
          ...physical,
          height:
            parseInt(parseInt(physical.heightFeet) * 12) +
            parseInt(physical.heightInches)
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )
      console.log(data)
      setPhysical({
        ...data,
        heightFeet: parseInt(data.height / 12),
        heightInches: data.height % 12
      })
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Updated Succesfully ',
          option: {
            variant: 'success'
          }
        })
      )
      const index = routes.findIndex(i => i.query == router.query.update)
      index + 1 >= routes.length
        ? router.push(`/profile//${router.query.id}`)
        : router.push(
            `/profile/update/${router.query.id}?update=${
              routes[index + 1]?.query
            }`
          )
    } catch (error) {
      dispatch(finishLoading())
      dispatch(
        showSnackBar({
          message: 'Something Went Wrong !',
          option: {
            variant: 'error'
          }
        })
      )
      console.log(error)
    }
  }

  return (
    <div className={styles.wrapper} style={{ backgroundColor: 'aliceblue' }}>
      <div className={styles.heading}>
        <div className={styles.left}>
          <span>4</span>
          <div className={styles.title}>{getText('pa', ln)}</div>
        </div>
        {physical.updatedAt && (
          <div className={styles.right}>
            Updated <Moment fromNow>{physical.updatedAt}</Moment>
          </div>
        )}
      </div>
      <form className={styles.form__Container}>
        <div className={styles.field}>
          <label>{getText('height', ln)}</label>
          <div className={styles.flex}>
            <input
              type='number'
              value={physical.heightFeet}
              onChange={e =>
                setPhysical({ ...physical, heightFeet: e.target.value })
              }
            />
            <span> {getText('feet', ln)}</span>
            <input
              type='number'
              value={physical.heightInches}
              onChange={e =>
                setPhysical({ ...physical, heightInches: e.target.value })
              }
            />
            <span>{getText('inches', ln)}</span>
          </div>
        </div>
        <div className={styles.field}>
          <label>{getText('weight', ln)}</label>
          <input
            type='Number'
            // placeholder='50kg'
            value={physical.mass}
            onChange={e => setPhysical({ ...physical, mass: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label>{getText('color', ln)}</label>
          <div className={styles.options}>
            {skinColors.map((item, index) => (
              <span
                onClick={() => setPhysical({ ...physical, skinColor: item })}
                style={
                  item == physical.skinColor
                    ? {
                        background: 'blue',
                        color: 'white'
                      }
                    : {}
                }
                key={index}
              >
                <Ln item={item} />
              </span>
            ))}
          </div>
        </div>

        {/* <div className={styles.field}>
          <label>{getText('bodyType', ln)}</label>
          <div className={styles.options}>
            {bodyTypes.map((item, index) => (
              <span
                onClick={() => setPhysical({ ...physical, bodyType: item })}
                style={
                  item == physical.bodyType
                    ? {
                        background: 'blue',
                        color: 'white'
                      }
                    : {}
                }
                key={index}
              >
                {item}
              </span>
            ))}
          </div>
        </div> */}
        <div className={styles.field}>
          <label>{getText('blood', ln)}</label>
          <div className={styles.options}>
            {['O+', 'A+', 'B+', 'AB+', 'A-', 'B-', 'O-'].map((item, index) => (
              <span
                onClick={() => setPhysical({ ...physical, blood: item })}
                style={
                  item == physical.blood
                    ? {
                        background: 'blue',
                        color: 'white'
                      }
                    : {}
                }
                key={index}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.field}>
          <label>{getText('issue', ln)} </label>
          <input
            type='text'
            placeholder=''
            value={physical.issue}
            onChange={e => setPhysical({ ...physical, issue: e.target.value })}
          />
        </div>
      </form>
      {error && <p style={{ color: 'red', fontSize: '90%' }}>{error}</p>}
      <div className={styles.save} onClick={() => update()}>
        {getText('save', ln)}
      </div>
    </div>
  )
}

export default Basic
