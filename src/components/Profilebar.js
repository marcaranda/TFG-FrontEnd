import React from "react";
import styles from './Profilebar.module.css'
import { useNavigate } from "react-router-dom";
import { deleteToken } from "../data/Constants";

function Profilebar() {
    const navigate = useNavigate();

    function handleSettingsButton() {
        navigate("/user-settings/user-profile");
    }

    function handlePasswordButton() {
        navigate("/user-settings/change-password");
    }

    function handleHistorialButton() {
        navigate("/user-settings/history");
    }

    const handleBackButton = () => {
        deleteToken();
        navigate("/");
    };

    return (
        <div className={styles["profilebar"]}>
            <button
                className={styles["button"]}
                onClick={handleSettingsButton}
            >
                User Settings
            </button>
            <button
                className={styles["button"]}
                onClick={handlePasswordButton}
            >
                Change Password
            </button>
            <button
                className={styles["button"]}
                onClick={handleHistorialButton}
            >
                View History
            </button>
            <button
                className={styles["logout-button"]}
                onClick={handleBackButton}
            >
                Log Out
            </button>
        </div>
    );
}

export default Profilebar;