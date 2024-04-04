import React, { useEffect, useState } from 'react'
import styles from '../../styles/Profile/Introuduction.module.css'
import Image from 'next/image'
import { calculateAge, heightToFeet } from '@/utils'
import { educationTypes } from '@/pages/api/auth/data'
import CreateIcon from '@mui/icons-material/Create'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import axios from 'axios'
import { finishLoading, startLoading } from '@/redux/stateSlice'
import { getText } from '@/Translation/profile'
import Ln from '../utils/Ln'
const Introduction = ({ data: profile, ln }) => {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const [isClient, setIsClient] = useState(false)
  const dispatch = useDispatch()
  const [saverIds, setSaverIds] = useState(profile?.saverIds)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    setSaverIds(profile?.saverIds)
  }, [router.query.id])

  const saveProfile = async () => {
    try {
      if (!userInfo) {
        router.push('/login')
      }
      dispatch(startLoading())
      const { data } = await axios.put(
        '/api/user',
        {
          savedId: router.query.id
        },
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
      )
      setSaverIds(data.staredUser.saverIds)

      dispatch(finishLoading())
    } catch (error) {
      dispatch(finishLoading())
      console.log(error)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <div
          className={styles.left}
          style={
            profile.gender == 'Male'
              ? {
                  backgroundImage:
                    'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
                  color: 'white'
                }
              : {
                  backgroundImage:
                    'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
                  color: 'black'
                }
          }
        >
          {profile.gender == 'Male' ? 'M' : 'F'}
        </div>
        <div className={styles.right}>
          <div className={styles.top}>
            <div className={styles.id}>{profile?._id}</div>
            {isClient && (
              <div className={styles.action}>
                {router.query.id != userInfo?.id && (
                  <div className={styles.icon} onClick={() => saveProfile()}>
                    {saverIds?.find(i => i == userInfo?.id) ? (
                      <FavoriteIcon style={{ color: 'red' }} />
                    ) : (
                      <FavoriteBorderIcon style={{ color: 'red' }} />
                    )}
                  </div>
                )}
                {userInfo?.id == router.query.id && (
                  <div className={styles.icon}>
                    <CreateIcon
                      style={{ color: 'green' }}
                      onClick={() =>
                        router.push(`/profile/update/${profile._id}`)
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('name', ln)}</div>
            <div className={styles.value}>{profile?.name || '_____'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('gender', ln)}</div>
            <div className={styles.value}>{profile?.gender || '_____'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('age', ln)}</div>
            <div className={styles.value}>
              {profile?.bornAt ? calculateAge(profile?.bornAt, ln) : '_____'}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('height', ln)}</div>
            <div className={styles.value}>
              {profile?.height ? heightToFeet(profile.height, ln) : '_____'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('color', ln)}</div>
            <div className={styles.value}>
              <Ln item={profile?.skinColor || '_____'} />{' '}
            </div>
          </div>
          {/* <div className={styles.flex}>
            <div className={styles.key}>{getText('body', ln)}</div>
            <div className={styles.value}>
              <Ln item={profile?.body || '_____'} />{' '}
            </div>
          </div> */}
          <div className={styles.flex}>
            <div className={styles.key}>{getText('educationType', ln)}</div>
            <div className={styles.value}>
              <Ln item={profile?.educationType || '_____'} />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('ocupation', ln)}</div>
            <div className={styles.value}>
              <Ln item={profile?.profession || '_____'} />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('location', ln)}</div>
            <div className={styles.value}>
              <Ln item={profile?.city || '_____'} /> ||
              <Ln item={profile?.district || '_____'} /> ||{' '}
              <Ln item={profile?.upazilla || '_____'} />
            </div>
          </div>
          {/* <div className={styles.flex}>
            <div className={styles.key}>{getText('piety', ln)}</div>
            <div className={styles.value}>
              <Ln item={profile?.piety || '_____'} />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Introduction
