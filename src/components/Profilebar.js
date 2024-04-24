import React from "react";
import styles from './Profilebar.module.css'
import { useNavigate } from "react-router-dom";
import { deleteToken, getText } from "../data/Constants";

function Profilebar() {
    const navigate = useNavigate();
    const text = getText();

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
                text-section="profileBar.userSettings"
            >
                {text.profileBar.userSettings}
            </button>
            <button
                className={styles["button"]}
                onClick={handlePasswordButton}
                text-section="profileBar.changePassword"
            >
                {text.profileBar.changePassword}
            </button>
            <button
                className={styles["button"]}
                onClick={handleHistorialButton}
                text-section="profileBar.viewHistory"
            >
                {text.profileBar.viewHistory}
            </button>
            <button
                className={styles["logout-button"]}
                onClick={handleBackButton}
                text-section="profileBar.logout"
            >
                {text.profileBar.logout}
            </button>
        </div>
    );
}

export default Profilebar;