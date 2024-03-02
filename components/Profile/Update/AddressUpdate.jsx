import React, { useEffect, useState } from 'react'
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

import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { useRouter } from 'next/router'
import Moment from 'react-moment/dist'
import { getText } from '@/Translation/profile'
import Ln from '@/components/utils/Ln'

const Basic = ({ locationData, address: data, ln }) => {
  const [districts, setDistricts] = useState([])
  const [address, setAddress] = useState({ ...data })
  const [error, setError] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.userInfo)
  const fetchDistrict = async city => {
    try {
      const { data } = await axios.get(
        `https://bdapis.com/api/v1.1/division/${city}`
      )
      setDistricts(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDistrict(address.city || locationData[0].division)
  }, [address.city])

  const update = async () => {
    if (
      !address.city ||
      !address.district ||
      !address.upazilla ||
      !address.location
    ) {
      setError('Fill All The Required Field !')
      return
    }
    try {
      setError('')
      dispatch(startLoading())
      const { data } = await axios.put(
        `/api/address/${router.query.id}`,
        {
          ...address
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )

      if (data) {
        setAddress({ ...data })
        dispatch(finishLoading())
      }
    } catch (error) {
      dispatch(finishLoading())
      setError('Something Went Wrong !')
      console.log(error)
    }
  }

  return (
    <div
      Id={'addresss'}
      className={styles.wrapper}
      style={{ backgroundColor: 'aliceblue' }}
    >
      <div className={styles.heading}>
        <div className={styles.left}>
          <span>6</span>
          <div className={styles.title}>{getText('address', ln)}</div>
        </div>
        {address.updatedAt && (
          <div className={styles.right}>
            Updated <Moment fromNow>{address.updatedAt}</Moment>
          </div>
        )}
      </div>
      <form className={styles.form__Container}>
        <div className={styles.field}>
          <label>{getText('city', ln)}</label>
          <select
            className={styles.value}
            onChange={e => setAddress({ ...address, city: e.target.value })}
          >
            {[
              {
                division: 'Not Selected'
              },
              ...locationData
            ].map((item, index) => (
              <option
                key={index}
                selected={address?.city == item.division ? true : false}
              >
                <Ln item={item.division} />{' '}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>{getText('district', ln)}</label>
          <select
            className={styles.value}
            onChange={e => setAddress({ ...address, district: e.target.value })}
          >
            {[{ district: 'Not Selectd' }, ...districts].map((item, index) => (
              <option
                key={index}
                value={item.district}
                selected={item.district == address.district ? true : false}
              >
                <Ln item={item.district} />{' '}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>{getText('upazilla', ln)} </label>
          <select
            className={styles.value}
            onChange={e =>
              setAddress({
                ...address,
                upazilla: e.target.value
              })
            }
          >
            <option>{<Ln item={'Not Selected'} />}</option>
            {districts
              .find(i => i.district == address.district)
              ?.upazilla.map((item, index) => (
                <option
                  key={index}
                  value={item}
                  selected={item == address.upazilla ? true : false}
                >
                  <Ln item={item} />{' '}
                </option>
              ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>{getText('location', ln)}</label>
          <input
            type='text'
            value={address.location}
            onChange={e => setAddress({ ...address, location: e.target.value })}
          />
        </div>
      </form>{' '}
      {error && <p style={{ fontSize: '80%', color: 'red' }}>{error}</p>}
      <div className={styles.save} onClick={() => update()}>
        {getText('save', ln)}
      </div>
    </div>
  )
}

export default Basic
