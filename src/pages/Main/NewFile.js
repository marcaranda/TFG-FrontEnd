import React, { useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import styles from './NewFile.module.css'
import { fileReader } from "../../controllers/DatasetController";
import { getUserId, getText } from "../../data/Constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader"


function NewFile () {
    const fileInputButton = useRef(null);
    const userId = getUserId();
    const text = getText();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [rowsDenied, setRowsDenied] = useState(1);

    const handleUploadingChange = (event) => {
        setUploading(event);
    }

    const handleRowsInputChange = (event) => {
        setRowsDenied(event.target.value);
    };

    const handleButtonClick = () => {
        fileInputButton.current.click();
    };

    async function handleFileChange (event) {
        setLoading(true);
        const file = event.target.files[0];
        const result = await fileReader(file, userId);
        setLoading(false);
        setUploading(false);
        navigate("/file", {state: { dataset: result}});
    };

    return (
        <div className={styles["body"]}>
            {loading && <Loader />}
            <p className={styles["title"]}>{text.main.fileBottonTitle}</p>
            <button 
                className={styles["button"]}
                onClick={() => handleUploadingChange(true)}
            >
                {text.main.fileBotton}
            </button>
            {uploading &&
                <div className={styles["uploading"]}>
                    <div className={styles["container"]}>
                        <div className={styles["title-container"]}>
                            <p className={styles["title"]}>{text.main.fileBottonTitle}</p>
                            <button 
                                className={styles["close-button"]}
                                onClick={() => handleUploadingChange(false)}
                            >
                                <FontAwesomeIcon icon={faClose} size="1x" />
                            </button>
                        </div>
                        <div className={styles["input-container"]}>
                            <input
                                className={styles["input"]}
                                placeholder="1"
                                type="text"
                                onChange={(event) => handleRowsInputChange(event)}
                            ></input>
                        </div>
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
                            {text.main.fileBotton}
                        </button>
                    </div>
                </div>  
            }
        </div>
    );
}

export default NewFile