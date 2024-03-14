import React from "react";
import loader from "../assets/pictures/Loader.gif"
import styles from "./Loader.module.css"

function Loader() {
    return (
        <div className={styles["loader-container"]}>
            <img src={ loader } alt="Loader Gif"/>
        </div>
    )
}

export default Loader;