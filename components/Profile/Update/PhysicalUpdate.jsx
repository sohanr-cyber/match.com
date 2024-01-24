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
const Basic = ({ physical: data }) => {
  const [physical, setPhysical] = useState({
    ...data,
    heightFeet: parseInt(data.height / 12),
    heightInches: data.height % 12
  })
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)

  const update = async () => {
    try {
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
      setPhysical(data)
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
        <span className={styles.number}>4</span>
        <div className={styles.title}>Physical Attributes</div>
      </div>
      <form className={styles.form__Container}>
        <div className={styles.field}>
          <label>Height</label>
          <div className={styles.flex}>
            <input
              type='number'
              value={physical.heightFeet}
              onChange={e =>
                setPhysical({ ...physical, heightFeet: e.target.value })
              }
            />
            <span> feet</span>
            <input
              type='number'
              value={physical.heightInches}
              onChange={e =>
                setPhysical({ ...physical, heightInches: e.target.value })
              }
            />
            <span>inches</span>
          </div>
        </div>
        <div className={styles.field}>
          <label>Weight(kg)</label>
          <input
            type='Number'
            placeholder='50kg'
            value={physical.mass}
            onChange={e => setPhysical({ ...physical, mass: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label>Skin Color</label>
          <select
            onChange={e =>
              setPhysical({ ...physical, skinColor: e.target.value })
            }
          >
            {skinColors.map((item, index) => (
              <option
                value={item}
                key={index}
                selected={item == physical.skinColor ? true : false}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>Body Type</label>
          <select
            onChange={e =>
              setPhysical({ ...physical, bodyType: e.target.value })
            }
          >
            {bodyTypes.map((item, index) => (
              <option
                value={item}
                key={index}
                selected={item == physical.bodyType ? true : false}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>Blood Group</label>
          <select
            onChange={e => setPhysical({ ...physical, blood: e.target.value })}
          >
            {['O+', 'A+', 'B+', 'AB+', 'A-', 'B-', 'O-'].map((item, index) => (
              <option
                value={item}
                key={index}
                selected={item == physical.bodyType ? true : false}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>Any Physical Issue ? </label>
          <input
            type='text'
            placeholder=''
            value={physical.issue}
            onChange={e => setPhysical({ ...physical, issue: e.target.value })}
          />
        </div>
      </form>
      <div className={styles.save} onClick={() => update()}>
        Save
      </div>
    </div>
  )
}

export default Basic
