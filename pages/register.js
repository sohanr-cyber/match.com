import React from "react";
import styles from "../styles/Signin.module.css";
import Logo from "@/components/utils/Logo";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const Login = () => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.form__container}>
          <div className={styles.flex}>
            <div className={styles.left} onClick={() => router.push("/login")}>
              Login
            </div>{" "}
            <div
              className={styles.right}
              style={{ borderBottom: "2px solid blue" }}
              onClick={() => router.push("/register")}
            >
              Signup
            </div>
          </div>
          <form>
            <input type="text" placeholder="Enter Your  Name" />
            <input type="email" placeholder="Enter Your Email" />
            <input type="password" placeholder="Enter Your Password" />
          </form>
          <div className={styles.btn}>Login</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
