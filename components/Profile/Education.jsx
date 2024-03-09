import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'
import Ln from '../utils/Ln'

const Ecucation = ({ education, ln, profile }) => {
  const [open, setOpen] = useState(false)
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
            <div className={styles.key}>{getText('education', ln)} </div>
            <div className={styles.value}>
              <Ln item={education?.education || '_____'} />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('ocupation', ln)} </div>
            <div className={styles.value}>
              <Ln item={education?.profession || '_____'} />{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('income', ln)}</div>
            <div className={styles.value}> {education?.income || '_____'} </div>
          </div>

          <div className={styles.flex}>
            <div className={styles.key}>{getText('skills', ln)} </div>
            <div className={styles.value}> {education?.skills || '_____'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('uni', ln)} </div>
            <div className={styles.value}>
              {education?.institute || '_____'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('session', ln)} </div>
            <div className={styles.value}>{education?.session || '_____'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('ssc', ln)} </div>
            <div className={styles.value}>{education?.ssc || '_____'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('hsc', ln)}</div>
            <div className={styles.value}>{education?.hsc || '_____'}</div>
          </div>

          {education?.hons && (
            <div className={styles.flex}>
              <div className={styles.key}>{getText('hons', ln)}: </div>
              <div className={styles.value}>{education?.hons || '_____'}</div>
            </div>
          )}

          {education?.masters && (
            <div className={styles.flex}>
              <div className={styles.key}>{getText('master', ln)} </div>
              <div className={styles.value}>
                {education?.masters || '_____'}
              </div>
            </div>
          )}

          {profile.gender == 'Female' && (
            <>
              {' '}
              <div className={styles.flex}>
                <div className={styles.key}>{getText('jobAfter', ln)} </div>
                <div className={styles.value}>
                  {education?.jobAfter || '_____'}
                </div>
              </div>
              <div className={styles.flex}>
                <div className={styles.key}>{getText('studyAfter', ln)} </div>
                <div className={styles.value}>
                  {education?.studyAfter || '_____'}
                </div>
              </div>
            </>
          )}

          <div className={styles.flex}>
            <div className={styles.key}>{getText('moreEC', ln)} </div>
            <div className={styles.value}>{education?.more || '_____'}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Ecucation
