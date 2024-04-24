import React, { useState } from "react";
import styles from "./Info.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { getText } from "../../data/Constants";
import buttonSampling from "../../assets/pictures/buttonSampling.png";
import samplingElimination from "../../assets/pictures/samplingElimination.png";
import samplingIncremental from "../../assets/pictures/samplingIncremental.png";
import buttonApply from "../../assets/pictures/buttonApply.png";
import columns from "../../assets/pictures/columns.png";
import rows from "../../assets/pictures/rows.png";

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
                    <p className={styles["title"]} text-section="file.info.title">{text.file.info.title}</p>
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
                        text-section="file.info.manualFilter"
                    >
                        {text.file.info.manualFilter}
                    </button>
                    <button 
                        className={openedPage[1] ? styles["page-button-selected"] : styles["page-button"]}
                        onClick={() => handlePageChange(1)}
                        text-section="file.info.automaticFilter"
                    >
                        {text.file.info.automaticFilter}
                    </button>
                    <button 
                        className={openedPage[2] ? styles["page-button-selected"] : styles["page-button"]}
                        onClick={() => handlePageChange(2)}
                        text-section="file.info.toConsider"
                    >
                        {text.file.info.toConsider}
                    </button>
                </div>
                {openedPage[0] && <div className={styles["content-container"]}>
                    <div className={styles["half-container"]}>
                        <div className={styles["text-container"]}>
                            <p className={styles["text"]} text-section="file.info.manualFilter">{text.file.info.manualFilter}</p>
                            <p className={styles["text-1"]} text-section="file.info.manualFilter.one">{text.file.info.manualFilterText.one}</p>
                            <p className={styles["text-1"]} text-section="file.info.manualFilter.two">{text.file.info.manualFilterText.two}</p>
                            <p className={styles["text-1"]} text-section="file.info.manualFilter.three">{text.file.info.manualFilterText.three}</p>
                        </div>
                        <div className={styles["image-container"]}>
                            <p className={styles["text-image"]}>Marked Columns:</p>
                            <img src={ columns } alt="columns" className={styles["image-columns"]}/>
                        </div>
                    </div>
                    <div className={styles["half-container"]}>
                        <div className={styles["image-container"]}>
                            <p className={styles["text-image"]}>'APPLY' button:</p>
                            <img src={ buttonApply } alt="buttonApply" className={styles["image-button"]}/>
                        </div>
                        <div className={styles["image-container"]}>
                            <p className={styles["text-image"]}>Marked Rows:</p>
                            <img src={ rows } alt="rows" className={styles["image-rows"]}/>
                        </div>
                    </div>  
                </div> }
                {openedPage[1] && <div className={styles["content-container"]}>
                    <div className={styles["half-container"]}>
                        <div className={styles["text-container"]}>
                            <p className={styles["text"]} text-section="file.info.automaticFilter">{text.file.info.automaticFilter}</p>
                            <p className={styles["text-1"]} text-section="file.info.automaticFilter.one">{text.file.info.automaticFilterText.one}</p>
                            <p className={styles["text-1"]} text-section="file.info.automaticFilter.two">{text.file.info.automaticFilterText.two}</p>
                            <p className={styles["text-1"]} text-section="file.info.automaticFilter.three">{text.file.info.automaticFilterText.three}</p>
                            <p className={styles["text-1"]} text-section="file.info.automaticFilter.four">{text.file.info.automaticFilterText.four}</p>
                        </div>
                        <div className={styles["image-container"]}>
                            <p className={styles["text-image"]}>Elimination Sampling:</p>
                            <img src={ samplingElimination } alt="samplingElimination" className={styles["image-sampling-elimination"]}/>
                        </div>
                    </div>
                    <div className={styles["half-container"]}>
                        <div className={styles["image-container"]}>
                            <p className={styles["text-image"]}>'SAMPLING' button:</p>
                            <img src={ buttonSampling } alt="buttonSampling" className={styles["image-button"]}/>
                        </div>
                        <div className={styles["image-container"]}>
                            <p className={styles["text-image"]}>Incremental Sampling:</p>
                            <img src={ samplingIncremental } alt="samplingIncremental" className={styles["image-sampling-incremental"]}/>
                        </div>
                    </div>
                </div> }
                {openedPage[2] && <div className={styles["content-container"]}>
                    <div className={styles["half-container"]}>
                        <div className={styles["text-container"]}>
                            <p className={styles["text"]} text-section="file.info.toConsiderText">{text.file.info.toConsider}</p>
                            <p className={styles["text-1"]} text-section="file.info.toConsiderText.one">{text.file.info.toConsiderText.one}</p>
                            <p className={styles["text-1"]} text-section="file.info.toConsiderText.two">{text.file.info.toConsiderText.two}</p>
                            <p className={styles["text-2"]} text-section="file.info.toConsiderText.three">{text.file.info.toConsiderText.three}</p>
                            <p className={styles["text-2"]} text-section="file.info.toConsiderText.four">{text.file.info.toConsiderText.four}</p>
                            <p className={styles["text-2"]} text-section="file.info.toConsiderText.five">{text.file.info.toConsiderText.five}</p>
                            <p className={styles["text-2"]} text-section="file.info.toConsiderText.six">{text.file.info.toConsiderText.six}</p>
                        </div>
                    </div>
                </div> }
            </div>
        </div>
    )
}

export default Info;