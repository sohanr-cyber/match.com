import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'

const Expectation = ({ expectation, ln }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>{getText('expectation', ln)} </div>
        <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
          {open ? '-' : '+'}
        </div>
      </div>
      {open && (
        <div className={styles.details}>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('minAge', ln)} : </div>
            <div className={styles.value}>{expectation.minAge || '---'} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('maxAge', ln)} : </div>
            <div className={styles.value}>{expectation.maxAge || '---'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('minHeight', ln)} : </div>
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
            <div className={styles.key}>{getText('maxHeight', ln)}: </div>
            <div className={styles.value}>
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
            <div className={styles.key}>{getText('city', ln)}: </div>
            <div className={styles.value}> any </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('color', ln)}: </div>
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
            <div className={styles.key}> {getText('education', ln)}: </div>
            <div className={styles.value}>
              {expectation.educations.map((item, index) => (
                <span key={index}>{item}&nbsp;</span>
              ))}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('ocupation', ln)}: </div>
            <div className={styles.value}>
              {' '}
              {expectation.professions.map((item, index) => (
                <span key={index}>{item}</span>
              ))}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('pr', ln)}: </div>
            <div className={styles.value}>
              {expectation.description || '---'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Expectation
