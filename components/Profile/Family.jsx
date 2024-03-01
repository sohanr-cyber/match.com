import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'

const Family = ({ family, ln }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>{getText('family', ln)}</div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>
      {open && (
        <div className={styles.details}>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('father', ln)}: </div>
            <div className={styles.value}> {family?.father || '--'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('mother', ln)}: </div>
            <div className={styles.value}> {family?.mother || '--'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('brother', ln)}: </div>
            <div className={styles.value}>{family?.brother || '--'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('sister', ln)} : </div>
            <div className={styles.value}>{family?.sister || '--'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('eStatus', ln)} : </div>
            <div className={styles.value}>{family?.eStatus || '--'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>
              {' '}
              <div className={styles.flex}>
                <div className={styles.key}>{getText('rStatus', ln)} : </div>
                <div className={styles.value}>{family?.eStatus || '--'} </div>
              </div>{' '}
              :{' '}
            </div>
            <div className={styles.value}>{family?.rStatus || '--'} </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Family
