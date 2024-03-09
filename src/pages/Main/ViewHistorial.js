import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './ViewHistorial.module.css'

function ViewHistorial () {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/user-settings/history");
    };

    return (
        <div className={styles["body"]}>
            <p className={styles["title"]}>Ver tu Historial</p>
            <button 
                className={styles["button"]}
                onClick={handleButtonClick}
            >
                Ver historial
            </button>
        </div>
    );
}

export default ViewHistorial