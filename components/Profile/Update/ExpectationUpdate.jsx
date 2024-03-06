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

const Basic = ({ expectation: data, ln }) => {
  const [expectation, setExpectation] = useState({
    ...data,
    minHeightFeet: parseInt(data.minHeight / 12),
    minHeightInches: data.minHeight % 12,
    maxHeightFeet: parseInt(data.maxHeight / 12),
    maxHeightInches: data.maxHeight % 12
  })
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [error, setError] = useState('')
  const update = async () => {
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        `/api/expectation/${router.query.id}`,
        {
          ...expectation,
          minHeight:
            parseInt(parseInt(expectation.minHeightFeet) * 12) +
            parseInt(expectation.minHeightInches),
          maxHeight:
            parseInt(parseInt(expectation.maxHeightFeet) * 12) +
            parseInt(expectation.maxHeightInches)
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )

      setExpectation({
        ...data,
        maxHeightFeet: parseInt(data.maxHeight / 12),
        maxHeightInches: data.maxHeight % 12,
        minHeightFeet: parseInt(data.minHeight / 12),
        minHeightInches: data.minHeight % 12
      })
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles.wrapper} style={{ backgroundColor: 'aliceblue' }}>
        <div className={styles.heading}>
          <div className={styles.left}>
            <span>6</span>
            <div className={styles.title}>{getText('expectation', ln)}</div>
          </div>
          {expectation.updatedAt && (
            <div className={styles.right}>
              Updated <Moment fromNow>{expectation.updatedAt}</Moment>
            </div>
          )}
        </div>
        <form className={styles.formContainer}>
          <div className={styles.field}>
            <label>{getText('minAge', ln)}</label>
            <input
              type='number'
              value={expectation.minAge}
              onChange={e =>
                setExpectation({ ...expectation, minAge: e.target.value })
              }
            />
          </div>
          <div className={styles.field}>
            <label> {getText('maxAge', ln)}</label>
            <input
              type='number'
              value={expectation.maxAge}
              onChange={e =>
                setExpectation({ ...expectation, maxAge: e.target.value })
              }
            />
          </div>
          <div className={styles.field}>
            <label> {getText('minHeight', ln)}</label>
            <div className={styles.flex}>
              <input
                type='number'
                placeholder='5'
                value={expectation.minHeightFeet}
                onChange={e =>
                  setExpectation({
                    ...expectation,
                    minHeightFeet: e.target.value
                  })
                }
              />
              <span> {getText('feet', ln)}</span>
              <input
                type='number'
                placeholder='8'
                value={expectation.minHeightInches}
                onChange={e =>
                  setExpectation({
                    ...expectation,
                    minHeightInches: e.target.value
                  })
                }
              />
              <span>{getText('inches', ln)}</span>
            </div>
          </div>
          <div className={styles.field}>
            <label> {getText('maxHeight', ln)}</label>
            <div className={styles.flex}>
              <input
                type='number'
                placeholder='5'
                value={expectation.maxHeightFeet}
                onChange={e =>
                  setExpectation({
                    ...expectation,
                    maxHeightFeet: e.target.value
                  })
                }
                // style={{ maxWidth: '45px', minWidth: '30px' }}
              />
              <span> {getText('feet', ln)}</span>
              <input
                type='number'
                placeholder='8'
                // style={{ maxWidth: '45px', minWidth: '30px' }}
                value={expectation.maxHeightInches}
                onChange={e =>
                  setExpectation({
                    ...expectation,
                    maxHeightInches: e.target.value
                  })
                }
              />
              <span>{getText('inches', ln)}</span>
            </div>
          </div>
          <div className={styles.field}>
            <label>{getText('bodyType', ln)}</label>
            <div className={styles.options}>
              {bodyTypes.map((item, index) => (
                <span
                  style={
                    expectation.bodyTypes.find(i => i == item)
                      ? {
                          background: 'blue',
                          color: 'white'
                        }
                      : {}
                  }
                  key={index}
                  onClick={() =>
                    setExpectation({
                      ...expectation,
                      bodyTypes: expectation.bodyTypes.find(i => i == item)
                        ? expectation.bodyTypes.filter(i => i != item)
                        : [...expectation.bodyTypes, item]
                    })
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>{getText('color', ln)}</label>
            <div className={styles.options}>
              {skinColors.map((item, index) => (
                <span
                  style={
                    expectation.skinColors.find(i => i == item)
                      ? {
                          background: 'blue',
                          color: 'white'
                        }
                      : {}
                  }
                  key={index}
                  onClick={() =>
                    setExpectation({
                      ...expectation,
                      skinColors: expectation.skinColors.find(i => i == item)
                        ? expectation.skinColors.filter(i => i != item)
                        : [...expectation.skinColors, item]
                    })
                  }
                >
                  <Ln item={item} />{' '}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label> {getText('ocupation', ln)}</label>
            <div className={styles.options}>
              {professions.map((item, index) => (
                <span
                  style={
                    expectation.professions.find(i => i == item)
                      ? {
                          background: 'blue',
                          color: 'white'
                        }
                      : {}
                  }
                  onClick={() =>
                    setExpectation({
                      ...expectation,
                      professions: expectation.professions.find(i => i == item)
                        ? expectation.professions.filter(i => i != item)
                        : [...expectation.professions, item]
                    })
                  }
                  key={index}
                >
                  <Ln item={item} />{' '}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>{getText('educationType', ln)}</label>
            <div className={styles.options}>
              {educationTypes.map((item, index) => (
                <span
                  style={
                    expectation.educationTypes?.find(i => i == item)
                      ? {
                          background: 'blue',
                          color: 'white'
                        }
                      : {}
                  }
                  onClick={() =>
                    setExpectation({
                      ...expectation,
                      educationTypes: expectation.educationTypes?.find(
                        i => i == item
                      )
                        ? expectation.educationTypes?.filter(i => i != item)
                        : [...expectation.educationTypes, item]
                    })
                  }
                  key={index}
                >
                  <Ln item={item} />{' '}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>{getText('education', ln)}</label>
            <div className={styles.options}>
              {educationalStatus.map((item, index) => (
                <span
                  style={
                    expectation.educations?.find(i => i == item)
                      ? {
                          background: 'blue',
                          color: 'white'
                        }
                      : {}
                  }
                  onClick={() =>
                    setExpectation({
                      ...expectation,
                      educations: expectation.educations?.find(i => i == item)
                        ? expectation.educations?.filter(i => i != item)
                        : [...expectation.educations, item]
                    })
                  }
                  key={index}
                >
                  <Ln item={item} />{' '}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>{getText('piety', ln)}</label>
            <textarea
              value={expectation.description}
              onChange={e =>
                setExpectation({ ...expectation, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className={styles.field}>
            <label>{getText('moreE', ln)}</label>
            <textarea
              value={expectation.more}
              onChange={e =>
                setExpectation({ ...expectation, more: e.target.value })
              }
            ></textarea>
          </div>
        </form>
        {error && <p style={{ color: 'red', fontSize: '90%' }}>{error}</p>}
        <div className={styles.save} onClick={() => update()}>
          {getText('save', ln)}
        </div>
      </div>
    </>
  )
}

export default Basic
