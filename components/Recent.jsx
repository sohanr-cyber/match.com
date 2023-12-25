import React from 'react'
import styles from '@/styles/Recent.module.css'
import Card from '@/components/Profile/Card'

const Recent = ({ recent }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Recently Created Profile</h1>
      <div className={styles.flex}>
        {recent.map((item, index) => (
          <Card key={index} index={index} user={item} />
        ))}
      </div>
    </div>
  )
}

export default Recent
