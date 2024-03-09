import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './ViewHistory.module.css'
import Navbar from "../../components/Navbar";
import Profilebar from "../../components/Profilebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteDataset, downloadDataset, showHistorial } from "../../controllers/DatasetController";
import { getUserId } from "../../data/Constants";

function ViewHistory () {
    const [datasets, setDatasets] = useState(null);
    const userId = getUserId();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            setDatasets(await showHistorial(userId));
        }
        fetchData();
    }, [userId]);

    async function handleDownloadButton(dataset) {
        const { datasetName, version } = await getNameVersion(dataset);
        await downloadDataset(datasetName, version);
    }

    async function handleDeleteButton(dataset) {
        const { datasetName, version } = await getNameVersion(dataset);
        await deleteDataset(userId, datasetName, version);
        navigate("/user-settings/history")
    }

    async function handleDatasetButton(dataset) {
        //const { datasetName, version } = await getNameVersion(dataset);
        console.log("dataset");
    }

    async function getNameVersion(dataset) {
        const match = /(.+?)_?(\d{1,3})?$/.exec(dataset);
        if (match) {
            // Si hay un match, devolvemos el nombre y la versión correspondiente
            return {
                datasetName: match[1],
                version: match[2] === undefined ? "0" : match[2]
            };
        } else {
            // Si no hay un match, devolvemos el string original como nombre y 0 como versión
            return {
                datasetName: dataset,
                version: "0"
            };
        }
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
                                datasets.map((dataset) => (
                                <tr key={dataset} className={styles["dataset-container"]}>
                                    <td>
                                        <button
                                            className={styles["dataset-name-button"]}
                                            onClick={() => handleDatasetButton(dataset)}
                                        >
                                            {dataset}
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className={styles["download-button"]}
                                            onClick={() => handleDownloadButton(dataset)}
                                        >
                                            <FontAwesomeIcon icon={faDownload} size="1x" />
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            className={styles["trash-button"]}
                                            onClick={() => handleDeleteButton(dataset)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} size="1x" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewHistory