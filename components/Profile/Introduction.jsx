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
        <div className={styles.left}>
          <Image
            src='https://images.pexels.com/photos/6208084/pexels-photo-6208084.jpeg?auto=compress&cs=tinysrgb&w=600'
            height='250'
            width='200'
            alt=''
          />
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
            <div className={styles.value}>{profile?.name || '--'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('age', ln)}</div>
            <div className={styles.value}>
              {profile?.bornAt ? calculateAge(profile?.bornAt, ln) : '--'}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('height', ln)}</div>
            <div className={styles.value}>
              {profile?.height ? heightToFeet(profile.height, ln) : '--'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('color', ln)}</div>
            <div className={styles.value}>
              <Ln item={profile?.skinColor || '--'} />{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('body', ln)}</div>
            <div className={styles.value}>
              <Ln item={profile?.body || '--'} />{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('educationType', ln)}</div>
            <div className={styles.value}>
              <Ln item={profile?.educationType || '--'} />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('ocupation', ln)}</div>
            <div className={styles.value}>
              <Ln item={profile?.profession || '--'} />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('location', ln)}</div>
            <div className={styles.value}>
              <Ln item={profile?.city || '--'} /> ||
              <Ln item={profile?.district || '--'} /> ||{' '}
              <Ln item={profile?.upazilla || '--'} />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('piety', ln)}</div>
            <div className={styles.value}>
              <Ln item={profile?.piety || '--'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduction
