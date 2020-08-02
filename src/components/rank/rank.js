import React from "react";
import styles from "./rank.module.css";

const Rank = () => {
    const rankNum = 1;

    return (
        <div className={styles.rankBox}>
            <span className={styles.rankText}>{`Current rank:`} &nbsp;</span>
            <span className={styles.rankCounter}>{`#${rankNum}`}</span>
        </div>
    )
}

export default Rank