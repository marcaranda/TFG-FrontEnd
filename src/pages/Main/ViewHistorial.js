import React from "react";
import styles from './ViewHistorial.module.css'

function ViewHistorial () {
    //const navigate = useNavigate();

    const handleButtonClick = () => {
        //navigate("/page");
        console.log("historial");
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