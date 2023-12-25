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
        <span className={styles.number}>6</span>
        <div className={styles.title}>Family Information</div>
      </div>
      <form className={styles.formContainer}>
        <div className={styles.field}>
          <label>Father Information</label>
          <textarea></textarea>
        </div>
        <div className={styles.field}>
          <label>Mother Information</label>
          <textarea></textarea>
        </div>
        <div className={styles.field}>
          <label>Brother Information</label>
          <textarea></textarea>
        </div>
        <div className={styles.field}>
          <label>Sister Information</label>
          <textarea></textarea>
        </div>
        <div className={styles.field}>
          <label>How much religion they practice ? </label>
          <textarea></textarea>
        </div>
        <div className={styles.field}>
          <label>Family Status </label>
          <select>
            {[
              'Lower Class',
              'Lower Middle Class',
              'Middle Class',
              'Higher Class'
            ].map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>{' '}
        </div>
        <div className={styles.field}>
          <label>Do They Agree To you Marriage ? </label>
          <textarea></textarea>
        </div>
      </form>{' '}
      <div className={styles.save}>Save</div>
    </div>
  )
}

export default Religion
