import React, { useState } from 'react'
import styles from '@/styles/Profile/Update/Basic.module.css'
import {
  professions,
  skinColors,
  bodyTypes,
  educationTypes,
  educationalStatus,
  institutes,
  sessions
} from '@/pages/api/auth/data'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const Education = ({ data }) => {
  const [education, setEducation] = useState({ ...data })
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)

  const update = async () => {
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        `/api/education/${router.query.id}`,
        {
          ...education
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )
      console.log(data)
      setEducation(data)
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <span className={styles.number}>3</span>
        <div className={styles.title}>Education & Career</div>
      </div>
      <form className={styles.formContainer}>
        <div className={styles.field}>
          <label>Education Type</label>
          <select
            onChange={e =>
              setProfile({ ...profile, educationType: e.target.value })
            }
          >
            {educationTypes.map((item, index) => (
              <option
                value={item}
                key={index}
                selected={item == education.educationType ? true : false}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>Education</label>
          <select
            onChange={e =>
              setProfile({ ...education, education: e.target.value })
            }
          >
            {educationalStatus.map((item, index) => (
              <option
                value={item}
                key={index}
                selected={item == education.education ? true : false}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>Profession</label>
          <input type='text' />
        </div>

        <div className={styles.field}>
          <label>SSC(school-date-result)</label>
          <input type='text' />
        </div>
        <div className={styles.field}>
          <label>HSC(college-date-result)</label>
          <input type='text' />
        </div>
        <div className={styles.field}>
          <label>Hons(college/Uni-date-result)</label>
          <input type='text' />
        </div>
        <div className={styles.field}>
          <label>Master(college/Uni-date-result)</label>
          <input type='text' />
        </div>

        <div className={styles.field}>
          <label>University</label>
          <select name='profession'>
            {institutes.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>Session</label>
          <select name='profession'>
            {sessions.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className={styles.save}>Save</div>
    </div>
  )
}

export default Education
