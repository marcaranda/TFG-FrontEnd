import React from "react";
import styles from './Navbar.module.css';
import {useNavigate} from "react-router-dom";
import logo from '../assets/pictures/logoTFG_NL.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
                <img src={ logo } alt="Logo" className={styles["logo"]}/>
            </button>
            <button 
                className={styles['profile-button']} 
                onClick={handleProfileButton}
            >
                <FontAwesomeIcon icon={faUser} size="1x" />
            </button>
        </div>
    )
}

export default Navbar;