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
import Moment from 'react-moment/dist'

const Education = ({ education: data, profile }) => {
  const [education, setEducation] = useState({ ...data })
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [error, setError] = useState('')
  const update = async () => {
    if (
      !education.educationType ||
      !education.profession ||
      !education.education
    ) {
      setError('Fill All The Required Field ')
      return
    }
    try {
      setError('')
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
        <div className={styles.left}>
          <span>3</span>
          <div className={styles.title}>Education & Career</div>
        </div>
        {education.updatedAt && (
          <div className={styles.right}>
            Updated <Moment fromNow>{education.updatedAt}</Moment>
          </div>
        )}
      </div>
      <form className={styles.formContainer}>
        <div className={styles.field}>
          <label>Education Type(Required)</label>
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
          <label>Profession(Rquired)</label>
          <input
            type='text'
            value={education.profession}
            onChange={e =>
              setEducation({ ...education, profession: e.target.value })
            }
          />
        </div>
        <div className={styles.field}>
          <label>Skills</label>
          <textarea
            type='text'
            value={education.skills}
            onChange={e =>
              setEducation({ ...education, skills: e.target.value })
            }
          ></textarea>
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

        {profile.gender == 'Female' && (
          <>
            {' '}
            <div className={styles.field}>
              <label>Do You Have Intention of Doing Job After Marriage ?</label>
              <input
                type='text'
                value={education.jobAfter}
                onChange={e =>
                  setEducation({ ...education, jobAfter: e.target.value })
                }
              />
            </div>
            <div className={styles.field}>
              <label>
                Do You Have Intention of Continuing Study After Marriage?
              </label>
              <input
                type='text'
                value={education.studyAfter}
                onChange={e =>
                  setEducation({ ...education, studyAfter: e.target.value })
                }
              />
            </div>
          </>
        )}
      </form>
      {error && <p style={{ color: 'red', fontSize: '90%' }}>{error}</p>}

      <div className={styles.save} onClick={() => update()}>
        Save
      </div>
    </div>
  )
}

export default Education
