import React, { useEffect, useState } from 'react'
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

import axios from 'axios'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import SearchSelector from '@/components/utils/SearchSelector'

import Moment from 'react-moment'

const Basic = ({ profile, setProfile, locationData }) => {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [error, setError] = useState('')
  const [districts, setDistricts] = useState([])
  const dispatch = useDispatch()

  const update = async () => {
    if (
      !profile.name ||
      !profile.bornAt ||
      !profile.profession ||
      !profile.education ||
      !profile.educationType ||
      !profile.skinColor ||
      !profile.bodyType ||
      !profile.city ||
      !profile.district ||
      !profile.upazilla ||
      !profile.gender ||
      !profile.maritalStatus ||
      !profile.heightFeet ||
      !profile.heightInches
    ) {
      setError('Fill All The Required Field !')
      return
    }
    try {
      setError('')
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
      setProfile({
        ...data,
        heightFeet: parseInt(data.height / 12),
        heightInches: data.height % 12
      })
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }

  const fetchDistrict = async city => {
    try {
      const { data } = await axios.get(
        `https://bdapis.com/api/v1.1/division/${city}`
      )
      setDistricts(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDistrict(profile.city || locationData[0].division)
  }, [profile.city])

  return (
    <>
      <div className={styles.wrapper} style={{ paddingTop: '70px' }}>
        <h2 style={{ marginBottom: '10px' }}>Update Your Profile</h2>
        <div className={styles.heading}>
          <div className={styles.left}>
            <span>1</span>
            <div className={styles.title}>Basic Information</div>
          </div>
          {profile.updatedAt && (
            <div className={styles.right}>
              Updated <Moment fromNow>{profile.updatedAt}</Moment>
            </div>
          )}
        </div>
        <form className={styles.formContainer}>
          <div className={styles.field}>
            <label>Name</label>
            <input
              type='text'
              value={profile?.name}
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
                value={profile?.heightFeet}
                onChange={e =>
                  setProfile({ ...profile, heightFeet: e.target.value })
                }
              />
              <span> feet</span>
              <input
                type='number'
                value={profile?.heightInches}
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
            <label>Gender</label>
            <div className={styles.options}>
              {['Male', 'Female'].map((item, index) => (
                <span
                  style={
                    profile.gender == item
                      ? { background: 'blue', color: 'white' }
                      : {}
                  }
                  onClick={() => setProfile({ ...profile, gender: item })}
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>Marital Status</label>
            <div className={styles.options}>
              {[...maritalStatuses].map((item, index) => (
                <span
                  style={
                    profile.maritalStatus == item
                      ? { background: 'blue', color: 'white' }
                      : {}
                  }
                  onClick={() =>
                    setProfile({ ...profile, maritalStatus: item })
                  }
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label>University (Optional)</label>
            <select
              onChange={e =>
                setProfile({ ...profile, institute: e.target.value })
              }
            >
              {['Not Selected', ...institutes].map((item, index) => (
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
            <label>Session (Optional)</label>
            <select
              onChange={e =>
                setProfile({ ...profile, session: e.target.value })
              }
            >
              {['Not Selected', ...sessions].map((item, index) => (
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
            <label>City/Division </label>
            <select
              className={styles.value}
              onChange={e => setProfile({ ...profile, city: e.target.value })}
            >
              {[
                {
                  division: 'Not Selected'
                },
                ...locationData
              ].map((item, index) => (
                <option
                  key={index}
                  selected={profile.city == item.division ? true : false}
                >
                  {item.division}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>District</label>
            <select
              className={styles.value}
              onChange={e =>
                setProfile({ ...profile, district: e.target.value })
              }
            >
              {[{ district: 'Not Selectd' }, ...districts].map(
                (item, index) => (
                  <option
                    key={index}
                    value={item.district}
                    selected={item.district == profile.district ? true : false}
                  >
                    {item.district}
                  </option>
                )
              )}
            </select>
          </div>
          <div className={styles.field}>
            <label>Upazilla </label>
            <select
              className={styles.value}
              onChange={e =>
                setProfile({
                  ...profile,
                  upazilla: e.target.value
                })
              }
            >
              <option>Not Selected</option>
              {districts
                .find(i => i.district == profile.district)
                ?.upazilla.map((item, index) => (
                  <option
                    key={index}
                    value={item}
                    selected={item == profile.upazilla ? true : false}
                  >
                    {item}
                  </option>
                ))}
            </select>
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
