import React from "react";
import styles from "../../styles/Profile/Personal.module.css";

const Physical = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>Physical Attributes</div>
        <div className={styles.toggle}>-</div>
      </div>
      <div className={styles.details}>
        <div className={styles.flex}>
          <div className={styles.key}>Height : </div>
          <div className={styles.value}>5 </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Weight : </div>
          <div className={styles.value}>58kg </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Hair Color : </div>
          <div className={styles.value}>Black </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Complextion : </div>
          <div className={styles.value}>Fair </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Body Type : </div>
          <div className={styles.value}>Slim </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Blood Group : </div>
          <div className={styles.value}>B+ </div>
        </div>
      </div>
    </div>
  );
};

export default Physical;
