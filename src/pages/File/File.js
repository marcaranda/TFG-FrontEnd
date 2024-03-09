import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from './File.module.css'
import Navbar from "../../components/Navbar";
import Handsontable from "handsontable";
import 'handsontable/dist/handsontable.full.css';

function File () {
    const container = useRef(null);
    const location = useLocation();
    const dataset = location.state?.dataset;

    /*const datasetValues = [
        ["", "Tesla", "Nissan", "Toyota", "Honda", "Mazda", "Ford"],
        ["2017", 10, 11, 12, 13, 15, 16],
        ["2018", 10, 11, 12, 13, 15, 16],
        ["2019", 10, 11, 12, 13, 15, 16],
        ["2020", 10, 11, 12, 13, 15, 16],
    ];*/

    useEffect(() => {
        // Inicializar Handsontable al montar el componente
        const hot = new Handsontable(container.current, {
            data: dataset,
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