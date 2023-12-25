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
    <div className={styles.wrapper} style={{ backgroundColor: 'aliceblue' }}>
      <div className={styles.heading}>
        <span className={styles.number}>5</span>
        <div className={styles.title}>Address</div>
      </div>
      <form className={styles.form__Container}>
        <div className={styles.field}>
          <label>City</label>
          <select>
            {['Dhaka', 'Rangpur', 'Barishal', 'Mymensingh'].map(
              (item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              )
            )}
          </select>
        </div>
        <div className={styles.field}>
          <label>District</label>
          <select>
            {['All', 'Dhaka', 'Rangpur', 'Barishal', 'Mymensingh'].map(
              (item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              )
            )}
          </select>
        </div>
        <div className={styles.field}>
          <label>Upazilla</label>
          <select>
            {['All', 'Dhaka', 'Rangpur', 'Barishal', 'Mymensingh'].map(
              (item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              )
            )}
          </select>
        </div>
        <div className={styles.field}>
          <label>Address</label>
          <input type='text' />
        </div>
      </form>
    </div>
  )
}

export default Basic
