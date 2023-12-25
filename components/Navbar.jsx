import React, { useState } from "react";
import styles from "./../styles/Navbar.module.css";
import Logo from "./utils/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  const [phone, setPhone] = useState();

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.items}>
        <div className={styles.item} onClick={() => router.push("/")}>
          Home
        </div>
        <div className={styles.item}>Search</div>
        <div className={styles.item}>Plans</div>
        <div className={styles.item}>Contact Us</div>
      </div>
      <div className={styles.right}>
        <div className={styles.item} onClick={() => router.push("/login")}>
          Sign In
        </div>
      </div>
      <div className={styles.menu}>
        <MenuIcon onClick={() => setPhone(true)} />
      </div>

      {phone && (
        <div className={styles.mobile__nav}>
          <div className={styles.menu}>
            <CloseIcon onClick={() => setPhone(false)} />
          </div>
          <div className={styles.items}>
            <div className={styles.item}>Home</div>
            <div className={styles.item}>Search</div>
            <div className={styles.item}>Plans</div>
            <div className={styles.item}>Contact Us</div>
          </div>
          <div className={styles.right}>
            <div className={styles.item}>Sign In</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
