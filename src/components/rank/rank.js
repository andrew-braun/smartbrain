import React from "react";
import styles from "./rank.module.css";

const Rank = ( props ) => {
    const { name, entries } = props
    console.log(props)

    return (
        <div className={styles.rankBox}>
            <span className={styles.rankText}>{`${name}, your lookup count is:`} &nbsp;</span>
            <span className={styles.rankCounter}>{`${entries}`}</span>
        </div>
    )
}

export default Rank