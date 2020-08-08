import React from "react";
import styles from "./navigation.module.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
        if (isSignedIn) {
            return (
                <nav className={styles.mainNav}>
                    <button 
                        className={styles.signOutButton}
                        onClick={() => onRouteChange("signin")}
                        >
                        Sign Out
                    </button>
                </nav>
            )
        } else {
            return (
                <nav className={styles.mainNav}>
                    <button 
                        className={styles.signOutButton}
                        onClick={() => onRouteChange("signin")}
                        >
                        Sign In
                    </button>
                    <button 
                        className={styles.signOutButton}
                        onClick={() => onRouteChange("register")}
                        >
                        Register
                    </button>
                </nav>
            )
        }
}

export default Navigation