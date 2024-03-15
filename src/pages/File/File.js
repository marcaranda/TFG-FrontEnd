import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from './File.module.css'
import Navbar from "../../components/Navbar";
import Handsontable from "handsontable";
import 'handsontable/dist/handsontable.full.css';
import { applyFilter, downloadDataset, deleteDataset } from "../../controllers/DatasetController";
import { getUserId } from "../../data/Constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash, faInfo } from "@fortawesome/free-solid-svg-icons";
import Info from "./Info"
import Loader from "../../components/Loader"

function File () {
    const navigate = useNavigate();
    const container = useRef(null);
    const hotInstance = useRef(null);
    const location = useLocation();
    const userId = getUserId();
    const { dataset } = location.state || {};
    const datasetData = dataset.dataset;
    const [columnStates, setColumnStates] = useState({});
    const [filter, setFilter] = useState(false);
    const [info, setInfo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filteredDataset, setFilteredDataset] = useState(null);
    let datasetValues = [];

    let titles = [];
    Object.keys(datasetData[1]).forEach(key => {
        titles.push(datasetData[1][key].column)
    });
    datasetValues.push(titles);
    
    useEffect(() => {
        let numColumns = titles.length;
        let initialColumnStates = {};
        for (let i = 0; i < numColumns; ++i) {
            initialColumnStates[i] = true;
        }
        setColumnStates(initialColumnStates)
        setFilter(false);
        // eslint-disable-next-line
    }, [dataset]);

    Object.keys(datasetData).forEach(key => {
        if (typeof datasetData[key] === 'object' && datasetData[key] !== null) {
            let row = [];
            Object.keys(datasetData[key]).forEach(subKey => {
                row.push(datasetData[key][subKey].value);
            });
            datasetValues.push(row);
        }
    });

    useEffect(() => {
        if (!hotInstance.current) {
            // Inicializar Handsontable al montar el componente
            hotInstance.current = new Handsontable(container.current, {
                data: datasetValues,
                rowHeaders: true,
                colHeaders: function(col) {
                    const headerValue = Handsontable.helper.spreadsheetColumnLabel(col);
                    const buttonStyle = columnStates[col] ? '' : 'background-color: #e6adad;';
                    return `<button style="${buttonStyle}">${headerValue}</button>`;
                },
                afterOnCellMouseDown: function(event, coords) {
                    if (coords.row === -1) {
                        let newColumnStates = {...columnStates};
                        newColumnStates[coords.col] = !newColumnStates[coords.col];
                        setColumnStates(newColumnStates);
                        hotInstance.current.render();
                    }
                },
                cells: function(row, col, prop) {
                    const cellProperties = {};
                    if (!columnStates[col]) {
                        cellProperties.renderer = function(instance, td, row, col, prop, value, cellProperties) {
                            Handsontable.renderers.TextRenderer.apply(this, arguments);
                            td.style.backgroundColor = '#e6adad';
                        };
                    } else {
                        cellProperties.renderer = function(instance, td, row, col, prop, value, cellProperties) {
                            Handsontable.renderers.TextRenderer.apply(this, arguments);
                            td.style.backgroundColor = '';
                        };
                    }
                    return cellProperties;
                },
                licenseKey: 'non-commercial-and-evaluation',
                type: 'numeric'
                // Otras opciones de configuración...
            });
        }

        // Función de limpieza al desmontar el componente
        return () => {
            if (hotInstance.current) {
                hotInstance.current.destroy();
                hotInstance.current = null;
            }
        };
    }, );

    async function handleFilterButton() {
        let filterTitles = [];
        
        for (let i = 0; i < titles.length; ++i) {
            if (columnStates[i]) {
                filterTitles.push(hotInstance.current.getDataAtCell(0, i));
            }
        }

        setLoading(true);
        const result = await applyFilter(userId, dataset.datasetName, dataset.version, filterTitles);
        setLoading(false);
        setFilteredDataset(result);
        setFilter(true);
    };

    async function handleDownloadButton(dataset) {
        await downloadDataset(userId, dataset.datasetName, dataset.version);
    }

    async function handleDeleteButton(dataset) {
        await deleteDataset(userId, dataset.datasetName, dataset.version);
        navigate("/user-settings/history")
    }

    function handleHistorialButton() {
        navigate("/user-settings/history");
    }

    function handleInfoButton() {
        setInfo(true);
    }

    function handleInfoClose() {
        setInfo(false);
    }

    function handleOpenFilterFileButton() {
        navigate("/file", {state: { dataset: filteredDataset}});
    }

    return (
        <div className={styles["body"]}>
            <Navbar />
            <h1 className={styles["title"]}>Data Analysis</h1>
            <div className={styles["buttons-header-container"]}>
                <div className={styles["left-container"]}>
                    <button 
                        className={styles["info-button"]}
                        onClick={handleInfoButton}
                    >
                        <FontAwesomeIcon icon={faInfo} size="1x" />
                    </button>
                    <button 
                        className={styles["history-button"]}
                        onClick={handleHistorialButton}
                    >
                        View History
                    </button>
                </div>
                <div className={styles["center-container"]}>
                    <button 
                        className={styles["filter-button"]}
                        onClick={handleFilterButton}
                    >
                        Apply Filter
                    </button>
                </div>
                <div className={styles["right-container"]}>
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
            </div>
            <div ref={container} className={styles["file-container"]}></div>
            <div className={styles["entropys-container"]}>
                <div className={styles["left-container"]}>
                    <p className={styles["entropy-title"]}>Eigen entropy:</p>
                    <p className={styles["entropy"]}>{parseFloat(dataset.eigenEntropy.toFixed(3))}</p>
                </div>
                {filter && (
                    <>
                        <div className={styles["center-container"]}>
                            <p className={styles["entropy-title"]}>Filtered Eigen entropy:</p>
                            <p className={styles["entropy"]}>{parseFloat(filteredDataset.eigenEntropy.toFixed(3))}</p>
                        </div>
                        <div className={styles["right-container"]}>
                            <button 
                            className={styles["filter-button"]}
                            onClick={handleOpenFilterFileButton}
                        >
                            Open Filter File
                        </button>
                        </div>
                    </>
                )}
            </div>
            {info && <Info onClose={handleInfoClose}/>}
            {loading && <Loader />}
        </div>
    );
}

export default File