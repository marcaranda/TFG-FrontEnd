import React, { useState } from "react";
import styles from "./Info.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { getText } from "../../data/Constants";

function Info({ onClose }) {
    const text = getText();
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
                    <p className={styles["title"]}>{text.file.info.title}</p>
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
                        {text.file.info.manualFilter}
                    </button>
                    <button 
                        className={openedPage[1] ? styles["page-button-selected"] : styles["page-button"]}
                        onClick={() => handlePageChange(1)}
                    >
                        {text.file.info.automaticFilter}
                    </button>
                    <button 
                        className={openedPage[2] ? styles["page-button-selected"] : styles["page-button"]}
                        onClick={() => handlePageChange(2)}
                    >
                        {text.file.info.toConsider}
                    </button>
                </div>
                <div className={styles["content-container"]}>
                    {openedPage[0] && <div className={styles["text-container"]}>
                        <p className={styles["text"]}>{text.file.info.manualFilter}</p>
                        <p className={styles["text-1"]}>{text.file.info.manualFilterText.one}</p>
                        <p className={styles["text-1"]}>{text.file.info.manualFilterText.two}</p>
                        <p className={styles["text-1"]}>{text.file.info.manualFilterText.three}</p>
                        </div>
                    }
                    {openedPage[1] && <div className={styles["text-container"]}>
                        <p className={styles["text"]}>{text.file.info.automaticFilter}</p>
                        <p className={styles["text-1"]}>{text.file.info.automaticFilterText.one}</p>
                        <p className={styles["text-1"]}>{text.file.info.automaticFilterText.two}</p>
                        <p className={styles["text-1"]}>{text.file.info.automaticFilterText.three}</p>
                        <p className={styles["text-1"]}>{text.file.info.automaticFilterText.four}</p>
                        </div>
                    }
                    {openedPage[2] && <div className={styles["text-container"]}>
                        <p className={styles["text"]}>{text.file.info.toConsider}</p>
                        <p className={styles["text-1"]}>{text.file.info.toConsiderText.one}</p>
                        <p className={styles["text-1"]}>{text.file.info.toConsiderText.two}</p>
                        <p className={styles["text-1"]}>{text.file.info.toConsiderText.three}</p>
                        <p className={styles["text-1"]}>{text.file.info.toConsiderText.four}</p>
                        <p className={styles["text-1"]}>{text.file.info.toConsiderText.five}</p>
                        <p className={styles["text-1"]}>{text.file.info.toConsiderText.six}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Info;