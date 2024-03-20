import React, { useState } from "react";
import styles from './Filter.module.css'
import { getUserId } from "../../data/Constants";
import { applySampleFilter } from "../../controllers/DatasetController";

function Filter({ datasetName, datasetVersion, setFilter, setFilteredDataset, setLoading }) {
    const userId = getUserId();
    const [selectedImprove, setSelectedImprove] = useState("homo");
    const [selectedType, setSelectedType] = useState("Reduce");
    
    const handleImproveButton = (event) => {
        setSelectedImprove(event.target.value);
    }

    const handleTypeButton = (event) => {
        setSelectedType(event.target.value);
    }

    async function handleFilterButton() {
        setLoading(true);
        const result = await applySampleFilter(userId, datasetName, datasetVersion, selectedImprove, selectedType);
        setLoading(false);
        setFilteredDataset(result);
        setFilter(true);
    }

    return(
        <div className={styles['filter-container']}>
            <p className={styles["text"]}>To improve:</p>
            <div className={styles["row-container"]}>
            <input
                type="radio"
                id="homogeneity"
                name="filterImprove"
                value="homogeneity"
                checked={selectedImprove === 'homogeneity'}
                onChange={handleImproveButton}
                className={styles["radio-input"]}
            />
            <label htmlFor="homogeneity" className={styles["radio-button"]}>
                Homogeneity
            </label>
            </div>
            <div className={styles["row-container"]}>
            <input
                type="radio"
                id="Heterogeneity"
                name="filterImprove"
                value="Heterogeneity"
                checked={selectedImprove === 'Heterogeneity'}
                onChange={handleImproveButton}
                className={styles["radio-input"]}
            />
            <label htmlFor="Heterogeneity" className={styles["radio-button"]}>
                Heterogeneity
            </label>
            </div>
            <div className={styles["space"]}></div>
            <p className={styles["text"]}>Filter Type:</p>
            <div className={styles["row-container"]}>
            <input
                type="radio"
                id="Reduce"
                name="filterType"
                value="Reduce"
                checked={selectedType === 'Reduce'}
                onChange={handleTypeButton}
                className={styles["radio-input"]}
            />
            <label htmlFor="Reduce" className={styles["radio-button"]}>
                Reduce
            </label>
            </div>
            <div className={styles["row-container"]}>
            <input
                type="radio"
                id="Increase"
                name="filterType"
                value="Increase"
                checked={selectedType === 'Increase'}
                onChange={handleTypeButton}
                className={styles["radio-input"]}
            />
            <label htmlFor="Increase" className={styles["radio-button"]}>
                Increase
            </label>
            </div>
            <div className={styles["space"]}></div>
            <div className={styles["row-container"]}>
                <button 
                    className={styles["button"]}
                    onClick={handleFilterButton}
                >
                    Apply
                </button>
            </div>
        </div>
    )
}

export default Filter