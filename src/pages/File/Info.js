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
                <p className={styles["text-1"]}>1.1 Press any row header to mark the row</p>
                <p className={styles["text-1"]}>1.2 Press any column header to unmark the column</p>
                <p className={styles["text-1"]}>1.3 Press 'Apply Filter' button to get marked columns entropy</p>
                <div className={styles["space"]}></div>
                <p className={styles["text"]}>2. Automatic Filter</p>
                <p className={styles["text-1"]}>2.1 Press 'Filter' button to open the filter screen</p>
                <p className={styles["text-1"]}>2.2 Select the desired filters</p>
                <p className={styles["text-1"]}>2.3 The number of rows must be greater than 0</p>
                <p className={styles["text-1"]}>2.4 On Incremental Sampling you can choose the initial rows</p>
                <div className={styles["space"]}></div>
                <p className={styles["text"]}>3. You can open the new dataset</p>
                <div className={styles["space"]}></div>
                <p className={styles["text"]}>4. TO CONSIDER</p>
                <p className={styles["text-1"]}>4.1 Manual Filter without marked rows does not work</p>
                <p className={styles["text-1"]}>4.2 On Incremental Sampling the fewer initial rows,</p>
                <p className={styles["text-1"]}>the more complicated it is to get de desired rows</p>
            </div>
        </div>
    )
}

export default Info;