import React, { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
const backgrounds = [
  "https://images.pexels.com/photos/306066/pexels-photo-306066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/931796/pexels-photo-931796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/1021076/pexels-photo-1021076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

import Box from "./utils/Box";

const Header = ({ data }) => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundIndex, backgrounds.length]);
  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundImage: `url("${backgrounds[backgroundIndex]}")`,
        backgroundPosition: "fill",
      }}
    >
      <div className={styles.surface}></div>
      <h1 className={styles.heading1}>
        find a religious partner of your choice
      </h1>
      <p>we made it easy for you to get your life partner in your location </p>
      <Box data={data} />
    </div>
  );
};

export default Header;
