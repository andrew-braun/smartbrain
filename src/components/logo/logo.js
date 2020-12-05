import React from "react";
import styles from "./logo.module.css";

const Logo = () => {
	return (
		<div className={styles.mainLogo}>
			<a href="/">
				<div className={styles.logoWrapper}>
					<div className={styles.logoContent}></div>
				</div>
			</a>
		</div>
	);
};

export default Logo;
