import React, { useState } from "react";
import styles from './Filter.module.css'
import { applySampleFilter } from "../../controllers/DatasetController";

function Filter({ datasetId, setFilter, setFilteredDataset, setLoading }) {
    const [selectedImprove, setSelectedImprove] = useState("Homogeneity");
    const [selectedType, setSelectedType] = useState("Reduce");
    const [numRows, setNumRows] = useState(1);
    const [error, setError] = useState(false);
    
    const handleImproveButton = (event) => {
        setSelectedImprove(event.target.value);
    }

    const handleTypeButton = (event) => {
        setSelectedType(event.target.value);
    }

    const handleInputChange = (event) => {
        let num = event.target.value;
        if (num === '') num = 1;
        setNumRows(num);
    };

    async function handleFilterButton() {
        setLoading(true);
        let result;

        console.log(numRows)

        if (numRows !== null || numRows > 0) {
            result = await applySampleFilter(datasetId, selectedImprove, selectedType, numRows);
            setFilteredDataset(result);
            setFilter(true);
        }
        else {
            setError(true);
            setTimeout(()=>{
                setError(false);
            }, 3000);
        }
        
        setLoading(false);
    }

    return(
        <div className={styles['filter-container']}>
            <p className={styles["text"]}>To Improve:</p>
            <div className={styles["row-container"]}>
            <input
                type="radio"
                id="Homogeneity"
                name="filterImprove"
                value="Homogeneity"
                checked={selectedImprove === 'Homogeneity'}
                onChange={handleImproveButton}
                className={styles["radio-input"]}
            />
            <label htmlFor="Homogeneity" className={styles["radio-button"]}>
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
            <p className={styles["text"]}>{selectedType === "Reduce" ? "Number of Rows to Reduce:" : "Number of New Rows:"}</p>
            <input
                className={styles["input"]}
                type="number"
                placeholder="1"
                onChange={(event) => handleInputChange(event)}
            ></input>
            {error && <p className={styles["error"]}>Incorrect Number of Rows</p>}
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