import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './ButtonsHeader.module.css';
import Loader from "../../components/Loader"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getUserId } from "../../data/Constants";
import { applyFilter, downloadDataset, deleteDataset } from "../../controllers/DatasetController";

function ButtonsHeader({ datasetName, datasetVersion, titles, columnStates, setFilter, setFilteredDataset, setShowFilter }) {
    const navigate = useNavigate();
    const userId = getUserId();
    const [loading, setLoading] = useState(false);
    const [showFilterHeader, setShowFilterHeader] = useState(false);

    async function handleFilterButton() {
        let filterTitles = [];

        console.log(columnStates);
        console.log(titles);
        
        for (let i = 0; i < titles.length; ++i) {
            if (columnStates[i]) {
                filterTitles.push(titles[i]);
            }
        }

        setLoading(true);
        const result = await applyFilter(userId, datasetName, datasetVersion, filterTitles);
        setLoading(false);
        setFilteredDataset(result);
        setFilter(true);
    };

    async function handleShowFilterButton() {
        setShowFilter(!showFilterHeader);
        setShowFilterHeader(!showFilterHeader);
    }

    async function handleDownloadButton() {
        setLoading(true);
        await downloadDataset(userId, datasetName, datasetVersion);
        setLoading(false);
    }

    async function handleDeleteButton() {
        setLoading(true);
        await deleteDataset(userId, datasetName, datasetVersion);
        setLoading(false);
        navigate("/user-settings/history")
    }

    function handleHistorialButton() {
        navigate("/user-settings/history");
    }

    return(
        <div className={styles["body"]}>
            <div className={styles["buttons-header-container"]}>
                <div className={styles["left-container"]}>
                    <button 
                        className={styles["left-button"]}
                        onClick={handleShowFilterButton}
                    >
                        {showFilterHeader ? "Hide Filters" : "Filters"}
                    </button>
                    <button 
                        className={styles["left-button"]}
                        onClick={handleHistorialButton}
                    >
                        View History
                    </button>
                </div>
                <div className={styles["center-container"]}>
                    <button 
                        className={styles["filter-button"]}
                        onClick={handleFilterButton}
                    >
                        Apply Filter
                    </button>
                </div>
                <div className={styles["right-container"]}>
                    <button 
                        className={styles["download-button"]}
                        onClick={handleDownloadButton}
                    >
                        <FontAwesomeIcon icon={faDownload} size="1x" />
                    </button>
                    <button 
                        className={styles["trash-button"]}
                        onClick={handleDeleteButton}
                    >
                        <FontAwesomeIcon icon={faTrash} size="1x" />
                    </button>
                </div>
            </div>
            {loading && <Loader />}
        </div>
    )
}

export default ButtonsHeader;