import React from "react";
import styles from "./navigation.module.css";

const Navigation = ({ onRouteChange }) => {
    return (
        <nav className={styles.mainNav}>
            <button 
                className={styles.signOutButton}
                onClick={() => onRouteChange("signin")}
                >Sign Out</button>
        </nav>
    )
}

export default Navigation