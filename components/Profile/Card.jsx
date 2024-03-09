import React from 'react'
import styles from '../../styles/Profile/Card.module.css'
import {
  calculateAge,
  colorsWithTransparency,
  englishToBangla,
  heightToFeet
} from '@/utils'
import faker from 'faker'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { useRouter } from 'next/router'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector } from 'react-redux'
import { getText } from '@/Translation/profile'
import Ln from '../utils/Ln'

const Card = ({ user, index, handleLike }) => {
  const router = useRouter()
  const userInfo = useSelector(state => state.user.userInfo)
  const ln = router.locale
  return (
    <div
      className={styles.container}
      style={{
        background: `linear-gradient(45deg,${
          colorsWithTransparency[index]
        },${faker.random.arrayElement(colorsWithTransparency)})`
      }}
    >
      <div
        className={styles.container__wrapper}
        onClick={() => router.push(`/profile/${user._id}`)}
      >
        <div className={styles.top}>
          <div
            className={styles.pic}
            style={
              user?.gender == 'Male'
                ? {
                    backgroundColor: `${colorsWithTransparency[index]}`,
                    boxShadow: `0 6px 22px 0 ${colorsWithTransparency[index]})`
                  }
                : {
                    backgroundColor: `${colorsWithTransparency[index]}`,
                    boxShadow: `0 6px 22px 0 ${colorsWithTransparency[index]})`
                  }
            }
          >
            {user?.gender == 'Male' ? (
              <div style={{ color: 'green', zIndex: '1' }}>M</div>
            ) : (
              <div style={{ color: 'rgb(0, 183, 255)', zIndex: '1' }}>F</div>
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('age', ln)}:</div>
            <div className={styles.value}>
              {user?.bornAt ? calculateAge(user?.bornAt, ln) : '_____'}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('height', ln)}:</div>
            <div className={styles.value}>
              {user?.height ? <>{heightToFeet(user.height, ln)}</> : '_____'}{' '}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('color', ln)}:</div>
            <div className={styles.value}>
              <Ln item={user?.skinColor || '_____'} />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('bodyType', ln)}:</div>
            <div className={styles.value}>
              {' '}
              <Ln item={user?.bodyType || '_____'} />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>{getText('ocupation', ln)}:</div>
            <div className={styles.value}>
              {' '}
              <Ln item={user?.profession || '_____'} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.interactions}>
        <div
          className={styles.likes}
          onClick={() => handleLike && handleLike()}
        >
          <div className={styles.icon}>
            {user?.saverIds?.find(i => i == userInfo?.id) ? (
              <FavoriteIcon style={{ fontSize: '140%', color: 'red' }} />
            ) : (
              <FavoriteBorderIcon style={{ fontSize: '140%' }} />
            )}
          </div>
          <div className={styles.count}>
            {user?.saverIds ? englishToBangla(user.saverIds.length,ln) : 0}
          </div>
        </div>
        <div className={styles.dislikes}>
          <div className={styles.icon}>
            <ThumbDownOffAltIcon style={{ fontSize: '140%' }} />
          </div>
          <div className={styles.count}>{englishToBangla('0',ln)}</div>
        </div>
        <div className={styles.clicks}>
          <div className={styles.icon}>
            <RemoveRedEyeIcon style={{ fontSize: '140%' }} />
          </div>
          <div className={styles.count}>
            {user?.click ? englishToBangla(user.click, ln) : 0}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
