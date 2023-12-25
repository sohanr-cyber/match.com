import React from "react";
import styles from "../styles/RegisterBanner.module.css";

const RegisterBanner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        Why are you waiting for you dream Partner ?{" "}
      </div>
      <div className={styles.right}>
        <div className={styles.btn}>Register Here</div>
      </div>
    </div>
  );
};

export default RegisterBanner;
