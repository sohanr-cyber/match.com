import React, { useState } from 'react'
import styles from '@/styles/Profile/Update/Basic.module.css'
import {
  professions,
  skinColors,
  bodyTypes,
  educationTypes,
  educationalStatus,
  institutes,
  sessions,
  maritalStatuses
} from '@/pages/api/auth/data'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import Moment from 'react-moment/dist'
import { getText } from '@/Translation/profile'

const Religion = ({ religion: data, ln }) => {
  const [religion, setReligion] = useState({
    ...data
  })
  const dispatch = useDispatch()
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)

  const update = async () => {
    try {
      dispatch(startLoading())
      const { data } = await axios.put(
        `/api/religion/${router.query.id}`,
        {
          ...religion
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )

      setReligion(data)
      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.left}>
          <span>5</span>
          <div className={styles.title}>{getText('pr', ln)}</div>
        </div>
        {religion.updatedAt && (
          <div className={styles.right}>
            Updated <Moment fromNow>{religion.updatedAt}</Moment>
          </div>
        )}
      </div>
      <form className={styles.formContainer}>
        <div className={styles.field}>
          <label>{getText('outfit', ln)}</label>
          <textarea
            value={religion.outfit}
            onChange={e => setReligion({ ...religion, outfit: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('outfit', ln)}</label>
          <textarea
            value={religion.outfitDate}
            onChange={e =>
              setReligion({ ...religion, outfitDate: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('prayer', ln)} </label>
          <textarea
            value={religion.prayer}
            onChange={e => setReligion({ ...religion, prayer: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('missing', ln)} </label>
          <textarea
            value={religion.missingPrayer}
            onChange={e =>
              setReligion({ ...religion, missingPrayer: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('quran', ln)}</label>
          <textarea
            value={religion.quranRecitation}
            onChange={e =>
              setReligion({ ...religion, quranRecitation: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('mahram', ln)}</label>
          <textarea
            value={religion.mahram}
            onChange={e => setReligion({ ...religion, mahram: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('watch', ln)} </label>
          <textarea
            value={religion.watch}
            onChange={e => setReligion({ ...religion, watch: e.target.value })}
          ></textarea>
        </div>

        <div className={styles.field}>
          <label>{getText('habit', ln)} </label>
          <textarea
            value={religion.badHabit}
            onChange={e =>
              setReligion({ ...religion, badHabit: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('deeds', ln)}</label>
          <textarea
            value={religion.regularDeeds}
            onChange={e =>
              setReligion({ ...religion, regularDeeds: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('books', ln)}</label>
          <textarea
            value={religion.books}
            onChange={e => setReligion({ ...religion, books: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('scholars', ln)} </label>
          <textarea
            value={religion.scholars}
            onChange={e =>
              setReligion({ ...religion, scholars: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('good', ln)} </label>
          <textarea
            value={religion.piety}
            onChange={e => setReligion({ ...religion, piety: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>{getText('interest', ln)} </label>
          <textarea
            value={religion.interest}
            onChange={e =>
              setReligion({ ...religion, interest: e.target.value })
            }
          ></textarea>
        </div>
      </form>
      <div className={styles.save} onClick={() => update()}>
        {getText('save', ln)}
      </div>
    </div>
  )
}

export default Religion
