import React from "react";
import styles from "./faceRecognition.module.css";


const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className={styles.faceRecognitionContainer}>
            <img className={styles.submittedImage}
                id="input-image"
                src={imageUrl}
                alt="submitted" />
            <div className={styles.boundingBox}
                style={{
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.bottomRow,
                    left: box.leftCol
                }}
            ></div>
        </div>
    );
}

export default FaceRecognition