import React, { useState } from 'react'
import styles from '@/styles/Profile/Update/Basic.module.css'
import {
  professions,
  skinColors,
  bodyTypes,
  educationTypes,
  educationalStatus,
  institutes,
  sessions,
  maritalStatuses,
  categories
} from '@/pages/api/auth/data'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'
import Moment from 'react-moment/dist'

const OthersUpdate = ({ profile, setProfile }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [error, setError] = useState('')
  const update = async () => {
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        '/api/auth/register',
        {
          ...profile
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )
      setProfile(data)
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }

  return (
    <div
      className={styles.wrapper}
      style={{ backgroundColor: 'aliceblue', paddingTop: '25px' }}
    >
      <div className={styles.heading}>
        <div className={styles.left}>
          <span>7</span>
          <div className={styles.title}>Others</div>
        </div>
        {profile.updatedAt && (
          <div className={styles.right}>
            Updated <Moment fromNow>{profile.updatedAt}</Moment>
          </div>
        )}
      </div>
      <form className={styles.formContainer}>
        <div className={styles.field}>
          <label>Are You Interested in Marrying a Divorced?</label>
          <div className={styles.options}>
            <span
              style={
                profile.categories.find(i => i == 'InterestedInDivorced')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories.find(
                    i => i == 'InterestedInDivorced'
                  ) && [...profile.categories, 'InterestedInDivorced']
                })
              }
            >
              Yes
            </span>
            <span
              style={
                !profile.categories.find(i => i == 'InterestedInDivorced')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories.find(i => i == 'InterestedInDivorced') &&
                    profile.categories.filter(i => i != 'InterestedInDivorced')
                })
              }
            >
              No
            </span>
          </div>
        </div>

        <div className={styles.field}>
          <label>Are You Interested in Marrying a Divorced Having Child?</label>
          <div className={styles.options}>
            <span
              style={
                profile.categories.find(i => i == 'InterestedInDivorcedChild')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories.find(
                    i => i == 'InterestedInDivorcedChild'
                  ) && [...profile.categories, 'InterestedInDivorcedChild']
                })
              }
            >
              Yes
            </span>
            <span
              style={
                !profile.categories.find(i => i == 'InterestedInDivorcedChild')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories.find(
                      i => i == 'InterestedInDivorcedChild'
                    ) &&
                    profile.categories.filter(
                      i => i != 'InterestedInDivorcedChild'
                    )
                })
              }
            >
              No
            </span>
          </div>
        </div>

        <div className={styles.field}>
          <label>Are You Interested in Marrying a Student/Job Seeker?</label>
          <div className={styles.options}>
            <span
              style={
                profile.categories.find(i => i == 'Student')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories.find(i => i == 'Student') && [
                    ...profile.categories,
                    'Student'
                  ]
                })
              }
            >
              Yes
            </span>
            <span
              style={
                !profile.categories.find(i => i == 'Student')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories.find(i => i == 'Student') &&
                    profile.categories.filter(i => i != 'Student')
                })
              }
            >
              No
            </span>
          </div>
        </div>
        <div className={styles.field}>
          <label>
            Are You Interested in Marrying a Student/Job Seeker Having Some
            Job/Income?
          </label>
          <div className={styles.options}>
            <span
              style={
                profile.categories.find(i => i == 'StudentWithJob')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories.find(
                    i => i == 'StudentWithJob'
                  ) && [...profile.categories, 'StudentWithJob']
                })
              }
            >
              Yes
            </span>
            <span
              style={
                !profile.categories.find(i => i == 'StudentWithJob')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories.find(i => i == 'StudentWithJob') &&
                    profile.categories.filter(i => i != 'StudentWithJob')
                })
              }
            >
              No
            </span>
          </div>
        </div>

        <div className={styles.field}>
          <label>
            Are You Interested in Marrying a Student/Job Seeker Having Some
            Job/Income?
          </label>
          <div className={styles.options}>
            <span
              style={
                profile.categories.find(i => i == 'StudentWithJob')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories.find(
                    i => i == 'StudentWithJob'
                  ) && [...profile.categories, 'StudentWithJob']
                })
              }
            >
              Yes
            </span>
            <span
              style={
                !profile.categories.find(i => i == 'StudentWithJob')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories.find(i => i == 'StudentWithJob') &&
                    profile.categories.filter(i => i != 'StudentWithJob')
                })
              }
            >
              No
            </span>
          </div>
        </div>

        <div className={styles.field}>
          <label>
            Are You Interested in Polynomy ( being or taking second wife) ?{' '}
          </label>
          <div className={styles.options}>
            <span
              style={
                profile.categories.find(i => i == 'SecondWife')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories.find(
                    i => i == 'SecondWife'
                  ) && [...profile.categories, 'SecondWife']
                })
              }
            >
              Yes
            </span>
            <span
              style={
                !profile.categories.find(i => i == 'SecondWife')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories.find(i => i == 'SecondWife') &&
                    profile.categories.filter(i => i != 'SecondWife')
                })
              }
            >
              No
            </span>
          </div>
        </div>

        <div className={styles.field}>
          <label>Are You An Emigrant ? </label>
          <div className={styles.options}>
            <span
              style={
                profile.categories.find(i => i == 'Emigrant')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories.find(
                    i => i == 'Emigrant'
                  ) && [...profile.categories, 'Emigrant']
                })
              }
            >
              Yes
            </span>
            <span
              style={
                !profile.categories.find(i => i == 'Emigrant')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories.find(i => i == 'Emigrant') &&
                    profile.categories.filter(i => i != 'Emigrant')
                })
              }
            >
              No
            </span>
          </div>
        </div>

        <div className={styles.field}>
          <label>Are You Interested In Marrying An Emigrant ? </label>
          <div className={styles.options}>
            <span
              style={
                profile.categories.find(i => i == 'InterestedInEmigrant')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories.find(
                    i => i == 'InterestedInEmigrant'
                  ) && [...profile.categories, 'InterestedInEmigrant']
                })
              }
            >
              Yes
            </span>
            <span
              style={
                !profile.categories.find(i => i == 'InterestedInEmigrant')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories.find(i => i == 'InterestedInEmigrant') &&
                    profile.categories.filter(i => i != 'InterestedInEmigrant')
                })
              }
            >
              No
            </span>
          </div>
        </div>
      </form>
      {error && <p style={{ fontSize: '80%', color: 'red' }}>{error}</p>}
      <div className={styles.save} onClick={() => update()}>
        Save
      </div>
    </div>
  )
}

export default OthersUpdate
