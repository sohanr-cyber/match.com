import React, { useEffect, useState } from 'react'
import styles from '../../../styles/Profile/Update/Basic.module.css'
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
import InfoIcon from '@mui/icons-material/Info'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { useRouter } from 'next/router'
import Moment from 'react-moment/dist'
import { getText } from '@/Translation/profile'
import Ln from '@/components/utils/Ln'
import { showSnackBar } from '@/redux/notistackSlice'
import { isAddressValid } from '@/utility/validator'
import { routes } from '@/utility/data'

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
    if (!isAddressValid(address)) {
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
        dispatch(
          showSnackBar({
            message: 'Updated Succesfully ',
            option: {
              variant: 'success'
            }
          })
        )
        setAddress({ ...data })
        dispatch(finishLoading())
        const index = routes.findIndex(i => i.query == router.query.update)
        index + 1 >= routes.length
          ? router.push(`/profile//${router.query.id}`)
          : router.push(
              `/profile/update/${router.query.id}?update=${
                routes[index + 1]?.query
              }`
            )
      }
    } catch (error) {
      dispatch(
        showSnackBar({
          message: 'Something Went Wrong !',
          option: {
            variant: 'error'
          }
        })
      )
      dispatch(finishLoading())
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
      <div className={styles.container}>
        <p>
          <InfoIcon /> <span>{getText('hiddentContact', ln)}</span>
        </p>{' '}
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
                value={item.division}
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
            {[{ district: 'Not Selected' }, ...districts].map((item, index) => (
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
        <div className={styles.field}>
          <label>{getText('email', ln)}</label>
          <input
            type='text'
            value={address.email}
            onChange={e => setAddress({ ...address, email: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label>{getText('phone', ln)}</label>
          <input
            type='text'
            value={address.phone}
            onChange={e => setAddress({ ...address, phone: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label>{getText('phone2', ln)}</label>
          <input
            type='text'
            value={address.phone2}
            onChange={e => setAddress({ ...address, phone2: e.target.value })}
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
