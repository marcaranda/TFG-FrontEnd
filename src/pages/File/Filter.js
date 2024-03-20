import React, { useState } from "react";
import styles from './Filter.module.css'

function Filter() {
    const [selectedImprove, setSelectedImprove] = useState("homo");
    const [selectedType, setSelectedType] = useState("Reduce");
    
    const handleImproveButton = (event) => {
        setSelectedImprove(event.target.value);
    }

    const handleTypeButton = (event) => {
        setSelectedType(event.target.value);
    }

    async function handleFilterButton() {
        console.log("ok");
    }

    return(
        <div className={styles['filter-container']}>
            <p className={styles["text"]}>To improve:</p>
            <div className={styles["row-container"]}>
            <input
                type="radio"
                id="homo"
                name="filterImprove"
                value="homo"
                checked={selectedImprove === 'homo'}
                onChange={handleImproveButton}
                className={styles["radio-input"]}
            />
            <label htmlFor="homo" className={styles["radio-button"]}>
                Homo
            </label>
            </div>
            <div className={styles["row-container"]}>
            <input
                type="radio"
                id="hete"
                name="filterImprove"
                value="hete"
                checked={selectedImprove === 'hete'}
                onChange={handleImproveButton}
                className={styles["radio-input"]}
            />
            <label htmlFor="hete" className={styles["radio-button"]}>
                Hete
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