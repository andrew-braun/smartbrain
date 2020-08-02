import React from "react";
import Tilt from "react-tilt";
import styles from "./logo.module.css";

const Logo = () => {
    return (
        <div className={styles.mainLogo}>
            <a href="/">
                <Tilt className={styles.Tilt} options={{max : 55 }} style={{ height: 100, width: 200 }} >
                    <div className={styles.Tiltinner}> 
                    </div>
                </Tilt>
            </a>
        </div>
    );
}

export default Logo