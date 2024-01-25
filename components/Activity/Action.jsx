import React from 'react'
import styles from '../../styles/Profile/Action.module.css'
const Action = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.flex}>
        <div className={styles.item}>
          <div className={styles.title}>Send Proposal</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Save This Biodata</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Decline This Biodata</div>
        </div>
      </div>
    </div>
  )
}

export default Action
