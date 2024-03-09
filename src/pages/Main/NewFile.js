import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import styles from './NewFile.module.css'
import { fileReader } from "../../controllers/DatasetController";
import { getUserId } from "../../data/Constants";


function NewFile () {
    const fileInputButton = useRef(null);
    const userId = getUserId();
    const navigate = useNavigate();

    const handleButtonClick = () => {
        fileInputButton.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const result = fileReader(file, userId);
        const dataset = result.json();

        navigate("/file", {state: {dataset}});
    };

    return (
        <div className={styles["body"]}>
            <p className={styles["title"]}>Subida de Archivos</p>
            <input
                type="file"
                ref={fileInputButton}
                onChange={handleFileChange}
                style={{display: 'none'}}
                accept=".csv"
            />
            <button 
                className={styles["button"]}
                onClick={handleButtonClick}
            >
                Subir Archivo
            </button>
        </div>
    );
}

export default NewFile