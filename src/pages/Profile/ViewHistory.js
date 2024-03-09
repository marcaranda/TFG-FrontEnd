import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from './ViewHistory.module.css'
import Navbar from "../../components/Navbar";
import Profilebar from "../../components/Profilebar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload, faTrash} from "@fortawesome/free-solid-svg-icons";
import {showHistorial} from "../../controllers/DatasetController";

function ViewHistory () {
    const [datasets, setDatasets] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            setDatasets (await showHistorial(1));
        }
        fetchData();
    }, []);

    function handleDownloadButton() {
        console.log("download");
    }

    function handleDeleteButton() {
        console.log("delete");
        navigate("/user-settings/history")
    }

    function handleDatasetButton() {
        console.log("dataset");
    }

    return (
        <div className={styles["body"]}>
            <Navbar />
            <div className={styles["page"]}>
                <Profilebar />
                <div className={styles["container"]}>
                    <p className={styles["title"]}>History</p>
                    <table className={styles["dataset-list"]}>
                        <tbody>
                            <tr></tr>
                            {datasets &&
                                datasets.map((dataset) =>
                                <div className={styles["dataset-container"]}>
                                    <button
                                        className={styles["dataset-name-button"]}
                                        onClick={handleDatasetButton}
                                    >
                                        {dataset}
                                    </button>
                                    <button 
                                        className={styles["download-button"]}
                                        onClick={handleDownloadButton}
                                    >
                                        <FontAwesomeIcon icon={faDownload} size="1x" />
                                    </button>
                                    <button 
                                        className={styles["trash-button"]}
                                        onClick={handleDeleteButton}
                                    >
                                        <FontAwesomeIcon icon={faTrash} size="1x" />
                                    </button>
                                </div>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewHistory