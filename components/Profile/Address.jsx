import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'
import Ln from '../utils/Ln'

const Address = ({ address, ln }) => {
  const [open, setOpen] = useState(true)
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
              <Ln item={address?.city || '____'} />{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('district', ln)} : </div>
            <div className={styles.value}>
              {' '}
              <Ln item={address?.district || '____'} />{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('upazilla', ln)} : </div>
            <div className={styles.value}>
              {' '}
              <Ln item={address?.upazilla || '____'} />{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('location', ln)} : </div>
            <div className={styles.value}> {address?.location || '____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('email', ln)} : </div>
            <div className={styles.email}> {address?.email || '____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('phone', ln)} : </div>
            <div className={styles.phone}> {address?.phone || '____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('phone2', ln)} : </div>
            <div className={styles.phone1}> {address?.phone1 || '____'} </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Address
