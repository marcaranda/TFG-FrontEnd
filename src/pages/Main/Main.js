import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Main.module.css'
import NewFile from "./NewFile";
import Navbar from "../../components/Navbar";
import { getText } from "../../data/Constants";

function Main () {
    const text = getText();
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/user-settings/history");
    };

    return (
        <div className={styles["body"]}>
            <Navbar />
            <div className={styles["page"]}>
                <div className={styles["half-body"]}>
                    <h1 className={styles["page-title"]} text-section="main.title">{text.main.title}</h1>
                    <NewFile />
                    <div className={styles["history-body"]}>
                        <p className={styles["history-title"]} text-section="main.historyBottonTitle">{text.main.historyBottonTitle}</p>
                        <button 
                            className={styles["history-button"]}
                            onClick={handleButtonClick}
                            text-section="main.historyBotton"
                        >
                            {text.main.historyBotton}
                        </button>
                    </div>
                </div>
                <div className={styles["half-body"]}>
                    <h1 className={styles["page-title"]}>Image</h1>
                </div>
            </div>
        </div>
    );
}

export default Main