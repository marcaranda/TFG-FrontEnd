import React, { useState } from "react";
import styles from './Filter.module.css'
import { applySampleFilter } from "../../controllers/DatasetController";

function Filter({ datasetId, rowStates, setFilter, setFilteredDataset, setLoading }) {
    const [selectedImprove, setSelectedImprove] = useState("Homogeneity");
    const [selectedType, setSelectedType] = useState("Incremental Sampling");
    const [numInitialRows, setNumInitialRows] = useState(1);
    const [numWantedRows, setNumWantedRows] = useState(1);
    const [error, setError] = useState(false);
    
    const handleImproveButton = (event) => {
        setSelectedImprove(event.target.value);
    }

    const handleTypeButton = (event) => {
        setSelectedType(event.target.value);
    }

    const handleInputInitialRowsChange = (event) => {
        let num = event.target.value;
        if (num === '') num = 1;
        setNumInitialRows(num);
      };

    const handleInputWantedRowsChange = (event) => {
        let num = event.target.value;
        if (num === '') num = 1;
        setNumWantedRows(num);
      };

    async function handleFilterButton() {
        if (numWantedRows !== null && numWantedRows > 0 && numInitialRows !== null && numInitialRows > 0) {
            setLoading(true);
            let result;
            if (selectedType === "Incremental Sampling") {
                if (numWantedRows - numInitialRows > 0) {
                    result = await applySampleFilter(datasetId, selectedImprove, selectedType, numInitialRows, numWantedRows, rowStates);
                    setFilteredDataset(result);
                    setFilter(true);
                }
                else {
                    setLoading(false);
                    setError(true);
                    setTimeout(()=>{
                        setError(false);
                    }, 3000);
                }
            }
            else { 
                result = await applySampleFilter(datasetId, selectedImprove, selectedType, numInitialRows, numWantedRows, rowStates);
                setFilteredDataset(result);
                setFilter(true);
            }
            setLoading(false);
        }
        else {
            setError(true);
            setTimeout(()=>{
                setError(false);
            }, 3000);
        }
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
                id="Incremental Sampling"
                name="filterType"
                value="Incremental Sampling"
                checked={selectedType === 'Incremental Sampling'}
                onChange={handleTypeButton}
                className={styles["radio-input"]}
            />
            <label htmlFor="Incremental Sampling" className={styles["radio-button"]}>
                Incremental Sampling
            </label>
            </div>
            <div className={styles["row-container"]}>
            <input
                type="radio"
                id="Elimination Sampling"
                name="filterType"
                value="Elimination Sampling"
                checked={selectedType === 'Elimination Sampling'}
                onChange={handleTypeButton}
                className={styles["radio-input"]}
            />
            <label htmlFor="Elimination Sampling" className={styles["radio-button"]}>
                Elimination Sampling
            </label>
            </div>
            {selectedType === "Incremental Sampling" && (
                <>
                    <div className={styles["space"]}></div>
                    <p className={styles["text"]}>Initial Number of Rows for the Filter</p>
                    <input
                        className={styles["input"]}
                        type="number"
                        placeholder="1"
                        onChange={(event) => handleInputInitialRowsChange(event)}
                    ></input>
                </>
            )}
            <div className={styles["space"]}></div>
            <p className={styles["text"]}>{selectedType === "Incremental Sampling" ? "Number of Rows to Incremental Sampling:" : "Number of New Rows:"}</p>
            <input
                className={styles["input"]}
                type="number"
                placeholder="1"
                onChange={(event) => handleInputWantedRowsChange(event)}
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