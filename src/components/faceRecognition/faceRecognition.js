import React from "react";
import styles from "./faceRecognition.module.css";


const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className={styles.faceRecognitionContainer}>
            <img className={styles.submittedImage}
                id="input-image"
                src={imageUrl}
                alt="submitted" />
            <div className={styles.boundingBox}></div>
        </div>
    );
}

export default FaceRecognition