import React from "react";
import styles from "../../styles/Profile/Personal.module.css";

const Expectation = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>Expectation From Your Partner </div>
        <div className={styles.toggle}>-</div>
      </div>
      <div className={styles.details}>
        <div className={styles.flex}>
          <div className={styles.key}>Min Age : </div>
          <div className={styles.value}>18 </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Max Age : </div>
          <div className={styles.value}>26</div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Min Height : </div>
          <div className={styles.value}>- </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Max Height: </div>
          <div className={styles.value}> - </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>city: </div>
          <div className={styles.value}> any </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>complexion: </div>
          <div className={styles.value}>
            {" "}
            {["white", "brown"].map((i, index) => (
              <span key={index} style={{ margin: "0 10px 0 0 " }}>
                {i}
              </span>
            ))}{" "}
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}> Education: </div>
          <div className={styles.value}> any </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}> profession: </div>
          <div className={styles.value}> any </div>
        </div>
      </div>
    </div>
  );
};

export default Expectation;
