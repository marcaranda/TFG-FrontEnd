import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from './File.module.css'
import Navbar from "../../components/Navbar";
import Handsontable from "handsontable";
import 'handsontable/dist/handsontable.full.css';
import ButtonsHeader from "./ButtonsHeader";
import Info from "./Info";
import Filter from "./Filter";
import Loader from "../../components/Loader"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from "@fortawesome/free-solid-svg-icons";

function File () {
    const navigate = useNavigate();
    const container = useRef(null);
    const hotInstance = useRef(null);
    const location = useLocation();
    const { dataset } = location.state || {};
    const datasetData = dataset.dataset;
    const [columnStates, setColumnStates] = useState(() => Array(Object.keys(datasetData[1]).length).fill(true));
    const [rowStates, setRowStates] = useState(() => Array(Object.keys(datasetData).length).fill(true));
    const [filter, setFilter] = useState(false);
    const [filteredDataset, setFilteredDataset] = useState(null);
    const [info, setInfo] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [loading, setLoading] = useState(false);
    let datasetValues = [];

    let titles = [];
    Object.keys(datasetData[1]).forEach(key => {
        titles.push(datasetData[1][key].column)
    });

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
                colHeaders: function(col) {
                    if (col === 0) {
                        return titles[col];
                    }
                    else {
                        const headerValue = titles[col];
                        const buttonStyle = columnStates[col] ? '' : 'background-color: #e6adad;';
                        return `<button style="${buttonStyle}">${headerValue}</button>`;
                    }
                },
                rowHeaders: function(row) {
                    const headerValue = row + 1;
                    const buttonStyle = rowStates[row] ? '' : 'background-color: #e6adad;';
                    return `<button style="${buttonStyle}">${headerValue}</button>`;
                },
                afterOnCellMouseDown: function(event, coords) {
                    if (coords.row === -1) {
                        let newColumnStates = {...columnStates};
                        newColumnStates[coords.col] = !newColumnStates[coords.col];
                        setColumnStates(newColumnStates);
                        hotInstance.current.render();
                    }
                    else if (coords.col === -1) {
                        let newRowStates = {...rowStates};
                        newRowStates[coords.row] = !newRowStates[coords.row];
                        setRowStates(newRowStates);
                        hotInstance.current.render();
                    }
                },
                cells: function(row, col, prop) {
                    const cellProperties = {};
                    if (!columnStates[col] || !rowStates[row]) {
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

    function handleOpenFilterFileButton() {
        navigate("/file", {state: { dataset: filteredDataset}});
    }

    function handleInfoButton() {
        setInfo(true);
    }

    function handleInfoClose() {
        setInfo(false);
    }

    return (
        <div className={styles["body"]}>
            <Navbar />
            <div className={styles["header-container"]}>
                <div className={styles["left-container"]}>
                    <button 
                        className={styles["info-button"]}
                        onClick={handleInfoButton}
                    >
                        <FontAwesomeIcon icon={faInfo} size="1x" />
                    </button>
                </div>
                <div className={styles["center-container"]}>
                    <h1 className={styles["title"]}>Data Analysis</h1>
                </div>
                <div className={styles["right-container"]}></div>
            </div>
            <ButtonsHeader
                datasetId={dataset.datasetId}
                datasetName={dataset.datasetName}
                datasetVersion={dataset.version}
                titles={titles}
                columnStates={columnStates}
                rowStates={rowStates}
                setFilter={setFilter}
                setFilteredDataset={setFilteredDataset}
                setShowFilter={setShowFilter}
                setLoading={setLoading}
            />
            <div className={styles["container"]}>
                {showFilter && <Filter 
                   datasetId={dataset.datasetId}
                   setFilter={setFilter}
                   setFilteredDataset={setFilteredDataset}
                   setLoading={setLoading}
                />}
                <div ref={container} className={styles["file-container"]}></div>
            </div>
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