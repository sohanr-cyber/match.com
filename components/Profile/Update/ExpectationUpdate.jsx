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

const Basic = ({ expectation: data }) => {
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
          <span className={styles.number}>7</span>
          <div className={styles.title}>Your Expectation</div>
        </div>
        <form className={styles.formContainer}>
          <div className={styles.field}>
            <label>Minimum Age</label>
            <input
              type='number'
              value={expectation.minAge}
              onChange={e =>
                setExpectation({ ...expectation, minAge: e.target.value })
              }
            />
          </div>
          <div className={styles.field}>
            <label>Maximum Age</label>
            <input
              type='number'
              value={expectation.maxAge}
              onChange={e =>
                setExpectation({ ...expectation, maxAge: e.target.value })
              }
            />
          </div>
          <div className={styles.field}>
            <label>Minimum Height</label>
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
              <span> feet</span>
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
              <span>inches</span>
            </div>
          </div>
          <div className={styles.field}>
            <label>Maximum Height</label>
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
              <span> feet</span>
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
              <span>inches</span>
            </div>
          </div>
          <div className={styles.field}>
            <label>Body Type</label>
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
            <label>Skin Colors</label>
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
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>Professions</label>
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
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>Education Type</label>
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
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>Education</label>
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
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>Piety</label>
            <textarea
              value={expectation.description}
              onChange={e =>
                setExpectation({ ...expectation, description: e.target.value })
              }
            ></textarea>
          </div>
        </form>
        {error && <p style={{ color: 'red', fontSize: '90%' }}>{error}</p>}
        <div className={styles.save} onClick={() => update()}>
          Save
        </div>
      </div>
    </>
  )
}

export default Basic
