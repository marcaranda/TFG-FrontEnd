import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from './ViewHistory.module.css'
import Navbar from "../../../components/Navbar";
import Profilebar from "../../../components/Profilebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { deleteDataset, downloadDataset, showHistorial, getDataset } from "../../../controllers/DatasetController";
import { getUserId, getText } from "../../../data/Constants";
import Loader from "../../../components/Loader"

function DatasetsHistory () {
    const [datasets, setDatasets] = useState(null);
    const [datasetName, setDatasetName] = useState(null);
    const location = useLocation();
    const userId = getUserId();
    const text = getText();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({key: null, direction: ''});

    useEffect(() => {
        function fetchData() {
            setDatasets(location.state.datasets);
            setDatasetName(location.state.datasets[0].datasetName)
        }
        fetchData();
    }, [userId, location.state.datasets]);

    async function handleDownloadButton(dataset) {
        setLoading(true);
        await downloadDataset(dataset.datasetId, dataset.datasetName, dataset.version);
        setLoading(false);
    }

    async function handleDeleteButton(dataset) {
        setLoading(true);
        await deleteDataset(dataset.datasetId);
        setDatasets(datasets.filter(d => d.datasetId !== dataset.datasetId));
        setLoading(false);
    }

    useEffect(() => {
        if (datasets && datasets.length === 0) {
            navigate("/user-settings/history");
        }
    }, [datasets, navigate]);

    async function handleDatasetButton(dataset) {
        setLoading(true);
        let result = await getDataset(dataset.datasetId);
        setLoading(false);
        navigate("/file", {state: { dataset: result}});
    }

    async function handleOrderButton(key) {
        setLoading(true);
        let direction = '';
        if (order.key === key && order.direction === '') {
            direction = '-';
        }
        setOrder({ key, direction });
        const data = await showHistorial(userId, direction + key, null, datasetName);
        setDatasets(data[datasetName]);
        setLoading(false);
    }

    return (
        <div className={styles["body"]}>
            {loading && <Loader />}
            <Navbar />
            <div className={styles["page"]}>
                <Profilebar />
                <div className={styles["container"]}>
                    <p className={styles["title"]}>{text.viewHistory.title}</p>
                    <table className={styles["dataset-list"]}>
                        <thead>
                            <tr>
                                <th className={styles["th"]}>
                                    <button 
                                        className={styles["header-button"]}
                                        onClick={() => handleOrderButton("name")}
                                    >
                                        {text.viewHistory.name} {order.key === "name" && (order.direction === '' ? 
                                            <FontAwesomeIcon icon={faArrowUp} size="1x" /> :
                                            <FontAwesomeIcon icon={faArrowDown} size="1x" />)}
                                    </button>
                                </th>
                                <th className={styles["th1"]}>
                                    <button 
                                        className={styles["header-button"]}
                                        onClick={() => handleOrderButton("entropy")}
                                    >
                                        {text.viewHistory.entropy} {order.key === "entropy" && (order.direction === '' ? 
                                            <FontAwesomeIcon icon={faArrowUp} size="1x" /> :
                                            <FontAwesomeIcon icon={faArrowDown} size="1x" />)}
                                    </button>
                                </th>
                                <th className={styles["th1"]}>
                                    <button 
                                        className={styles["header-button"]}
                                        onClick={() => handleOrderButton("row")}
                                    >
                                        {text.viewHistory.rows} {order.key === "row" && (order.direction === '' ? 
                                            <FontAwesomeIcon icon={faArrowUp} size="1x" /> :
                                            <FontAwesomeIcon icon={faArrowDown} size="1x" />)}
                                    </button>
                                </th>
                                <th className={styles["th1"]}>
                                    <button 
                                        className={styles["header-button"]}
                                        onClick={() => handleOrderButton("column")}
                                    >
                                        {text.viewHistory.columns} {order.key === "column" && (order.direction === '' ? 
                                            <FontAwesomeIcon icon={faArrowUp} size="1x" /> :
                                            <FontAwesomeIcon icon={faArrowDown} size="1x" />)}
                                    </button>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {datasets &&
                                datasets.map((dataset) => (
                                <tr key={`${dataset.datasetName}_${dataset.version}`} className={styles["dataset-container"]}>
                                    <td>
                                        <button
                                            className={styles["dataset-name-button"]}
                                            onClick={() => handleDatasetButton(dataset)}
                                        >
                                            {dataset.version === 0 ? dataset.datasetName : `${dataset.datasetName}_${dataset.version}`}
                                        </button>
                                    </td>
                                    <td>
                                        {parseFloat(dataset.eigenEntropy.toFixed(3))}
                                    </td>
                                    <td>
                                        {dataset.rows}
                                    </td>
                                    <td>
                                        {dataset.columns}
                                    </td>
                                    <td>
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

export default DatasetsHistory