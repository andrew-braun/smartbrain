import React from "react";
import styles from "./imageLinkForm.module.css";


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className={styles.imageLinkForm}>
            <h2 className={styles.formHeading}>
                {`Try out this face-detection software!`}
            </h2>
            <div>
                <input 
                type="text" 
                className={styles.formTextInput}
                onChange={onInputChange}
                />
                <button 
                    className={styles.formSubmitButton}
                    onClick={onButtonSubmit}>
                        Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm