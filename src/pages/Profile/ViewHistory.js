import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './ViewHistory.module.css'
import Navbar from "../../components/Navbar";
import Profilebar from "../../components/Profilebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteDataset, downloadDataset, showHistorial, getDataset } from "../../controllers/DatasetController";
import { getUserId } from "../../data/Constants";
import Loader from "../../components/Loader"

function ViewHistory () {
    const [datasets, setDatasets] = useState(null);
    const userId = getUserId();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await showHistorial(userId);
            setDatasets(data);
            setLoading(false);
        }
        fetchData();
    }, [userId]);

    async function handleDownloadButton(dataset) {
        setLoading(true);
        await downloadDataset(dataset.datasetId, dataset.datasetName, dataset.version);
        setLoading(false);
    }

    async function handleDeleteButton(dataset) {
        setLoading(true);
        await deleteDataset(dataset.datasetId);
        setLoading(false);
        navigate("/user-settings/history");
    }

    async function handleDatasetButton(dataset) {
        setLoading(true);
        let result = await getDataset(dataset.datasetId);
        setLoading(false);
        navigate("/file", {state: { dataset: result}});
    }

    return (
        <div className={styles["body"]}>
            {loading && <Loader />}
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
                                        <p className={styles["entropy"]}>Eigen Entropy: {parseFloat(dataset.eigenEntropy.toFixed(3))}</p>
                                        <p className={styles["entropy"]}>Rows: {dataset.rows}</p>
                                        <p className={styles["entropy"]}>Columns: {dataset.columns}</p>
                                    </td>
                                    <td className={styles["buttons-container-td"]}>
                                        <div className={styles["buttons-container"]}>
                                            <button 
                                                className={styles["download-button"]}
                                                onClick={() => handleDownloadButton(dataset)}
                                            >
                                                <FontAwesomeIcon icon={faDownload} size="1x" />
                                            </button>
                                            <button 
                                                className={styles["trash-button"]}
                                                onClick={() => handleDeleteButton(dataset)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} size="1x" />
                                            </button>
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