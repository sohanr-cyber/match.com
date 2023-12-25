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

const Basic = () => {
  return (
    <div
      className={styles.wrapper}
      style={{ backgroundColor: 'aliceblue', paddingTop: '25px' }}
    >
      <div className={styles.heading}>
        <span className={styles.number}>2</span>
        <div className={styles.title}>Personal Information</div>
      </div>
      <form className={styles.formContainer}>
        <div className={styles.field}>
          <label>First Name</label>
          <input type='text' />
        </div>
        <div className={styles.field}>
          <label>Last Name</label>
          <input type='text' />
        </div>
        <div className={styles.field}>
          <label>Date Of Birth</label>
          <input type='date' />
        </div>

        <div className={styles.field}>
          <label>Gender</label>
          <select name='profession'>
            {['Male', 'Female'].map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>Gender</label>
          <select name='profession'>
            {maritalStatuses.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className={styles.save}>Save</div>

    </div>
  )
}

export default Basic
