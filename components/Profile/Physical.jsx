import React from 'react'
import styles from '../../styles/Profile/Personal.module.css'

const Physical = ({ physical }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>Physical Attributes</div>
        <div className={styles.toggle}>-</div>
      </div>
      <div className={styles.details}>
        <div className={styles.flex}>
          <div className={styles.key}>Height : </div>
          <div className={styles.value}>
            {physical?.height ? (
              <>
                {' '}
                {Math.floor(physical.height / 12)}&quot;{physical.height % 12}
                &apos;
              </>
            ) : (
              '--'
            )}{' '}
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Weight : </div>
          <div className={styles.value}>{physical?.mass || '--'} KG </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Hair Color : </div>
          <div className={styles.value}>{physical?.hair || '--'} </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Complextion : </div>
          <div className={styles.value}>{physical?.skinColor || '--'} </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Body Type : </div>
          <div className={styles.value}>{physical?.bodyType || '--'} </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Blood Group : </div>
          <div className={styles.value}>{physical?.blood || '--'} </div>
        </div>
      </div>
    </div>
  )
}

export default Physical
