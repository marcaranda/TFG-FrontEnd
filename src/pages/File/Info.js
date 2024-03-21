import React from "react";
import styles from "./Info.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Info({ onClose }) {
    return (
        <div className={styles["body"]}>
            <div className={styles["container"]}>
                <button 
                    className={styles["close-button"]}
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faClose} size="1x" />
                </button>
                <p className={styles["title"]}>How to Use</p>
                <p className={styles["text"]}>1. Manual Filter</p>
                <p className={styles["text-1"]}>1.1 Press any column header to unmark the column</p>
                <p className={styles["text-1"]}>1.2 Press 'Apply Filter' button to get marked columns entropy</p>
                <div className={styles["space"]}></div>
                <p className={styles["text"]}>2. Automatic Filter</p>
                <p className={styles["text-1"]}>2.1 Press 'Filter' button to open the filter screen</p>
                <p className={styles["text-1"]}>2.2 Select the desired filters</p>
                <p className={styles["text-1"]}>2.3 The number of rows must be greater than 0</p>
                <div className={styles["space"]}></div>
                <p className={styles["text"]}>3. You can open the new dataset</p>
            </div>
        </div>
    )
}

export default Info;