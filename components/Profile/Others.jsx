import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'

const Others = ({ data, ln }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>{getText('others', ln)}</div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>
      {open && (
        <div className={styles.details}>
          <div className={styles.flex}>
            <div className={styles.key}>
              {getText('InterestedInDivorced', ln)}
            </div>
            <div className={styles.value}>
              {data?.categories?.find(i => i == 'InterestedInDivorced')
                ? getText('yes', ln)
                : getText('no', ln)}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>
              {getText('InterestedInDivorcedChild', ln)}
            </div>
            <div className={styles.value}>
              {' '}
              {data?.categories?.find(i => i == 'InterestedInDivorcedChild')
                ? getText('yes', ln)
                : getText('no', ln)}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('student', ln)}</div>
            <div className={styles.value}>
              {data?.categories?.find(i => i == 'Student')
                ? getText('yes', ln)
                : getText('no', ln)}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('studentWithJob', ln)}</div>
            <div className={styles.value}>
              {' '}
              {data?.categories?.find(i => i == 'StudentWithJob')
                ? getText('yes', ln)
                : getText('no', ln)}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('polynomy', ln)}</div>
            <div className={styles.value}>
              {data?.categories?.find(i => i == 'SecondWife')
                ? getText('yes', ln)
                : getText('no', ln)}
            </div>
          </div>

          <div className={styles.flex}>
            <div className={styles.key}>
              {' '}
              {getText('interestedInEmigrant', ln)}
            </div>
            <div className={styles.value}>
              {' '}
              {data?.categories?.find(i => i == 'InterestedInEmigrant')
                ? getText('yes', ln)
                : getText('no', ln)}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('emigrant', ln)}</div>
            <div className={styles.value}>
              {data?.categories?.find(i => i == 'Emigrant')
                ? getText('yes', ln)
                : getText('no', ln)}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('orphan', ln)}</div>
            <div className={styles.value}>
              {data?.categories?.find(i => i == 'Orphan')
                ? getText('yes', ln)
                : getText('no', ln)}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('autism', ln)}</div>
            <div className={styles.value}>
              {data?.categories?.find(i => i == 'Autism')
                ? getText('yes', ln)
                : getText('no', ln)}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('nulliparous', ln)}</div>
            <div className={styles.value}>
              {data?.categories?.find(i => i == 'Nulliparous')
                ? getText('yes', ln)
                : getText('no', ln)}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('newMuslim', ln)}</div>
            <div className={styles.value}>
              {data?.categories?.find(i => i == 'NewMuslim')
                ? getText('yes', ln)
                : getText('no', ln)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Others
