import React from "react";
import styles from "./navigation.module.css";

const Navigation = () => {
    return (
        <nav className={styles.mainNav}>
            <p className={styles.signOutButton}>Sign Out</p>
        </nav>
    )
}

export default Navigation