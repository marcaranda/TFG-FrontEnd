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
    }, [userId, datasets]);

    async function handleDownloadButton(dataset) {
        await downloadDataset(dataset.userId, dataset.datasetName, dataset.version);
    }

    async function handleDeleteButton(dataset) {
        await deleteDataset(dataset.userId, dataset.datasetName, dataset.version);
        navigate("/user-settings/history")
    }

    async function handleDatasetButton(dataset) {
        navigate("/file", {state: { dataset: dataset}});
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
                                <tr key={`${dataset.datasetName}_${dataset.version}`} className={styles["dataset-container"]}>
                                    <td className={styles["dataset-name-button-td"]}>
                                        <button
                                            className={styles["dataset-name-button"]}
                                            onClick={() => handleDatasetButton(dataset)}
                                        >
                                            {dataset.version === 0 ? dataset.datasetName : `${dataset.datasetName}_${dataset.version}`}
                                        </button>
                                    </td>
                                    <td className={styles["entropy-td"]}>
                                        <p className={styles["entropy"]}>Eigen Entropy: {dataset.eigenEntropy}</p>
                                    </td>
                                    <td className={styles["buttons-container-td"]}>
                                        <div className={styles["buttons-container"]}>
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
                                        </div>
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