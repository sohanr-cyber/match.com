import React, { useEffect, useState } from 'react'
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

import axios from 'axios'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import SearchSelector from '@/components/utils/SearchSelector'
import { StickyNote2Sharp } from '@mui/icons-material'

const Basic = ({ profile, setProfile }) => {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)

  const dispatch = useDispatch()

  const update = async () => {
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        '/api/auth/register',
        {
          ...profile,
          height:
            parseInt(parseInt(profile.heightFeet) * 12) +
            parseInt(profile.heightInches)
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )
      console.log(data)
      setProfile(data)
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles.wrapper} style={{ paddingTop: '70px' }}>
        <h2 style={{ marginBottom: '10px' }}>Update Your Profile</h2>
        <div className={styles.heading}>
          <span className={styles.number}>1</span>
          <div className={styles.title}>Basic Information</div>
        </div>
        <form className={styles.formContainer}>
          <div className={styles.field}>
            <label>Name</label>
            <input
              type='text'
              value={profile.name}
              onChange={e => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label>Date Of Birth</label>
            <input
              type='date'
              value={
                profile.bornAt &&
                new Date(profile.bornAt).toISOString().split('T')[0]
              }
              onChange={e => setProfile({ ...profile, bornAt: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label>Height</label>
            <div className={styles.flex}>
              <input
                type='number'
                value={profile.heightFeet}
                onChange={e =>
                  setProfile({ ...profile, heightFeet: e.target.value })
                }
              />
              <span> feet</span>
              <input
                type='number'
                value={profile.heightInches}
                onChange={e =>
                  setProfile({ ...profile, heightInches: e.target.value })
                }
              />
              <span>inches</span>
            </div>
          </div>
          <div className={styles.field}>
            <label>Education Type</label>

            <div className={styles.options}>
              {' '}
              {educationTypes.map((item, index) => (
                <span
                  style={
                    profile.educationType == item
                      ? { background: 'blue', color: 'white' }
                      : {}
                  }
                  onClick={() =>
                    setProfile({ ...profile, educationType: item })
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
            <div className={styles.options}>
              {professions.map((item, index) => (
                <span
                  style={
                    profile.profession == item
                      ? { background: 'blue', color: 'white' }
                      : {}
                  }
                  onClick={() => setProfile({ ...profile, profession: item })}
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
              {' '}
              {educationalStatus.map((item, index) => (
                <span
                  style={
                    profile.education == item
                      ? { background: 'blue', color: 'white' }
                      : {}
                  }
                  onClick={() => setProfile({ ...profile, education: item })}
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>Skin Color</label>
            <div className={styles.options}>
              {skinColors.map((item, index) => (
                <span
                  style={
                    profile.skinColor == item
                      ? { background: 'blue', color: 'white' }
                      : {}
                  }
                  onClick={() => setProfile({ ...profile, skinColor: item })}
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>Body Type</label>
            <div className={styles.options}>
              {[...bodyTypes].map((item, index) => (
                <span
                  style={
                    profile.bodyType == item
                      ? { background: 'blue', color: 'white' }
                      : {}
                  }
                  onClick={() => setProfile({ ...profile, bodyType: item })}
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>University</label>
            <select
              onChange={e =>
                setProfile({ ...profile, institute: e.target.value })
              }
            >
              {institutes.map((item, index) => (
                <option
                  value={item}
                  key={index}
                  selected={item == profile.institute ? true : false}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* <div className={styles.field}>
            <label>University</label>
            <SearchSelector options={institutes} />
          </div> */}
          <div className={styles.field}>
            <label>Session</label>
            <select
              onChange={e =>
                setProfile({ ...profile, session: e.target.value })
              }
            >
              {sessions.map((item, index) => (
                <option
                  value={item}
                  key={index}
                  selected={item == profile.session ? true : false}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>City/Division</label>
            <select
              onChange={e =>
                setProfile({ ...profile, session: e.target.value })
              }
            >
              {sessions.map((item, index) => (
                <option
                  value={item}
                  key={index}
                  selected={item == profile.session ? true : false}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>District</label>
            <select
              onChange={e =>
                setProfile({ ...profile, session: e.target.value })
              }
            >
              {sessions.map((item, index) => (
                <option
                  value={item}
                  key={index}
                  selected={item == profile.session ? true : false}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>Upazilla</label>
            <select
              onChange={e =>
                setProfile({ ...profile, session: e.target.value })
              }
            >
              {sessions.map((item, index) => (
                <option
                  value={item}
                  key={index}
                  selected={item == profile.session ? true : false}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className={styles.save} onClick={() => update()}>
          Save
        </div>
      </div>
    </>
  )
}

export default Basic
