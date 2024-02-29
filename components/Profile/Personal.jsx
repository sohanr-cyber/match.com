import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'

const Personal = ({ personal, ln }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>{getText('pr', ln)}</div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>
      {open && (
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
      )}
    </div>
  )
}

export default Personal
