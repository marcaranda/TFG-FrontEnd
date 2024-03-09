import React from "react";
import styles from './Profilebar.module.css'
import { useNavigate } from "react-router-dom";

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
        </div>
    );
}

export default Profilebar;