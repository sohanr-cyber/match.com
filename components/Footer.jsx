import React from "react";
import Logo from "./utils/Logo";
import styles from "../styles/Footer.module.css";
import Image from "next/image";
import CopyrightIcon from "@mui/icons-material/Copyright";
const Footer = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Logo />
          <div className={styles.about}>
            At MuslimMatch.com, we believe in fostering meaningful connections
            grounded in faith, culture, and shared values. Our platform is
            dedicated to helping individuals within the Muslim community find
            their ideal life partners while upholding the principles of Islam.
          </div>
        </div>
        <div className={styles.mid}>
          <h2 className={styles.heading}>Our Site</h2>
          <div className={styles.flex}>
            <div className={styles.link}>Home</div>
            <div className={styles.link}>Search</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.link}>Plans</div>
            <div className={styles.link}>Our Software</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.link}>Privacy Policy</div>
            <div className={styles.link}>Terms & conditions</div>
          </div>
        </div>
        <div className={styles.right}>
          <h2 className={styles.heading}>Contact Us</h2>
          <div className={styles.mail}>
            Mail Us: <span>mail@gmail.com</span>
          </div>
          <div className={styles.call}>
            Call Us: <span>mail@gmail.com</span>
          </div>
          <div className={styles.social__media__links}>
            <Image
              src={"https://cdn-icons-png.flaticon.com/128/5968/5968764.png"}
              width="35"
              height="35"
              alt=""
            />
            <Image
              src={"https://cdn-icons-png.flaticon.com/128/3955/3955024.png"}
              width="35"
              height="35"
              alt=""
            />
            <Image
              src={"https://cdn-icons-png.flaticon.com/128/733/733585.png"}
              width="35"
              height="35"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={styles.rights}>
        <CopyrightIcon />
        2022 All Rights Reserved
      </div>
    </>
  );
};

export default Footer;
