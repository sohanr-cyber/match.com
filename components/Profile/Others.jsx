import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'

const Others = ({ data }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>Others</div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>
      {open && (
        <div className={styles.details}>
          <div className={styles.flex}>
            <div className={styles.key}>
              Interested in Marrying Divorced Individuals?{' '}
            </div>
            <div className={styles.value}>
              {' '}
              {data?.categories?.find(i => i == 'InterestedInDivorced')
                ? 'Yes'
                : 'No'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>
              Interested in Marrying Divorced Individuals having Having
              Children?:{' '}
            </div>
            <div className={styles.value}>
              {' '}
              {data?.categories?.find(i => i == 'InterestedInDivorcedChild')
                ? 'Yes'
                : 'No'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>
              Interested in Marrying Student/Job Seeker?{' '}
            </div>
            <div className={styles.value}>
              {data?.categories?.find(i => i == 'Student')
                ? 'Yes'
                : 'No'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>
              {' '}
              Interested in Marrying Student/Job Seeker Having Some Income?{' '}
            </div>
            <div className={styles.value}>
              {' '}
              {data?.categories?.find(i => i == 'StudentWithJob')
                ? 'Yes'
                : 'No'}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Interested in Polynomy? </div>
            <div className={styles.value}>
              {data?.categories?.find(i => i == 'SecondWife')
                ? 'Yes'
                : 'No'}{' '}
            </div>
          </div>

          <div className={styles.flex}>
            <div className={styles.key}>Interested in Emigrant? </div>
            <div className={styles.value}>
              {' '}
              {data?.categories?.find(i => i == 'InterestedInEmigrant')
                ? 'Yes'
                : 'No'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Are You Emigrant? </div>
            <div className={styles.value}>
              {' '}
              {data?.categories?.find(i => i == 'Emigrant') ? 'Yes' : 'No'}{' '}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Others
