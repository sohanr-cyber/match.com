import React from 'react'
import styles from '../../styles/Profile/Introuduction.module.css'
import Image from 'next/image'
import { calculateAge } from '@/utils'
import { educationTypes } from '@/pages/api/auth/data'
import CreateIcon from '@mui/icons-material/Create'
import { useRouter } from 'next/router'
const Introduction = ({ data }) => {
  const router = useRouter()
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
            <div className={styles.id}>{data._id}</div>
            <div className={styles.update}>
              <CreateIcon
                onClick={() => router.push(`/profile/update/${data._id}`)}
              />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Name</div>
            <div className={styles.value}>{data.name}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Age</div>
            <div className={styles.value}>{calculateAge(data.bornAt)}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>height</div>
            <div className={styles.value}>
              {Math.floor(data.height / 12)}&quot;{data.height % 12}&apos;
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Color</div>
            <div className={styles.value}>{data.skinColor} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>BodyType</div>
            <div className={styles.value}>{data.bodyType} </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Type Of Education:</div>
            <div className={styles.value}>{data.educationTypes || '--'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Ocupation</div>
            <div className={styles.value}>{data.profession || '--'}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Location</div>
            <div className={styles.value}>
              {data.city} || {data.district} || {data.upazilla}
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.key}>Piety</div>
            <div className={styles.value}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              veniam praesentium similique tempora accusamus cumque consectetur
              eligendi. Deleniti, aut incidunt deserunt aspernatur recusandae,
              atque perspiciatis cupiditate earum dolorem id exercitationem?
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduction
