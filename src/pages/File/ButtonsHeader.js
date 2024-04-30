import React, { useState } from "react";
import { Toaster, toast } from 'sonner'
import { useNavigate } from "react-router-dom";
import styles from './ButtonsHeader.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getText, setTop, setLeft } from "../../data/Constants";
import { applyFilter, downloadDataset, deleteDataset } from "../../controllers/DatasetController";

function ButtonsHeader({ datasetId, datasetName, datasetVersion, titles, columnStates, rowStates, setColumnStates, setRowStates, setFilter, setFilteredDataset, setShowFilter, setLoading }) {
    const navigate = useNavigate();
    const text = getText();
    const [showFilterHeader, setShowFilterHeader] = useState(false);

    async function handleFilterButton() {
        let filterTitles = [];
        
        for (let i = 0; i < titles.length; ++i) {
            if (columnStates[i]) {
                filterTitles.push(titles[i]);
            }
        }

        setLoading(true);
        const result = await applyFilter(datasetId, filterTitles, rowStates);
        if (result.success) {
            setLoading(false);
            setFilteredDataset(result.result);
            setFilter(true);
        } else {
            setLoading(false);
            toast.error(result.message);
        }
    };

    async function handleShowFilterButton() {
        setShowFilter(!showFilterHeader);
        setShowFilterHeader(!showFilterHeader);
    }

    async function handleDownloadButton() {
        setLoading(true);
        const result = await downloadDataset(datasetId, datasetName, datasetVersion);
        if (!result.success) {
            toast.error(result.message);
        }
        setLoading(false);
    }

    async function handleDeleteButton() {
        setLoading(true);
        const result = await deleteDataset(datasetId);
        if (result.success) {
            setTop(0);
            setLeft(0);
            navigate("/user-settings/history");
        } else {
            toast.error(result.message);
        }
        setLoading(false);
    }

    function handleHistorialButton() {
        setTop(0);
        setLeft(0);
        navigate("/user-settings/history");
    }

    function handleChangeColumnStatesButton() {
        const invertedColumnStates = Object.keys(columnStates).reduce((acc, key) => {
            acc[key] = !columnStates[key];
            return acc;
        }, {});
    
        setColumnStates(invertedColumnStates);
    }

    function handleChangeRowStatesButton() {
        const invertedRowStates = Object.keys(rowStates).reduce((acc, key) => {
            acc[key] = !rowStates[key];
            return acc;
        }, {});
    
        setRowStates(invertedRowStates);
    }

    return(
        <div className={styles["body"]}>
            <Toaster position="top-center" />
            <div className={styles["buttons-header-container"]}>
                <div className={styles["left-container"]}>
                    <button 
                        className={styles["left-button"]}
                        onClick={handleShowFilterButton}
                        text-section={showFilterHeader ? "file.buttonsBar.hideSampling" : "file.buttonsBar.sampling"}
                    >
                        {showFilterHeader ? text.file.buttonsBar.hideSampling : text.file.buttonsBar.sampling}
                    </button>
                    <button 
                        className={styles["left-button"]}
                        onClick={handleHistorialButton}
                        text-section="file.buttonsBar.viewHistory"
                    >
                        {text.file.buttonsBar.viewHistory}
                    </button>
                </div>
                <div className={styles["center-container"]}>
                    <button 
                        className={styles["filter-button"]}
                        onClick={handleFilterButton}
                        text-section="file.buttonsBar.applyFilter"
                    >
                        {text.file.buttonsBar.applyFilter}
                    </button>
                    <button 
                        className={styles["states-button"]}
                        onClick={handleChangeColumnStatesButton}
                        text-section="file.buttonsBar.changeColumnsStates"
                    >
                        {text.file.buttonsBar.changeColumnsStates}
                    </button>
                    <button 
                        className={styles["states-button"]}
                        onClick={handleChangeRowStatesButton}
                        text-section="file.buttonsBar.changeRowStates"
                    >
                        {text.file.buttonsBar.changeRowStates}
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
        </div>
    )
}

export default ButtonsHeader;