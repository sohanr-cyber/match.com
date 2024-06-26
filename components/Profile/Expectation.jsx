import React, { useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'
import { englishToBangla, heightToFeet } from '@/utils'
import Ln from '../utils/Ln'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const Expectation = ({ expectation, ln, myProfile }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>{getText('expectation', ln)} </div>
        <div className={styles.flex}>
          {myProfile && (
            <div
              className={styles.updateIcon}
              onClick={() =>
                router.push(
                  `/profile/update/${router.query.id}?update=expectation`
                )
              }
            >
              <EditNoteIcon />
            </div>
          )}

          <div className={styles.toggle} onClick={() => setOpen(prev => !prev)}>
            {open ? '-' : '+'}
          </div>
        </div>
      </div>

      {open && (
        <div className={styles.details}>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('minAge', ln)} : </div>
            <div className={styles.value}>
              {expectation.minAge
                ? englishToBangla(expectation.minAge)
                : '_____'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('maxAge', ln)} : </div>
            <div className={styles.value}>
              {expectation.maxAge
                ? englishToBangla(expectation.maxAge)
                : '_____'}{' '}
            </div>{' '}
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('minHeight', ln)} : </div>
            <div className={styles.value}>
              {expectation.minHeight
                ? heightToFeet(expectation.minHeight, ln)
                : '_____'}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('maxHeight', ln)}: </div>
            <div className={styles.value}>
              {expectation.maxHeight
                ? heightToFeet(expectation.maxHeight, ln)
                : '_____'}
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
                  <Ln item={i} />{' '}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('education', ln)}: </div>
            <div className={styles.value}>
              {expectation.educations.map((item, index) => (
                <span key={index}>
                  <Ln item={item} /> &nbsp;
                </span>
              ))}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('ocupation', ln)} </div>
            <div className={styles.value}>
              {' '}
              {expectation.professions.map((item, index) => (
                <span key={index}>{item} &nbsp;</span>
              ))}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('pr', ln)}: </div>
            <div className={styles.value}>
              {expectation.description || '_____'}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('moreE', ln)} </div>
            <div className={styles.value}>{expectation.more || '_____'}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Expectation
