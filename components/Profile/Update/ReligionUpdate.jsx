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

const Religion = ({ religion: data }) => {
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
          <div className={styles.title}>Personal & Religion</div>
        </div>
        {religion.updatedAt && (
          <div className={styles.right}>
            Updated <Moment fromNow>{religion.updatedAt}</Moment>
          </div>
        )}
      </div>
      <form className={styles.formContainer}>
        <div className={styles.field}>
          <label>Whate are the Outfit outside your home ?</label>
          <textarea
            value={religion.outfit}
            onChange={e => setReligion({ ...religion, outfit: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>How long have you been wearing this outfit ?</label>
          <textarea
            value={religion.outfitDate}
            onChange={e =>
              setReligion({ ...religion, outfitDate: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>
            Do You pray 5 times a day ? How long have you been doing so ?
          </label>
          <textarea
            value={religion.prayer}
            onChange={e => setReligion({ ...religion, prayer: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>how many times you miss prayer a week normally ? </label>
          <textarea
            value={religion.missingPrayer}
            onChange={e =>
              setReligion({ ...religion, missingPrayer: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>How is your recitation of quran? </label>
          <textarea
            value={religion.quranRecitation}
            onChange={e =>
              setReligion({ ...religion, quranRecitation: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>Do You Maintain Mahram Non-Mahram? </label>
          <textarea
            value={religion.mahram}
            onChange={e => setReligion({ ...religion, mahram: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>Do You Watch Movie / Tv Serial ? </label>
          <textarea
            value={religion.watch}
            onChange={e => setReligion({ ...religion, watch: e.target.value })}
          ></textarea>
        </div>

        <div className={styles.field}>
          <label>Do You have Bad Habit of Drug(i.e smoking) ? </label>
          <textarea
            value={religion.badHabit}
            onChange={e =>
              setReligion({ ...religion, badHabit: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>
            Beside Fardh Deeds , Do you have any Nafle/Sunnah Deeds that you
            never miss at least for 6 months.
          </label>
          <textarea
            value={religion.regularDeeds}
            onChange={e =>
              setReligion({ ...religion, regularDeeds: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>write some islamic book you have read ? </label>
          <textarea
            value={religion.books}
            onChange={e => setReligion({ ...religion, books: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>write some of your favourite schoolar ? </label>
          <textarea
            value={religion.scholars}
            onChange={e =>
              setReligion({ ...religion, scholars: e.target.value })
            }
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>
            write something about you piety / good things about you?{' '}
          </label>
          <textarea
            value={religion.piety}
            onChange={e => setReligion({ ...religion, piety: e.target.value })}
          ></textarea>
        </div>
        <div className={styles.field}>
          <label>write something about your interest , hoby , dream? </label>
          <textarea
            value={religion.interest}
            onChange={e =>
              setReligion({ ...religion, interest: e.target.value })
            }
          ></textarea>
        </div>
      </form>
      <div className={styles.save} onClick={() => update()}>
        Save
      </div>
    </div>
  )
}

export default Religion
