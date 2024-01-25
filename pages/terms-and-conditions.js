import React from 'react'
import { termsAndConditions } from '@/data'
import styles from '../styles/TermsAndConditions.module.css'

const TermsAndConditions = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Terms and Conditions of Use - Islamic Matrimony Site</h2>
      <div className={styles.items}>
        {termsAndConditions.map((item, index) => (
          <div key={index}>
            <div className={styles.title}>
              {index + 1}.&nbsp;{item.split(':')[0]}
            </div>
            <p className={styles.details}>{item.split(':')[1]}</p>
          </div>
        ))}
      </div>
      <p>
        By using this Site, you acknowledge that you have read, understood, and
        agreed to these terms and conditions.
      </p>
    </div>
  )
}

export default TermsAndConditions
