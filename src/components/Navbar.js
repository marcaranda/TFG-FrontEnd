import React from "react";
import styles from './Navbar.module.css';
import {useNavigate} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    function handleProfileButton(){
        navigate("/user-settings/user-profile");
    }

    function handleMainButton(){
        navigate("/main");
    }

    return(
        <div className={styles['navbar']}>
            <button 
                className={styles['main-button']} 
                onClick={handleMainButton}
            >
                Data Analysis
            </button>
            <button 
                className={styles['profile-button']} 
                onClick={handleProfileButton}
            >
                Profile
            </button>
        </div>
    )
}

export default Navbar;