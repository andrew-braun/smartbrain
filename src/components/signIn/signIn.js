import React from "react";
import styles from "./signin.module.css";
import "./signin.module.css";

const SignIn = () => {
  return (
    <main className={styles.signInMain}>
      <form className={styles.signInForm}>
        <legend className={styles.signInLegend}>Sign In </legend>
        <div className={styles.signInElementContainer}>
          <label
            className={styles.signInLabel}
            id={styles.signInEmailLabel}
            for={styles.emailAddress}
          >
            Email
          </label>
          <input
            className={styles.signInInput}
            id={styles.emailAddress}
            type="email"
            placeholder="Enter your email address"
          />
        </div>
        <div className={styles.signInElementContainer}>
          <label
            className={styles.signInLabel}
            id={styles.signInPasswordLabel}
            for={styles.password}
          >
            Password
          </label>
          <input 
            className={styles.signInInput} 
            id={styles.password} 
            placeholder="Enter your password"
          />
        </div>
        
        <div className={styles.signInElementContainer}>
            <a href="#0" className={styles.signUpButton} id={styles.signUpButton}>
                Register
            </a>
            <a href="#0" className={styles.signInButton} id={styles.signInButton}>
                Sign In
            </a>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
