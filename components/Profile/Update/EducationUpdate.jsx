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
import { finishLoading, startLoading } from '@/redux/stateSlice'
import axios from 'axios'

const Education = ({ education: data }) => {
  const [education, setEducation] = useState({ ...data })
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [error, setError] = useState('')
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
          <div className={styles.options}>
            {educationTypes.map((item, index) => (
              <span
                onClick={() =>
                  setEducation({ ...education, educationType: item })
                }
                style={
                  item == education.educationType
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
          <label>Profession</label>
          <input
            type='text'
            value={education.profession}
            onChange={e =>
              setEducation({ ...education, profession: e.target.value })
            }
          />
        </div>
        <div className={styles.field}>
          <label>Monthly Income</label>
          <input
            type='number'
            value={education.income}
            onChange={e =>
              setEducation({ ...education, income: e.target.value })
            }
          />
        </div>

        <div className={styles.field}>
          <label>SSC(school-date-result)</label>
          <input
            type='text'
            value={education.ssc}
            onChange={e => setEducation({ ...education, ssc: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label>HSC(college-date-result)</label>
          <input
            type='text'
            value={education.hsc}
            onChange={e => setEducation({ ...education, hsc: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label>Hons(college/Uni-date-result)</label>
          <input
            type='text'
            value={education.hons}
            onChange={e => setEducation({ ...education, hons: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label>Master(college/Uni-date-result)</label>
          <input
            type='text'
            value={education.masters}
            onChange={e =>
              setEducation({ ...education, masters: e.target.value })
            }
          />
        </div>

        <div className={styles.field}>
          <label>University</label>
          <select
            onChange={e =>
              setEducation({ ...education, institute: e.target.value })
            }
          >
            {institutes.map((item, index) => (
              <option
                value={item}
                key={index}
                selected={education.institute == item ? true : false}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>Session</label>
          <select
            onChange={e =>
              setEducation({ ...education, session: e.target.value })
            }
          >
            {sessions.map((item, index) => (
              <option
                value={item}
                key={index}
                selected={item == education.session ? true : false}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>Education</label>
          <div className={styles.options}>
            {educationalStatus.map((item, index) => (
              <span
                onClick={() => setEducation({ ...education, education: item })}
                style={
                  item == education.education
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
      </form>
      {error && <p style={{ color: 'red', fontSize: '90%' }}>{error}</p>}

      <div className={styles.save} onClick={() => update()}>
        Save
      </div>
    </div>
  )
}

export default Education
