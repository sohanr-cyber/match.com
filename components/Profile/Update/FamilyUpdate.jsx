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
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Moment from 'react-moment/dist'
import { getText } from '@/Translation/profile'
import Ln from '@/components/utils/Ln'
import { showSnackBar } from '@/redux/notistackSlice'
import { isFamilyValid } from '@/utility/validator'
import { routes } from '@/utility/data'

const Religion = ({ family: data, ln, onChange }) => {
  const [family, setFamily] = useProfileSection({
    ...data
  }, onChange)
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const formRef = useRef(null)
  const [error, setError] = useState('')

  const update = async () => {
    if (showMissingRequiredFields(formRef.current, [
    {label:getText('father', ln),value:family.father},{label:getText('mother', ln),value:family.mother},
    {label:getText('brother', ln),value:family.brother},{label:getText('sister', ln),value:family.sister},
    {label:getText('rStatus', ln),value:family.rStatus},{label:getText('eStatus', ln),value:family.eStatus},
    {label:getText('agreement', ln),value:family.agreement}
], ln)) return

    if (!isFamilyValid(family)) {

            dispatch(
        showSnackBar({
          message: 'Fill All The Required Field !',
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
      
      dispatch(
        showSnackBar({
          message: 'Updated Succesfully ',
          option: {
            variant: 'success'
          }
        })
      )
      setFamily(data)
      dispatch(finishLoading())
      const index = routes.findIndex(i => i.query == router.query.update)
      index + 1 >= routes.length
        ? router.push(`/profile/${router.query.id}`)
        : router.push(
            `/profile/update/${router.query.id}?update=${
              routes[index + 1]?.query
            }`
          )
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
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.left}>
          <span>7</span>
          <div className={styles.title}>{getText('family', ln)}</div>
        </div>
        {family.updatedAt && (
          <div className={styles.right}>
            Updated <Moment fromNow>{family.updatedAt}</Moment>
          </div>
        )}
      </div>
      <form ref={formRef} className={styles.formContainer} onSubmit={e => { e.preventDefault(); update() }}>
        <div className={styles.field}>
          <label>{getText('father', ln)}</label>
          <textarea
            value={family.father}
            onChange={e => setFamily({ ...family, father: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('mother', ln)}</label>
          <textarea
            value={family.mother}
            onChange={e => setFamily({ ...family, mother: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('brother', ln)}</label>
          <textarea
            value={family.brother}
            onChange={e => setFamily({ ...family, brother: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('sister', ln)} </label>
          <textarea
            value={family.sister}
            onChange={e => setFamily({ ...family, sister: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('rStatus', ln)}</label>
          <textarea
            value={family.rStatus}
            onChange={e => setFamily({ ...family, rStatus: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('eStatus', ln)} </label>
          <div className={styles.options}>
            {[
              'Lower Class',
              'Lower Middle Class',
              'Middle Class',
              'Higher Middle Class',
              'Higher Class'
            ].map((item, index) => (
              <span
                data-selected={Boolean(family.eStatus == item)}
                onClick={() => setFamily({ ...family, eStatus: family.eStatus === item ? '' : item })}
                key={index}
              >
                <Ln item={item} />{' '}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.field}>
          <label>{getText('agreement', ln)} </label>
          <textarea
            value={family.agreement}
            onChange={e => setFamily({ ...family, agreement: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>
            {getText('moreF', ln)} ({getText('optional', ln)}){' '}
          </label>
          <textarea
            value={family.more}
            onChange={e => setFamily({ ...family, more: e.target.value })}
          ></textarea>
        </div>
      </form>{' '}
      {error && <p style={{ color: 'red', fontSize: '90%' }}>{error}</p>}
      <button type="button" className={styles.save} onClick={() => update()}>
        {getText('save', ln)}
      </button>
    </div>
  )
}

export default Religion
