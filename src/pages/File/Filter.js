import React, { useState } from "react";
import { Toaster, toast } from 'sonner'
import styles from './Filter.module.css'
import { applySampleFilter } from "../../controllers/DatasetController";
import { getText } from "../../data/Constants";

function Filter({ datasetId, rowStates, setFilter, setFilteredDataset, setLoading }) {
    const text = getText();
    const [selectedImprove, setSelectedImprove] = useState("Homogeneity");
    const [selectedType, setSelectedType] = useState("Incremental Sampling");
    const [numInitialRows, setNumInitialRows] = useState(1);
    const [numWantedRows, setNumWantedRows] = useState(1);
    const [sliderValue, setSliderValue] = useState(50);
    
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

    const handleSliderChange = (event) => {
        setSliderValue(event.target.valueAsNumber);
    }

    async function handleFilterButton() {
        if (numWantedRows !== null && numWantedRows > 0 && numInitialRows !== null && numInitialRows > 0) {
            if (selectedType === "Incremental Sampling" && numWantedRows - numInitialRows <= 0) {
                toast.error(text.file.filter.errorNumberRows);
                return;
            }
            
            setLoading(true);
            const result = await applySampleFilter(datasetId, selectedImprove, selectedType, numInitialRows, numWantedRows, rowStates, sliderValue);
            if (result.success) {
                setFilteredDataset(result.result);
                setFilter(true);
            } else {
                toast.error(result.message);
            }
            setLoading(false);
        }
        else {
            toast.error(text.file.filter.errorNumberRows);
        }
    }

    return(
        <div className={styles['filter-container']}>
        <Toaster position="top-center" />
            <p className={styles["text"]} text-section="file.filter.toImprove">{text.file.filter.toImprove}</p>
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
            <label htmlFor="Homogeneity" className={styles["radio-button"]} text-section="file.filter.homogeneity">
                {text.file.filter.homogeneity}
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
            <label htmlFor="Heterogeneity" className={styles["radio-button"]} text-section="file.filter.heterogeneity">
                {text.file.filter.heterogeneity}
            </label>
            </div>
            <div className={styles["space"]}></div>
            <p className={styles["text"]} text-section="file.filter.filterType">{text.file.filter.filterType}</p>
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
            <label htmlFor="Incremental Sampling" className={styles["radio-button"]} text-section="file.filter.incrementalSampling">
                {text.file.filter.incrementalSampling}
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
            <label htmlFor="Elimination Sampling" className={styles["radio-button"]} text-section="file.filter.eliminationSampling">
                {text.file.filter.eliminationSampling}
            </label>
            </div>
            {selectedType === "Incremental Sampling" && (
                <>
                    <div className={styles["space"]}></div>
                    <p className={styles["text"]} text-section="file.filter.initialRowsNumber">{text.file.filter.initialRowsNumber}</p>
                    <input
                        className={styles["input"]}
                        type="number"
                        placeholder="1"
                        onChange={(event) => handleInputInitialRowsChange(event)}
                    ></input>
                    <div className={styles["space"]}></div>
                    <p className={styles["text"]} text-section="file.filter.eigenEntropyChangeRate">{text.file.filter.eigenEntropyChangeRate}</p>
                    <div className={styles["slider"]}>
                        <input
                            className={styles["number-input"]}
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                            value={sliderValue}
                            onChange={handleSliderChange}
                        ></input>
                        <p className={styles["number"]}>{sliderValue}%</p>
                    </div>
                </>
            )}
            <div className={styles["space"]}></div>
            <p className={styles["text"]} text-section="file.filter.finalRowsNumber">{text.file.filter.finalRowsNumber}</p>
            <input
                className={styles["input"]}
                type="number"
                placeholder="1"
                onChange={(event) => handleInputWantedRowsChange(event)}
            ></input>
            <div className={styles["space"]}></div>
            <div className={styles["row-container"]}>
                <button 
                    className={styles["button"]}
                    onClick={handleFilterButton}
                    text-section="file.filter.apply"
                >
                    {text.file.filter.apply}
                </button>
            </div>
        </div>
    )
}

export default Filter