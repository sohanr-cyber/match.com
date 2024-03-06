import React from 'react'
import styles from '../../../styles/Profile/Connection.module.css'
const index = () => {
  const handlePayment = async () => {
    try {
    } catch (error) {}
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.btn} onClick={e => handlePayment}>
        Payment
      </div>
    </div>
  )
}

export default index
