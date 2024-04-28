import React, { useEffect, useState } from 'react'
import styles from '../../styles/Profile/Personal.module.css'
import { getText } from '@/Translation/profile'
import { heightToFeet } from '@/utils'
import { isPhysicalValid } from '@/utility/validator'
import EditNoteIcon from '@mui/icons-material/EditNote'
import { useRouter } from 'next/router'

const Physical = ({ physical, ln, myProfile }) => {
  const [open, setOpen] = useState(false)
  const [red, setRed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isPhysicalValid(physical)) {
      setRed(true)
    }
  }, [physical])

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading} style={red ? { background: 'red' } : {}}>
        <div className={styles.title}>{getText('pa', ln)}</div>
        <div className={styles.flex}>
          {myProfile && (
            <div
              className={styles.updateIcon}
              onClick={() =>
                router.push(
                  `/profile/update/${router.query.id}?update=physical`
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
            <div className={styles.key}> {getText('height', ln)}: </div>
            <div className={styles.value}>
              {physical?.height ? heightToFeet(physical.height, ln) : '_____'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}> {getText('weight', ln)}: </div>
            <div className={styles.value}>{physical?.mass || '_____'} KG </div>
          </div>
          {/* <div className={styles.flex}>
            <div className={styles.key}> {getText('hair', ln)}: </div>
            <div className={styles.value}>{physical?.hair || '_____'} </div>
          </div> */}
          <div className={styles.flex}>
            <div className={styles.key}> {getText('color', ln)}: </div>
            <div className={styles.value}>
              {physical?.skinColor || '_____'}{' '}
            </div>
          </div>
          {/* <div className={styles.flex}>
            <div className={styles.key}> {getText('body', ln)}: </div>
            <div className={styles.value}>{physical?.bodyType || '_____'} </div>
          </div> */}
          <div className={styles.flex}>
            <div className={styles.key}> {getText('blood', ln)}: </div>
            <div className={styles.value}>{physical?.blood || '_____'} </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Physical
