import React, { useState } from "react";
import styles from "./Info.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Info({ onClose }) {
    const [openedPage, setOpenedPage] = useState([true, false, false]);

    function handlePageChange(page) {
        let newPages = [false, false, false];
        newPages[page] = true;
        setOpenedPage(newPages);
    }

    return (
        <div className={styles["body"]}>
            <div className={styles["container"]}>
                <div className={styles["title-container"]}>
                    <p className={styles["title"]}>How to Use</p>
                    <button 
                        className={styles["close-button"]}
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faClose} size="1x" />
                    </button>
                </div>
                <div className={styles["page-container"]}>
                    <button 
                        className={openedPage[0] ? styles["page-button-selected"] : styles["page-button"]}
                        onClick={() => handlePageChange(0)}
                    >
                        Manual Filter
                    </button>
                    <button 
                        className={openedPage[1] ? styles["page-button-selected"] : styles["page-button"]}
                        onClick={() => handlePageChange(1)}
                    >
                        Automatic Sampling
                    </button>
                    <button 
                        className={openedPage[2] ? styles["page-button-selected"] : styles["page-button"]}
                        onClick={() => handlePageChange(2)}
                    >
                        To Consider
                    </button>
                </div>
                <div className={styles["content-container"]}>
                    {openedPage[0] && <div className={styles["text-container"]}>
                        <p className={styles["text"]}>Manual Filter</p>
                        <p className={styles["text-1"]}>1 Press any row header to mark the row</p>
                        <p className={styles["text-1"]}>2 Press any column header to unmark the column</p>
                        <p className={styles["text-1"]}>3 Press 'Apply Filter' button to get marked columns entropy</p>
                        </div>
                    }
                    {openedPage[1] && <div className={styles["text-container"]}>
                        <p className={styles["text"]}>Automatic Sampling</p>
                        <p className={styles["text-1"]}>1 Press 'Filter' button to open the filter screen</p>
                        <p className={styles["text-1"]}>2 Select the desired filters</p>
                        <p className={styles["text-1"]}>3 The number of rows must be greater than 0</p>
                        <p className={styles["text-1"]}>4 On Incremental Sampling you can choose the initial rows</p>
                        </div>
                    }
                    {openedPage[2] && <div className={styles["text-container"]}>
                        <p className={styles["text"]}>TO CONSIDER</p>
                        <p className={styles["text-1"]}>1 Manual Filter without marked rows does not work</p>
                        <p className={styles["text-1"]}>2 On Incremental Sampling the fewer initial rows,</p>
                        <p className={styles["text-1"]}>  the more complicated it is to get de desired rows</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Info;