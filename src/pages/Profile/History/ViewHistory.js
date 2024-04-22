import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './ViewHistory.module.css'
import Navbar from "../../../components/Navbar";
import Profilebar from "../../../components/Profilebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { showHistorial } from "../../../controllers/DatasetController";
import { getUserId, getText } from "../../../data/Constants";
import Loader from "../../../components/Loader"

function ViewHistory () {
    const [datasets, setDatasets] = useState(null);
    const [datasetsNames, setDatasetsNames] = useState(null);
    const userId = getUserId();
    const text = getText();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await showHistorial(userId, "name");
            setDatasets(data);
            setDatasetsNames(Object.keys(data));
            setLoading(false);
        }
        fetchData();
    }, [userId]);

    async function handleDatasetButton(dataset) {
        navigate("/user-settings/history/datasets", {state: { datasets: datasets[dataset]}});
    }

    const handleSearchInputChange = (event) => {
        setSearch(event.target.value);
    };

    async function handleSearchButton() {
        setLoading(true);
        const data = await showHistorial(userId, null, search);
        setDatasetsNames(Object.keys(data));
        setLoading(false);   
    }

    async function handleSearchEnter(event) {
        if (event.key === 'Enter') {
            setLoading(true);
            const data = await showHistorial(userId, null, search);
            setDatasetsNames(Object.keys(data));
            setLoading(false);   
        }  
    }

    return (
        <div className={styles["body"]}>
            {loading && <Loader />}
            <Navbar />
            <div className={styles["page"]}>
                <Profilebar />
                <div className={styles["container"]}>
                    <div className={styles["title-container"]}>
                        <p className={styles["title"]}>{text.viewHistory.title}</p>
                    </div>
                    <div className={styles["input-container"]}>
                        <input
                            className={styles["input"]}
                            type="text"
                            onChange={(event) => handleSearchInputChange(event)}
                            onKeyDown={(event) => {handleSearchEnter(event)}}
                        ></input>
                        <button 
                            className={styles["search-button"]} 
                            onClick={handleSearchButton}
                        >
                            <FontAwesomeIcon icon={faSearch} size="1x" />
                        </button>
                    </div>  
                    <table className={styles["dataset-list"]}>
                        <thead>
                            <tr>
                                <th className={styles["th"]}>
                                    <h1 className={styles["header-button"]}>{text.viewHistory.folderName}</h1>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {datasetsNames &&
                                datasetsNames.map((dataset) => (
                                <tr key={dataset} className={styles["dataset-container"]}>
                                    <td>
                                        <button
                                            className={styles["dataset-name-button"]}
                                            onClick={() => handleDatasetButton(dataset)}
                                        >
                                            {dataset}
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