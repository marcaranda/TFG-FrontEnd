import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from './File.module.css'
import Navbar from "../../components/Navbar";
import Handsontable from "handsontable";
import 'handsontable/dist/handsontable.full.css';

function File () {
    const container = useRef(null);
    const location = useLocation();
    const { dataset } = location.state || {};
    const datasetData = dataset.dataset;

    let datasetValues = [];

    let titles = [];
    Object.keys(datasetData[1]).forEach(subKey => {
        if (subKey !== "ID") {
            titles.push(subKey);
        }
    })
    datasetValues.push(titles);

    Object.keys(datasetData).forEach(key => {
        if (typeof datasetData[key] === 'object' && datasetData[key] !== null) {
            let row = [];
            Object.keys(datasetData[key]).forEach(subKey => {
                if (subKey !== "ID") {
                    row.push(datasetData[key][subKey]);
                }
            });
            datasetValues.push(row);
        }
    });

    useEffect(() => {
        // Inicializar Handsontable al montar el componente
        const hot = new Handsontable(container.current, {
            data: datasetValues,
            rowHeaders: true,
            colHeaders: true,
            dropdownMenu: true,
            licenseKey: 'non-commercial-and-evaluation',
            // Otras opciones de configuración...
        });

        // Función de limpieza al desmontar el componente
        return () => {
            hot.destroy();
        };
    }, );

    return (
        <div className={styles["body"]}>
            <Navbar />
            <h1 className={styles["title"]}>Data Analysis</h1>
            <div ref={container} className={styles["file-container"]}>
            </div>
        </div>
    );
}

export default File