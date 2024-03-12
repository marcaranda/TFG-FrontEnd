import React from "react";
import {useNavigate} from "react-router-dom";
import styles from "./LoginRegister.module.css";
import logo from "../../assets/pictures/logoTFG.png";

function Initial() {
    const navigate = useNavigate();

    const handleLoginButton = () => {
        navigate("/login");
    };

    const handleRegisterButton = () => {
        navigate("/register");
    };

    return (
        <div className={styles["body"]}>
            <img src={ logo } alt="LogoIni" className={styles["logo"]}/>
            <div className={styles["container"]}>
                <p className={styles["title"]}>Data Analysis</p>
                <div className={styles["button-container"]}>
                    <button
                        className={styles["button"]}
                        onClick={handleLoginButton}
                    >
                        Login
                    </button>
                    <button
                        className={styles["button"]}
                        onClick={handleRegisterButton}
                    >
                        Register
                    </button>
                </div>
            </div>
            <img src={ logo } alt="LogoIni" className={styles["logo"]}/>
        </div>
    );
}

export default Initial