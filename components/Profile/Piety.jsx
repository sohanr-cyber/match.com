import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'

const Piety = ({ religion }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>Religiosity</div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>

      {open && (
        <div className={styles.details}>
          <div className={styles.flex}>
            <div className={styles.key}> Times Your Pray: </div>
            <div className={styles.value}>{religion?.prayer || '--'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>
              How many Times You Missed prayer a week :{' '}
            </div>
            <div className={styles.value}>
              {religion?.missingPrayer || '--'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Outfit:</div>
            <div className={styles.value}>{religion?.outfit || '--'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>How is your Recitation Of Quran: </div>
            <div className={styles.value}>
              {religion?.quranRecitation || '--'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>
              write some islamic book you have finished :{' '}
            </div>
            <div className={styles.value}>{religion?.books || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>
              write some of your Islamic Scholars:{' '}
            </div>
            <div className={styles.value}>{religion?.scholars || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Good things about you : </div>
            <div className={styles.value}>{religion?.piety || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Every Day Deeds: </div>
            <div className={styles.value}>{religion?.deeds || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Tell about your interest , hobby</div>
            <div className={styles.value}>{religion?.interest || '---'} </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Piety
