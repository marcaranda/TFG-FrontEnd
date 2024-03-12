import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from './File.module.css'
import Navbar from "../../components/Navbar";
import Handsontable from "handsontable";
import 'handsontable/dist/handsontable.full.css';
import { applyFilter } from "../../controllers/DatasetController";
import { getUserId } from "../../data/Constants";

function File () {
    const container = useRef(null);
    const hotInstance = useRef(null);
    const location = useLocation();
    const userId = getUserId();
    const { dataset } = location.state || {};
    const datasetData = dataset.dataset;
    const [columnStates, setColumnStates] = useState({});
    const [filterEntropy, setFilterEntropy] = useState(null);
    const [filter, setFilter] = useState(false);
    let datasetValues = [];

    let titles = [];
    Object.keys(datasetData[1]).forEach(key => {
        Object.keys(datasetData["1"][key]).forEach(title => {
            titles.push(title);
        });
    })
    datasetValues.push(titles);
    
    useEffect(() => {
        let numColumns = titles.length;
        let initialColumnStates = {};
        for (let i = 0; i < numColumns; ++i) {
            initialColumnStates[i] = true;
        }
        setColumnStates(initialColumnStates)
        setFilterEntropy(null);
        setFilter(false);
        // eslint-disable-next-line
    }, []);

    Object.keys(datasetData).forEach(key => {
        if (typeof datasetData[key] === 'object' && datasetData[key] !== null) {
            let row = [];
            Object.keys(datasetData[key]).forEach(subKey => {
                Object.keys(datasetData[key][subKey]).forEach(valueKey => {
                    row.push(datasetData[key][subKey][valueKey]);
                });
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

        const result = await applyFilter(userId, dataset.datasetName, filterTitles);
        setFilterEntropy(result);
        setFilter(true);
    };

    return (
        <div className={styles["body"]}>
            <Navbar />
            <h1 className={styles["title"]}>Data Analysis</h1>
            <div className={styles["button-container"]}>
                <button 
                    className={styles["button"]}
                    onClick={handleFilterButton}
                >
                    Apply Filter
                </button>
            </div>
            <div ref={container} className={styles["file-container"]}></div>
            <div className={styles["entropys-container"]}>
                <div className={styles["entropy-container"]}>
                    <p className={styles["entropy-title"]}>Eigen entropy:</p>
                    <p className={styles["entropy"]}>{ dataset.eigenEntropy }</p>
                </div>
                {filter && (
                    <div className={styles["filter-entropy-container"]}>
                        <p className={styles["entropy-title"]}>Filtered Eigen entropy:</p>
                        <p className={styles["entropy"]}>{ filterEntropy }</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default File