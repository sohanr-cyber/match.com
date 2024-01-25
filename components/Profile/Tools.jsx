import React from 'react'
import styles from '../../styles/Profile/Tools.module.css'
const Tools = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.items}>
        <div className={styles.item}>
          <div className={styles.icon}>@</div>
          <div className={styles.title}>Recieved Proposal</div>
        </div>
      </div>
    </div>
  )
}

export default Tools
