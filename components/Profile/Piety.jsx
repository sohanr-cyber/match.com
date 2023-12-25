import React from "react";
import styles from "../../styles/Profile/Personal.module.css";

const Piety = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.title}>Religiosity</div>
        <div className={styles.toggle}>-</div>
      </div>
      <div className={styles.details}>
        <div className={styles.flex}>
          <div className={styles.key}> Times Your Pray: </div>
          <div className={styles.value}>- </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>
            How many Times You Missed prayer a week :{" "}
          </div>
          <div className={styles.value}>0 </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Outfit:</div>
          <div className={styles.value}>
            {" "}
            Borkha , Niqab , covering face , hand , feet{" "}
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>How is your Recitation Of Quran: </div>
          <div className={styles.value}> </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>
            write some islamic book you have finished :{" "}
          </div>
          <div className={styles.value}>
            The Quran and Moon , Gog and Magoog , Tazkiya , Rahitul Makhtum{" "}
          </div>
        </div>
        <div className={styles.flex}>
          <div className={styles.key}>Every Day Deeds: </div>
          <div className={styles.value}>
            Reciting Quran , Study Hadidth , Hearing Islamic Lecture
          </div>
        </div>
      </div>
    </div>
  );
};

export default Piety;
