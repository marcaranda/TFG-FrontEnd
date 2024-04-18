import React from "react";
import { useNavigate } from "react-router-dom";
import { getText } from "../../data/Constants";
import styles from './ViewHistorial.module.css'

function ViewHistorial () {
    const navigate = useNavigate();
    const text = getText();

    const handleButtonClick = () => {
        navigate("/user-settings/history");
    };

    return (
        <div className={styles["body"]}>
            <p className={styles["title"]}>{text.main.historyBottonTitle}</p>
            <button 
                className={styles["button"]}
                onClick={handleButtonClick}
            >
                {text.main.historyBotton}
            </button>
        </div>
    );
}

export default ViewHistorial