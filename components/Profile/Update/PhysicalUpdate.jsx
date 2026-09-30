import React, { useRef, useState } from 'react'
import { useProfileSection } from '@/utility/use-profile-section'
import { showMissingRequiredFields } from '@/utility/profile-required-fields'
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

const Basic = ({ physical: data, ln, onChange }) => {
  const [physical, setPhysical] = useProfileSection({
    ...data,
    heightFeet: data.heightFeet ?? (data.height ? Math.floor(data.height / 12) : ''),
    heightInches: data.heightInches ?? (data.height ? data.height % 12 : '')
  }, onChange)
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [error, setError] = useState('')
  const formRef = useRef(null)
  const update = async () => {
    if (showMissingRequiredFields(formRef.current, [
    {label:getText('height', ln),value:physical.heightFeet && physical.heightInches},
    {label:getText('weight', ln),value:physical.mass},{label:getText('color', ln),value:physical.skinColor},
    {label:getText('blood', ln),value:physical.blood},{label:getText('issue', ln),value:physical.issue}
], ln)) return

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
        ? router.push(`/profile/${router.query.id}`)
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
    <div className={styles.wrapper} >
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
      <form ref={formRef} className={styles.form__Container} onSubmit={e => { e.preventDefault(); update() }}>
        <div className={styles.field}>
          <label>{getText('height', ln)}</label>
          <div className={styles.flex}>
            <input
              type='number'
              value={physical.heightFeet}
              onChange={e =>
                setPhysical({ ...physical, heightFeet: e.target.value })
              }
              min='0'
            />
            <span> {getText('feet', ln)}</span>
            <input
              type='number'
              value={physical.heightInches}
              onChange={e =>
                setPhysical({ ...physical, heightInches: e.target.value })
              }
              min='0'
              max="11"
            />
            <span>{getText('inches', ln)}</span>
          </div>
        </div>
        <div className={styles.field}>
          <label>
            {getText('weight', ln)}&nbsp;({getText('kg', ln)})
          </label>
          <input
            type='Number'
            // placeholder='50kg'
            value={physical.mass}
            onChange={e => setPhysical({ ...physical, mass: e.target.value })}
            min='0'
          />
        </div>
        <div className={styles.field}>
          <label>{getText('color', ln)}</label>
          <div className={styles.options}>
            {skinColors.map((item, index) => (
              <button
                type='button'
                aria-pressed={physical.skinColor === item}
                onClick={() => setPhysical(previous => ({ ...previous, skinColor: previous.skinColor === item ? '' : item }))}
                data-selected={Boolean(item == physical.skinColor)}
                key={index}
              >
                <Ln item={item} />
              </button>
            ))}
          </div>
        </div>

        {/* <div className={styles.field}>
          <label>{getText('bodyType', ln)}</label>
          <div className={styles.options}>
            {bodyTypes.map((item, index) => (
              <span
                onClick={() => setPhysical({ ...physical, bodyType: item })}
                data-selected={Boolean(item == physical.bodyType)}
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
              <button
                type='button'
                aria-pressed={physical.blood === item}
                onClick={() => setPhysical(previous => ({ ...previous, blood: previous.blood === item ? '' : item }))}
                data-selected={Boolean(item == physical.blood)}
                key={index}
              >
                {item}
              </button>
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
      <button type="button" className={styles.save} onClick={() => update()}>
        {getText('save', ln)}
      </button>
    </div>
  )
}

export default Basic
