import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'
import { heightToFeet } from '@/utils'

const Physical = ({ physical, ln }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>{getText('pa', ln)}</div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>
      {open && (
        <div className={styles.details}>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('height', ln)}: </div>
            <div className={styles.value}>
              {physical?.height ? heightToFeet(physical.height, ln) : '_____'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('weight', ln)}: </div>
            <div className={styles.value}>{physical?.weight || '_____'} KG </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('hair', ln)}: </div>
            <div className={styles.value}>{physical?.hair || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('color', ln)}: </div>
            <div className={styles.value}>{physical?.skinColor || '_____'} </div>
          </div>
          {/* <div className={styles.flex}>
            <div className={styles.key}> {getText('body', ln)}: </div>
            <div className={styles.value}>{physical?.bodyType || '_____'} </div>
          </div> */}
          <div className={styles.flex}>
            <div className={styles.key}> {getText('blood', ln)}: </div>
            <div className={styles.value}>{physical?.blood || '_____'} </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Physical
