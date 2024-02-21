import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'

const Ecucation = ({ education }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>Education & Career</div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>
      {open && (
        <div className={styles.details}>
          <div className={styles.flex}>
            <div className={styles.key}>Highest Education : </div>
            <div className={styles.value}>{education?.education || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Ocupation: </div>
            <div className={styles.value}>
              {education?.profession || '---'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Annual Income : </div>
            <div className={styles.value}> {education?.income || '---'} </div>
          </div>

          <div className={styles.flex}>
            <div className={styles.key}>Skills : </div>
            <div className={styles.value}> {education?.skills || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>University : </div>
            <div className={styles.value}>{education?.institute || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Universtiy Session : </div>
            <div className={styles.value}>{education?.session || '---'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>SSC/Equivalent </div>
            <div className={styles.value}>{education?.ssc || '---'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>HSC/Equivalent:</div>
            <div className={styles.value}>{education?.hsc || '---'}</div>
          </div>
          
          {education.hons && (
            <div className={styles.flex}>
              <div className={styles.key}>Hons/Equivalent: </div>
              <div className={styles.value}>{education?.hons || '---'}</div>
            </div>
          )}

          {education.masters && (
            <div className={styles.flex}>
              <div className={styles.key}>Master/Equivalent </div>
              <div className={styles.value}>{education?.masters || '---'}</div>
            </div>
          )}

          <div className={styles.flex}>
            <div className={styles.key}>
              Do You Have Intention of Doing Job After Marriage ?{' '}
            </div>
            <div className={styles.value}>{education?.jobAfter || '---'}</div>
          </div>

          <div className={styles.flex}>
            <div className={styles.key}>
              Do You Have Intention of Continuing Study After Marriage ?{' '}
            </div>
            <div className={styles.value}>{education?.studyAfter || '---'}</div>
          </div>


        </div>
      )}
    </div>
  )
}

export default Ecucation
