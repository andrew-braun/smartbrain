import React from "react";
import styles from "./register.module.css";
import "./register.module.css";

const Register = ({ onRouteChange }) => {
  return (
    <main className={styles.registerMain}>
      <form className={styles.registrationForm}>
        <legend className={styles.registerLegend}>Register</legend>
        <div className={styles.registerElementContainer}>
          <label
            className={styles.registerLabel}
            id={styles.registerNameLabel}
            htmlFor={styles.registerName}
          >
            Name
          </label>
          <input
            className={styles.registerInput}
            id={styles.registerName}
            type="text"
            placeholder="Enter your name"
          />
        </div>
        <div className={styles.registerElementContainer}>
          <label
            className={styles.registerLabel}
            id={styles.registerEmailLabel}
            htmlFor={styles.emailAddress}
          >
            Email
          </label>
          <input
            className={styles.registerInput}
            id={styles.emailAddress}
            type="email"
            placeholder="Enter your email address"
          />
        </div>
        <div className={styles.registerElementContainer}>
          <label
            className={styles.registerLabel}
            id={styles.registerPasswordLabel}
            htmlFor={styles.password}
          >
            Password
          </label>
          <input 
            className={styles.registerInput} 
            id={styles.password} 
            placeholder="Enter your password"
          />
        </div>
        
        <div className={styles.registerElementContainer}>
            <input 
                className={styles.registerButton} 
                id={styles.registerButton}
                type="submit"
                value="Register"
                onClick={() => onRouteChange("home")}
                />
        </div>
      </form>
    </main>
  );
};

export default Register;
