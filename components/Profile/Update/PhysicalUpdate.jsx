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
        <span className={styles.number}>4</span>
        <div className={styles.title}>Physical Attributes</div>
      </div>
      <form className={styles.form__Container}>
        <div className={styles.field}>
          <label>Height</label>
          <div className={styles.flex}>
            <input
              type='number'
              placeholder='5'
              // style={{ maxWidth: '45px', minWidth: '30px' }}
            />
            <span> feet</span>
            <input
              type='number'
              placeholder='8'
              // style={{ maxWidth: '45px', minWidth: '30px' }}
            />
            <span>inches</span>
          </div>
        </div>
        <div className={styles.field}>
          <label>Weight(kg)</label>
          <input type='Number' placeholder='50kg' />
        </div>
        <div className={styles.field}>
          <label>Skin Color</label>
          <select>
            {skinColors.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label>Body Type</label>
          <select>
            {bodyTypes.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>Blood Group</label>
          <select name='profession'>
            {['O+', 'A+', 'B+', 'AB+', 'A-', 'B-', 'O-'].map((item, index) => (
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
