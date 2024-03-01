import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'

const Piety = ({ religion, ln }) => {
  const [open, setOpen] = useState(true)
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
            <div className={styles.key}> {getText('prayer', ln)}: </div>
            <div className={styles.value}>{religion?.prayer || '--'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('missing', ln)} : </div>
            <div className={styles.value}>
              {religion?.missingPrayer || '--'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('outfit', ln)}:</div>
            <div className={styles.value}>{religion?.outfit || '--'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('quran', ln)}: </div>
            <div className={styles.value}>
              {religion?.quranRecitation || '--'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('books', ln)} : </div>
            <div className={styles.value}>{religion?.books || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('scholars', ln)}: </div>
            <div className={styles.value}>{religion?.scholars || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('habit', ln)}: </div>
            <div className={styles.value}>{religion?.scholars || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('mahram', ln)}: </div>
            <div className={styles.value}>{religion?.mahram || '---'} </div>
          </div>

          <div className={styles.flex}>
            <div className={styles.key}>
              Are You Connected to any Job Related Your Religion?:{' '}
            </div>
            <div className={styles.value}>{religion?.scholars || '---'} </div>
          </div>

          <div className={styles.flex}>
            <div className={styles.key}> {getText('good', ln)}: </div>
            <div className={styles.value}>{religion?.piety || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('deeds', ln)}: </div>
            <div className={styles.value}>{religion?.deeds || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('interest', ln)}</div>
            <div className={styles.value}>{religion?.interest || '---'} </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Piety
