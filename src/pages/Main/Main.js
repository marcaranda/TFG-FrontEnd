import React from "react";
import styles from './Main.module.css'
import NewFile from "./NewFile";
import ViewHistorial from "./ViewHistorial";
import Navbar from "../../components/Navbar";
import { getText } from "../../data/Constants";

function Main () {
    const text = getText();

    return (
        <div className={styles["body"]}>
            <Navbar />
            <div className={styles["page"]}>
                <div className={styles["half-body"]}>
                    <h1 className={styles["page-title"]}>{text.main.title}</h1>
                    <NewFile />
                    <ViewHistorial />
                </div>
                <div className={styles["half-body"]}>
                    <h1 className={styles["page-title"]}>Image</h1>
                </div>
            </div>
        </div>
    );
}

export default Main