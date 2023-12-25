import React from 'react'
import styles from '../../styles/Profile/Card.module.css'
import { calculateAge, colorsWithTransparency } from '@/utils'
import faker from 'faker'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { useRouter } from 'next/router'
const Card = ({ user, index }) => {
  const router = useRouter()

  return (
    <div
      className={styles.container}
      style={{
        background: `linear-gradient(45deg,${
          colorsWithTransparency[index]
        },${faker.random.arrayElement(colorsWithTransparency)})`
      }}
      onClick={() => router.push(`/profile/${user._id}`)}
    >
      <div className={styles.top}>
        <div
          className={styles.pic}
          style={
            user?.gender == 'Male'
              ? {
                  backgroundColor: `${colorsWithTransparency[index]}`
                }
              : {
                  backgroundColor: `${colorsWithTransparency[index]}`
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
          <div className={styles.key}>Age:</div>
          <div className={styles.value}>{calculateAge(user?.bornAt)}</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Height:</div>
          <div className={styles.value}>
            {Math.floor(user?.height / 12)}&quot;{user?.height % 12}&apos;
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Color:</div>
          <div className={styles.value}>{user?.skinColor} </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Body:</div>
          <div className={styles.value}>{user?.bodyType}</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Ocupation:</div>
          <div className={styles.value}>{user?.profession}</div>
        </div>

        <div className={styles.interactions}>
          <div className={styles.likes}>
            <div className={styles.icon}>
              <FavoriteBorderIcon style={{ fontSize: '140%' }} />
            </div>
            <div className={styles.count}>12</div>
          </div>
          <div className={styles.dislikes}>
            <div className={styles.icon}>
              <ThumbDownOffAltIcon style={{ fontSize: '140%' }} />
            </div>
            <div className={styles.count}>23</div>
          </div>
          <div className={styles.clicks}>
            <div className={styles.icon}>
              <RemoveRedEyeIcon style={{ fontSize: '140%' }} />
            </div>
            <div className={styles.count}>12k</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
