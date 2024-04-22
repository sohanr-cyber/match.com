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
import { getText } from '@/Translation/profile'
import Ln from '@/components/utils/Ln'
import { englishToBangla } from '@/utils'
import { showSnackBar } from '@/redux/notistackSlice'

const Education = ({ education: data, profile, ln }) => {
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
      dispatch(
        showSnackBar({
          message: 'Fill All The Required Field!',
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
      dispatch(
        showSnackBar({
          message: 'Updated Succesfully ',
          option: {
            variant: 'success'
          }
        })
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
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.left}>
          <span>3</span>
          <div className={styles.title}>{getText('ec', ln)}</div>
        </div>
        {education.updatedAt && (
          <div className={styles.right}>
            Updated <Moment fromNow>{education.updatedAt}</Moment>
          </div>
        )}
      </div>
      <form className={styles.formContainer}>
        <div className={styles.field}>
          <label>
            {getText('educationType', ln)}({getText('required', ln)})
          </label>
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
                <Ln item={item} />{' '}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label>
            {getText('ocupation', ln)}({getText('required', ln)})
          </label>
          <input
            type='text'
            value={education.profession}
            onChange={e =>
              setEducation({ ...education, profession: e.target.value })
            }
          />
        </div>
        <div className={styles.field}>
          <label>{getText('skills', ln)}</label>
          <textarea
            type='text'
            value={education.skills}
            onChange={e =>
              setEducation({ ...education, skills: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('income', ln)}</label>
          <input
            type='number'
            value={englishToBangla(education.income, ln)}
            onChange={e =>
              setEducation({ ...education, income: e.target.value })
            }
          />
        </div>

        <div className={styles.field}>
          <label>{getText('sscUpdate', ln)}</label>
          <input
            type='text'
            value={education.ssc}
            onChange={e => setEducation({ ...education, ssc: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label>{getText('hscUpdate', ln)}</label>
          <input
            type='text'
            value={education.hsc}
            onChange={e => setEducation({ ...education, hsc: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label>{getText('honsUpdate', ln)}</label>
          <input
            type='text'
            value={education.hons}
            onChange={e => setEducation({ ...education, hons: e.target.value })}
          />
        </div>
        <div className={styles.field}>
          <label>{getText('masterUpdate', ln)}</label>
          <input
            type='text'
            value={education.masters}
            onChange={e =>
              setEducation({ ...education, masters: e.target.value })
            }
          />
        </div>

        <div className={styles.field}>
          <label>{getText('uni', ln)}</label>
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
          <label>{getText('session', ln)}</label>
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
          <label>{getText('education', ln)}</label>
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
                <Ln item={item} />{' '}
              </span>
            ))}
          </div>
        </div>

        {profile.gender == 'Female' && (
          <>
            {' '}
            <div className={styles.field}>
              <label>{getText('jobAfter', ln)}</label>
              <input
                type='text'
                value={education.jobAfter}
                onChange={e =>
                  setEducation({ ...education, jobAfter: e.target.value })
                }
              />
            </div>
            <div className={styles.field}>
              <label>{getText('studyAfter', ln)}</label>
              <input
                type='text'
                value={education.studyAfter}
                onChange={e =>
                  setEducation({ ...education, studyAfter: e.target.value })
                }
              />
            </div>
            <div className={styles.field}>
              <label>{getText('moreEC', ln)}</label>
              <textarea
                type='text'
                value={education.more}
                onChange={e =>
                  setEducation({ ...education, more: e.target.value })
                }
              ></textarea>
            </div>
          </>
        )}
      </form>
      {error && <p style={{ color: 'red', fontSize: '90%' }}>{error}</p>}

      <div className={styles.save} onClick={() => update()}>
        {getText('save', ln)}
      </div>
    </div>
  )
}

export default Education
