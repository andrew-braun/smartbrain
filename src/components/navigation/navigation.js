import React from "react";
import styles from "./navigation.module.css";

const Navigation = () => {
    return (
        <nav className={styles.mainNav}>
            <button className={styles.signOutButton}>Sign Out</button>
        </nav>
    )
}

export default Navigation