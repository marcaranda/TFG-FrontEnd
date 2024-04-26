import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from './File.module.css'
import Navbar from "../../components/Navbar";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Importa los estilos base
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Tema alpino

import ButtonsHeader from "./ButtonsHeader";
import Info from "./Info";
import Filter from "./Filter";
import Loader from "../../components/Loader"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { getText } from "../../data/Constants";

function File () {
    const navigate = useNavigate();
    const location = useLocation();
    const { dataset } = location.state || {};
    const datasetData = dataset.dataset;
    const rowsDenied = dataset.rowsDenied;
    const [columnStates, setColumnStates] = useState(() => Array(Object.keys(datasetData[1]).length).fill(true));
    const [rowStates, setRowStates] = useState(() => Array(Object.keys(datasetData).length).fill(false));
    const [filter, setFilter] = useState(false);
    const [filteredDataset, setFilteredDataset] = useState(null);
    const [info, setInfo] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [loading, setLoading] = useState(false);
    const text = getText();

    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const gridRef = useRef(null);

    let datasetValues = [];
    let titles = [];
    
    useEffect(() => {
        const datasetTitles = [{
            headerName: "CLEAR", 
            field: "rowNum",
            width: 80,
            pinned: 'left',
            valueGetter: "node.rowIndex + 1"
        }]
        Object.keys(datasetData[1]).forEach(key => {
            titles.push(datasetData[1][key].column)
            datasetTitles.push({ headerName: datasetData[1][key].column, field: key, sortable: false });
        });

        Object.keys(datasetData).forEach(key => {
            if (typeof datasetData[key] === 'object' && datasetData[key] !== null) {
                let row = {};
                Object.keys(datasetData[key]).forEach(subKey => {
                    row[subKey] = datasetData[key][subKey].value;
                });
                datasetValues.push(row);
            }
        });

        setRowData(datasetValues);
        setColumnDefs(datasetTitles);

        setColumnStates(Array(Object.keys(datasetData[1]).length).fill(true));
        setRowStates(Array(Object.keys(datasetData).length).fill(false));
        let newColumnStates = Array(Object.keys(datasetData[1]).length).fill(true)
        for (let i = 0; i < rowsDenied.length; i++) {
            newColumnStates[rowsDenied[i] - 1] = false;
        }
        setColumnStates(newColumnStates);
        // eslint-disable-next-line
    }, [dataset.dataset, dataset.rowsDenied]);

    function handleOpenFilterFileButton() {
        setFilter(false);
        navigate("/file", {state: { dataset: filteredDataset}});
    }

    function handleInfoButton() {
        setInfo(true);
    }

    function handleInfoClose() {
        setInfo(false);
    }

    const rowStyle = { background: 'white' };
    const cellStyle = { background: 'white' };

    const getRowStyle = params => {
        if (rowStates[params.node.rowIndex]) {
            return { backgroundColor: '#a1d690' }; // Verde cuando activado
        }
        return null;
    };

    const getCellStyle = params => {
        console.log(params);
        if (!columnStates[params.column.colId]) {
            return { backgroundColor: '#e6adad' }; // Rojo cuando desactivado
        }
        else if (rowStates[params.node.rowIndex]) {
            return { backgroundColor: '#a1d690' }; // Verde cuando activado
        }
        return null;
    };

    const onRowClicked = params => {
        if (params.column.colId === "rowNum") {
            // Clic en un rowHeader
            const newRowStates = {...rowStates};
            newRowStates[params.node.rowIndex] = !newRowStates[params.node.rowIndex];
            setRowStates(newRowStates);
        }
    };

    const onHeaderClicked = params => {
        if (params.column.colId === "rowNum") {
            setColumnStates(Array(Object.keys(datasetData[1]).length).fill(true));
            setRowStates(Array(Object.keys(datasetData).length).fill(false));
        }
        else {
            const newColumnStates = {...columnStates};
            newColumnStates[params.column.colId - 1] = !newColumnStates[params.column.colId - 1];
            setColumnStates(newColumnStates);
        }
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
                    <h1 className={styles["title"]}>{dataset.datasetName}  -  {dataset.version}</h1>
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
                setColumnStates={setColumnStates}
                setRowStates={setRowStates}
                setFilter={setFilter}
                setFilteredDataset={setFilteredDataset}
                setShowFilter={setShowFilter}
                setLoading={setLoading}
            />
            <div className={styles["container"]}>
                {showFilter && <Filter 
                   datasetId={dataset.datasetId}
                   rowStates={rowStates}
                   setFilter={setFilter}
                   setFilteredDataset={setFilteredDataset}
                   setLoading={setLoading}
                />}
                <div className="ag-theme-alpine" style={{ height: 639, width: '100%' }}>
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        cellStyle={cellStyle}
                        getCellStyle={getCellStyle}
                        onCellClicked={onRowClicked}
                        onColumnHeaderClicked={onHeaderClicked}
                    />
                </div>
            </div>
            <div className={styles["entropys-container"]}>
                <div className={styles["left-container"]}>
                    <p className={styles["entropy-title"]} text-section="file.entropyBar.eigenEntropy">{text.file.entropyBar.eigenEntropy}</p>
                    <p className={styles["entropy"]}>{parseFloat(dataset.eigenEntropy.toFixed(3))}</p>
                </div>
                {filter && (
                    <>
                        <div className={styles["center-container"]}>
                            <p className={styles["entropy-title"]} text-section="file.entropyBar.filteredEigenEntropy">{text.file.entropyBar.filteredEigenEntropy}</p>
                            <p className={styles["entropy"]}>{parseFloat(filteredDataset.eigenEntropy.toFixed(3))}</p>
                        </div>
                        <div className={styles["right-container"]}>
                            <button 
                            className={styles["filter-button"]}
                            onClick={handleOpenFilterFileButton}
                            text-section="file.entropyBar.openFilterFile"
                        >
                            {text.file.entropyBar.openFilterFile}
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