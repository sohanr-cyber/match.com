import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'
import Ln from '../utils/Ln'

const Address = ({ address, ln }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>{getText('address', ln)}</div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>
      {open && (
        <div className={styles.details}>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('city', ln)} : </div>
            <div className={styles.value}>
              <Ln item={address?.city || '--'} />{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('district', ln)} : </div>
            <div className={styles.value}>
              {' '}
              <Ln item={address?.district || '--'} />{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('upazilla', ln)} : </div>
            <div className={styles.value}>
              {' '}
              <Ln item={address?.upazilla || '--'} />{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('location', ln)} : </div>
            <div className={styles.value}> {address?.location || '--'} </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Address
