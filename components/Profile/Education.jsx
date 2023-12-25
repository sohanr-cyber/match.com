import React from "react";
import styles from "../../styles/Profile/Personal.module.css";

const Ecucation = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>Education & Career</div>
        <div className={styles.toggle}>-</div>
      </div>
      <div className={styles.details}>
        <div className={styles.flex}>
          <div className={styles.key}>Highest Education : </div>
          <div className={styles.value}>HSC </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Ocupation: </div>
          <div className={styles.value}>Student </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Annual Income : </div>
          <div className={styles.value}> - </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>University : </div>
          <div className={styles.value}>National University </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Universtiy Session : </div>
          <div className={styles.value}>2019-20 </div>
        </div>
      </div>
    </div>
  );
};

export default Ecucation;
