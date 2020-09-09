import React from "react";
import styles from "./rank.module.css";

const Rank = ( props ) => {
    const { name } = props
    const rankNum = 1;
    console.log(props)

    return (
        <div className={styles.rankBox}>
            <span className={styles.rankText}>{`${name}, your lookup count is:`} &nbsp;</span>
            <span className={styles.rankCounter}>{`#${rankNum}`}</span>
        </div>
    )
}

export default Rank