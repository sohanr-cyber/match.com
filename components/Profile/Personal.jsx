import React from 'react'
import styles from '../../styles/Profile/Personal.module.css'

const Personal = ({ personal }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>Personal Information</div>
        <div className={styles.toggle}>-</div>
      </div>
      <div className={styles.details}>
        <div className={styles.flex}>
          <div className={styles.key}>First Name: </div>
          <div className={styles.value}>{personal.firstName || '--'} </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Last Name: </div>
          <div className={styles.value}>{personal.lastName || '--'} </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Gender: </div>
          <div className={styles.value}>{personal.gender || '--'} </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Marital Status: </div>
          <div className={styles.value}>{personal.maritalStatus || '--'}</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Date of Birth: </div>
          <div className={styles.value}>{personal.bornAt || '--'} </div>
        </div>
      </div>
    </div>
  )
}

export default Personal
