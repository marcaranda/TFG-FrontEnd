import React, { useState } from "react";
import styles from './Filter.module.css'
import { applySampleFilter } from "../../controllers/DatasetController";

function Filter({ datasetId, setFilter, setFilteredDataset, setLoading }) {
    const [selectedImprove, setSelectedImprove] = useState("Homogeneity");
    const [selectedType, setSelectedType] = useState("Reduce");
    const [numInitialRows, setNumInitialRows] = useState('');
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
            if (selectedType === "Reduce") {
                if (numInitialRows < numWantedRows || numInitialRows === '') {
                    result = await applySampleFilter(datasetId, selectedImprove, selectedType, numInitialRows, numWantedRows);
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
                result = await applySampleFilter(datasetId, selectedImprove, selectedType, null, numWantedRows);
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
            {selectedType === "Reduce" && (
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
            <p className={styles["text"]}>{selectedType === "Reduce" ? "Number of Rows to Reduce:" : "Number of New Rows:"}</p>
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