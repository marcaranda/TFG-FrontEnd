import React, { useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import styles from './NewFile.module.css'
import { fileReader } from "../../controllers/DatasetController";
import { getUserId, getText } from "../../data/Constants";
import Loader from "../../components/Loader"


function NewFile () {
    const fileInputButton = useRef(null);
    const userId = getUserId();
    const text = getText();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleButtonClick = () => {
        fileInputButton.current.click();
    };

    async function handleFileChange (event) {
        setLoading(true);
        const file = event.target.files[0];
        const result = await fileReader(file, userId);
        setLoading(false);
        navigate("/file", {state: { dataset: result}});
    };

    return (
        <div className={styles["body"]}>
            {loading && <Loader />}
            <p className={styles["title"]}>{text.main.fileBottonTitle}</p>
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
    );
}

export default NewFile