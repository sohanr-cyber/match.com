import React from 'react'
import styles from '../../styles/Profile/Personal.module.css'

const Expectation = ({ expectation }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>Expectation From Your Partner </div>
        <div className={styles.toggle}>-</div>
      </div>
      <div className={styles.details}>
        <div className={styles.flex}>
          <div className={styles.key}>Min Age : </div>
          <div className={styles.value}>{expectation.minAge || '---'} </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Max Age : </div>
          <div className={styles.value}>{expectation.maxAge || '---'}</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Min Height : </div>
          <div className={styles.value}>
            {' '}
            {expectation?.minHeight ? (
              <>
                {' '}
                {Math.floor(expectation.minHeight / 12)}&quot;
                {expectation.minHeight % 12}&apos;
              </>
            ) : (
              '--'
            )}{' '}
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Max Height: </div>
          <div className={styles.value}>
            {' '}
            {expectation?.maxHeight ? (
              <>
                {' '}
                {Math.floor(expectation.maxHeight / 12)}&quot;
                {expectation.maxHeight % 12}&apos;
              </>
            ) : (
              '--'
            )}{' '}
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>city: </div>
          <div className={styles.value}> any </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>complexion: </div>
          <div className={styles.value}>
            {' '}
            {['white', 'brown'].map((i, index) => (
              <span key={index} style={{ margin: '0 10px 0 0 ' }}>
                {i}
              </span>
            ))}{' '}
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}> Education: </div>
          <div className={styles.value}>
            {expectation.educations.map((item, index) => (
              <span key={index}>{item}&nbsp;</span>
            ))}
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}> profession: </div>
          <div className={styles.value}>
            {' '}
            {expectation.professions.map((item, index) => (
              <span key={index}>{item}</span>
            ))}{' '}
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}> Religion: </div>
          <div className={styles.value}>{expectation.description || '---'}</div>
        </div>
      </div>
    </div>
  )
}

export default Expectation
