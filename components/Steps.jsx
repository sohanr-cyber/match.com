import React from "react";
import styles from "../styles/Steps.module.css";
import Image from "next/image";

const steps = [
  {
    title: "Create Your Profile",
    description: "Create your profile with required data",
    image: "https://cdn-icons-png.flaticon.com/128/1057/1057240.png",
  },
  {
    title: "Search Your Partner",
    description: "Browse to search your partner",
    image: "https://cdn-icons-png.flaticon.com/128/9800/9800545.png",
  },
  {
    title: "Start Communication",
    description: "Start communicating by sending proposal",
    image: "https://cdn-icons-png.flaticon.com/128/1653/1653630.png",
  },
];
const Steps = () => {
  return (
    <div className={styles.wrapper}>
      <h1>How You can coneect with us</h1>
      <p>get started in 3 easy steps</p>
      <div className={styles.flex}>
        {steps.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.image__container}>
              <Image src={item.image} width={"70"} height={"70"} alt="" />
            </div>
            <div className={styles.rightItem}>
              {" "}
              <div className={styles.title}>{item.title}</div>
              <div className={styles.description}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
