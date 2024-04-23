import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'
import { isPersonalValid } from '@/utility/validator'

const Piety = ({ religion, ln }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.heading}
        style={!isPersonalValid(religion) ? { background: 'red' } : {}}
      >
        <div className={styles.title}>{getText('pr', ln)}</div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>

      {open && (
        <div className={styles.details}>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('prayer', ln)} </div>
            <div className={styles.value}>{religion?.prayer || '_____'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('missing', ln)} </div>
            <div className={styles.value}>
              {religion?.missingPrayer || '_____'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('outfit', ln)}:</div>
            <div className={styles.value}>{religion?.outfit || '_____'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('quran', ln)} </div>
            <div className={styles.value}>
              {religion?.quranRecitation || '_____'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('books', ln)} </div>
            <div className={styles.value}>{religion?.books || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('scholars', ln)}: </div>
            <div className={styles.value}>{religion?.scholars || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('habit', ln)} </div>
            <div className={styles.value}>{religion?.scholars || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('mahram', ln)} </div>
            <div className={styles.value}>{religion?.mahram || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('mahr', ln)}</div>
            <div className={styles.value}>{religion?.mahr || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('dowry', ln)}</div>
            <div className={styles.value}>{religion?.dowry || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('sunnah', ln)}</div>
            <div className={styles.value}>{religion?.sunnah || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('good', ln)} </div>
            <div className={styles.value}>{religion?.piety || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('deeds', ln)}: </div>
            <div className={styles.value}>{religion?.deeds || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('interest', ln)}</div>
            <div className={styles.value}>{religion?.interest || '_____'} </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Piety
