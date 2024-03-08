import React, {useRef} from "react";
//import {useNavigate} from "react-router-dom";
import styles from './NewFile.module.css'


function NewFile () {
    const fileInputButton = useRef(null);
    //const navigate = useNavigate();

    const handleButtonClick = () => {
        fileInputButton.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        //llamar funcion controller
        console.log(file);
        //navigate("/page")
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