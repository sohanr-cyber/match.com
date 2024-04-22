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
import { getText } from '@/Translation/profile'
import { showSnackBar } from '@/redux/notistackSlice'

const OthersUpdate = ({ profile, setProfile, ln }) => {
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
      dispatch(
        showSnackBar({
          message: 'Updated Succesfully ',
          option: {
            variant: 'success'
          }
        })
      )
      setProfile(data)
      dispatch(finishLoading())
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
    <div
      className={styles.wrapper}
      style={{ backgroundColor: 'aliceblue', paddingTop: '25px' }}
    >
      <div className={styles.heading}>
        <div className={styles.left}>
          <span>7</span>
          <div className={styles.title}>{getText('others', ln)}</div>
        </div>
        {profile.updatedAt && (
          <div className={styles.right}>
            Updated <Moment fromNow>{profile.updatedAt}</Moment>
          </div>
        )}
      </div>
      <form className={styles.formContainer}>
        <div className={styles.field}>
          <label> {getText('InterestedInDivorced', ln)}</label>
          <div className={styles.options}>
            <span
              style={
                profile.categories?.find(i => i == 'InterestedInDivorced')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories?.find(
                    i => i == 'InterestedInDivorced'
                  ) && [...profile.categories, 'InterestedInDivorced']
                })
              }
            >
              {getText('yes', ln)}
            </span>
            <span
              style={
                !profile.categories?.find(i => i == 'InterestedInDivorced')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories?.find(
                      i => i == 'InterestedInDivorced'
                    ) &&
                    profile.categories?.filter(i => i != 'InterestedInDivorced')
                })
              }
            >
              {getText('no', ln)}
            </span>
          </div>
        </div>

        <div className={styles.field}>
          <label>{getText('InterestedInDivorcedChild', ln)}</label>
          <div className={styles.options}>
            <span
              style={
                profile.categories?.find(i => i == 'InterestedInDivorcedChild')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories?.find(
                    i => i == 'InterestedInDivorcedChild'
                  ) && [...profile.categories, 'InterestedInDivorcedChild']
                })
              }
            >
              {getText('yes', ln)}
            </span>
            <span
              style={
                !profile.categories?.find(i => i == 'InterestedInDivorcedChild')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories?.find(
                      i => i == 'InterestedInDivorcedChild'
                    ) &&
                    profile.categories?.filter(
                      i => i != 'InterestedInDivorcedChild'
                    )
                })
              }
            >
              {getText('no', ln)}
            </span>
          </div>
        </div>

        <div className={styles.field}>
          <label>{getText('student', ln)}</label>
          <div className={styles.options}>
            <span
              style={
                profile.categories?.find(i => i == 'Student')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories?.find(
                    i => i == 'Student'
                  ) && [...profile.categories, 'Student']
                })
              }
            >
              {getText('yes', ln)}
            </span>
            <span
              style={
                !profile.categories?.find(i => i == 'Student')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories?.find(i => i == 'Student') &&
                    profile.categories?.filter(i => i != 'Student')
                })
              }
            >
              {getText('no', ln)}
            </span>
          </div>
        </div>
        <div className={styles.field}>
          <label>{getText('studentWithJob', ln)}</label>
          <div className={styles.options}>
            <span
              style={
                profile.categories?.find(i => i == 'StudentWithJob')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories?.find(
                    i => i == 'StudentWithJob'
                  ) && [...profile.categories, 'StudentWithJob']
                })
              }
            >
              {getText('yes', ln)}
            </span>
            <span
              style={
                !profile.categories?.find(i => i == 'StudentWithJob')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories?.find(i => i == 'StudentWithJob') &&
                    profile.categories?.filter(i => i != 'StudentWithJob')
                })
              }
            >
              {getText('no', ln)}
            </span>
          </div>
        </div>

        <div className={styles.field}>
          <label>{getText('polynomy', ln)}</label>
          <div className={styles.options}>
            <span
              style={
                profile?.categories?.find(i => i == 'SecondWife')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories?.find(
                    i => i == 'SecondWife'
                  ) && [...profile.categories, 'SecondWife']
                })
              }
            >
              {getText('yes', ln)}
            </span>
            <span
              style={
                !profile.categories?.find(i => i == 'SecondWife')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories?.find(i => i == 'SecondWife') &&
                    profile.categories?.filter(i => i != 'SecondWife')
                })
              }
            >
              {getText('no', ln)}
            </span>
          </div>
        </div>

        <div className={styles.field}>
          <label>{getText('emigrant', ln)}</label>
          <div className={styles.options}>
            <span
              style={
                profile.categories?.find(i => i == 'Emigrant')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories?.find(
                    i => i == 'Emigrant'
                  ) && [...profile.categories, 'Emigrant']
                })
              }
            >
              {getText('yes', ln)}
            </span>
            <span
              style={
                !profile.categories?.find(i => i == 'Emigrant')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories?.find(i => i == 'Emigrant') &&
                    profile.categories?.filter(i => i != 'Emigrant')
                })
              }
            >
              {getText('no', ln)}
            </span>
          </div>
        </div>

        <div className={styles.field}>
          <label> {getText('interestedInEmigrant', ln)}</label>
          <div className={styles.options}>
            <span
              style={
                profile.categories?.find(i => i == 'InterestedInEmigrant')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories: !profile.categories?.find(
                    i => i == 'InterestedInEmigrant'
                  ) && [...profile.categories, 'InterestedInEmigrant']
                })
              }
            >
              {getText('yes', ln)}
            </span>
            <span
              style={
                !profile.categories?.find(i => i == 'InterestedInEmigrant')
                  ? { background: 'blue', color: 'white' }
                  : {}
              }
              onClick={() =>
                setProfile({
                  ...profile,
                  categories:
                    profile.categories?.find(
                      i => i == 'InterestedInEmigrant'
                    ) &&
                    profile.categories?.filter(i => i != 'InterestedInEmigrant')
                })
              }
            >
              {getText('no', ln)}
            </span>
          </div>
        </div>
      </form>
      {error && <p style={{ fontSize: '80%', color: 'red' }}>{error}</p>}
      <div className={styles.save} onClick={() => update()}>
        {getText('save', ln)}
      </div>
    </div>
  )
}

export default OthersUpdate
