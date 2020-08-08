import React from "react";
import styles from "./signin.module.css";
import "./signin.module.css";

const SignIn = ({ onRouteChange }) => {
  return (
    <main className={styles.signInMain}>
      <form className={styles.signInForm}>
        <legend className={styles.signInLegend}>Sign In</legend>
        <div className={styles.signInElementContainer}>
          <label
            className={styles.signInLabel}
            id={styles.signInEmailLabel}
            htmlFor={styles.emailAddress}
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
            htmlFor={styles.password}
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
            <button 
            className={styles.registerButton} 
            id={styles.registerButton}
            onClick={() => onRouteChange("register")}
            >
                Register
            </button>

            <input 
                className={styles.signInButton} 
                id={styles.signInButton}
                type="submit"
                value="Sign in"
                onClick={() => onRouteChange("home")}
                />

        </div>
      </form>
    </main>
  );
};

export default SignIn;
