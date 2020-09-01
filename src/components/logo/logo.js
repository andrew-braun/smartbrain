import React from "react";
import styles from "./logo.module.css";

const Logo = () => {
    return (
        <div className={styles.mainLogo}>
            <a href="/">
                <div className={styles.Tilt} >
                    <div className={styles.Tiltinner}>
                        
                    </div>
                </div>
            </a>
        </div>
    );
}

export default Logo