import React from 'react'
import Card from './Card'
import styles from '../../styles/Profile/Similar.module.css'

const Similar = ({ similar }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Similar Profile</div>
      <div className={styles.cards}>
        {similar.map((item, index) => (
          <Card key={index} user={item} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Similar
