import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'
import Ln from '../utils/Ln'
import { isFamilyValid } from '@/utility/validator'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useRouter } from 'next/router'

const Family = ({ family, ln, myProfile }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.heading}
        style={!isFamilyValid(family) ? { background: 'red' } : {}}
      >
        <div className={styles.title}>{getText('family', ln)}</div>
        <div className={styles.flex}>
          {myProfile && (
            <div
              className={styles.updateIcon}
              onClick={() =>
                router.push(`/profile/update/${router.query.id}?update=family`)
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
            <div className={styles.key}>{getText('father', ln)}: </div>
            <div className={styles.value}> {family?.father || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('mother', ln)}: </div>
            <div className={styles.value}> {family?.mother || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('brother', ln)}: </div>
            <div className={styles.value}>{family?.brother || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('sister', ln)} : </div>
            <div className={styles.value}>{family?.sister || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('eStatus', ln)} : </div>
            <div className={styles.value}>
              {' '}
              <Ln item={family?.eStatus || '_____'} />{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>
              {' '}
              <div className={styles.flex}>
                <div className={styles.key}>{getText('rStatus', ln)} : </div>
                <div className={styles.value}>
                  {family?.rStatus || '_____'}{' '}
                </div>
              </div>{' '}
            </div>
            {/* <div className={styles.value}>{family?.rStatus || '_____'} </div> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Family
