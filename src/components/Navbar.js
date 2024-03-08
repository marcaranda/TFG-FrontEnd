import React from "react";
import styles from './Navbar.module.css';
//import {useNavigate} from "react-router-dom";
import {getUserId} from "../data/Constants";

function Navbar() {
    //const navigate = useNavigate();

    function handleProfileButton(){
        //navigate("/user/userId/" + getUserId());
        console.log(getUserId());
    }
    return(
        <div className={styles['navbar']}>
            <h1 className={styles['navbar-title']}>Data Analysis</h1>
            <button 
                className={styles['navbar-button']} 
                onClick={handleProfileButton}
            >
                Profile
            </button>
        </div>
    )
}

export default Navbar;