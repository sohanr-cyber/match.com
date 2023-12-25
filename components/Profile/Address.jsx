import React from "react";
import styles from "../../styles/Profile/Personal.module.css";

const Address = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>Permanent Address</div>
        <div className={styles.toggle}>-</div>
      </div>
      <div className={styles.details}>
        <div className={styles.flex}>
          <div className={styles.key}>City : </div>
          <div className={styles.value}>Rangpur </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>District : </div>
          <div className={styles.value}>Kurigram </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Upazilla : </div>
          <div className={styles.value}>Kurigram </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Address : </div>
          <div className={styles.value}> private</div>
        </div>
      </div>
    </div>
  );
};

export default Address;
