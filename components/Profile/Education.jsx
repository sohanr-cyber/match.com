import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'

const Ecucation = ({ education, ln }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>{getText('ec', ln)}</div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>
      {open && (
        <div className={styles.details}>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('education', ln)} : </div>
            <div className={styles.value}>{education?.education || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('ocupation', ln)} : </div>
            <div className={styles.value}>
              {education?.profession || '---'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('income', ln)}: </div>
            <div className={styles.value}> {education?.income || '---'} </div>
          </div>

          <div className={styles.flex}>
            <div className={styles.key}>{getText('skills', ln)} : </div>
            <div className={styles.value}> {education?.skills || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('uni', ln)} : </div>
            <div className={styles.value}>{education?.institute || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('session', ln)} : </div>
            <div className={styles.value}>{education?.session || '---'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('ssc', ln)} </div>
            <div className={styles.value}>{education?.ssc || '---'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('hsc', ln)}:</div>
            <div className={styles.value}>{education?.hsc || '---'}</div>
          </div>

          {education.hons && (
            <div className={styles.flex}>
              <div className={styles.key}>{getText('hons', ln)}: </div>
              <div className={styles.value}>{education?.hons || '---'}</div>
            </div>
          )}

          {education.masters && (
            <div className={styles.flex}>
              <div className={styles.key}>{getText('master', ln)} </div>
              <div className={styles.value}>{education?.masters || '---'}</div>
            </div>
          )}

          <div className={styles.flex}>
            <div className={styles.key}>{getText('jobAfter', ln)} </div>
            <div className={styles.value}>{education?.jobAfter || '---'}</div>
          </div>

          <div className={styles.flex}>
            <div className={styles.key}>{getText('studyAfter', ln)} </div>
            <div className={styles.value}>{education?.studyAfter || '---'}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Ecucation
