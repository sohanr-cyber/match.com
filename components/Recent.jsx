import React from 'react'
import styles from '@/styles/Recent.module.css'
import Card from '@/components/Profile/Card'
import { useRouter } from 'next/router'

const Recent = ({ recent }) => {
  const router = useRouter()
  const ln = router.locale

  return (
    <div className={styles.wrapper}>
      {ln == 'bn' ? (
        <h1 className={styles.heading}>সম্প্রতি তৈরি করা প্রোফাইল সমূহ</h1>
      ) : (
        <h1 className={styles.heading}>Recently Created Profile</h1>
      )}
      <div className={styles.flex}>
        {recent.map((item, index) => (
          <Card key={index} index={index} user={item} />
        ))}
      </div>
    </div>
  )
}

export default Recent
