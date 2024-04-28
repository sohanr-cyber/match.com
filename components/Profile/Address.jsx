import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'
import Ln from '../utils/Ln'
import { isAddressValid } from '@/utility/validator'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useRouter } from 'next/router'

const Address = ({ address, ln, myProfile }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.heading}
        style={!isAddressValid(address) ? { background: 'red' } : {}}
      >
        <div className={styles.title}>{getText('address', ln)}</div>
        <div className={styles.flex}>
          {myProfile && (
            <div
              className={styles.updateIcon}
              onClick={() =>
                router.push(`/profile/update/${router.query.id}?address=true`)
              }
            >
              <EditNoteIcon />
            </div>
          )}
          <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
            {open ? '-' : '+'}
          </div>
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
            <div className={styles.phone1}> {address?.phone2 || '____'} </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Address
