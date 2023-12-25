import React from 'react'
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

const Religion = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <span className={styles.number}>3</span>
        <div className={styles.title}>Religion</div>
      </div>
      <form className={styles.formContainer}>
        <div className={styles.field}>
          <label>Outfit outside you home ?</label>
          <textarea></textarea>
        </div>
        <div className={styles.field}>
          <label>How long have you been wearing this outfit ?</label>
          <textarea></textarea>
        </div>
        <div className={styles.field}>
          <label>
            Do You pray 5 times a day ? How long have you been doing so ?
          </label>
          <textarea></textarea>
        </div>
        <div className={styles.field}>
          <label>how many times you miss prayer a week normally ? </label>
          <textarea></textarea>
        </div>
        <div className={styles.field}>
          <label>write some islamic book you have read ? </label>
          <textarea></textarea>
        </div>
        <div className={styles.field}>
          <label>
            write something about you piety / good things about you?{' '}
          </label>
          <textarea></textarea>
        </div>
        <div className={styles.field}>
          <label>write something about your interest , hoby , dream? </label>
          <textarea></textarea>
        </div>
      </form>
      <div className={styles.save}>Save</div>
    </div>
  )
}

export default Religion
