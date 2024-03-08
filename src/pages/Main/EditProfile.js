import React from "react";
//import {useNavigate} from "react-router-dom";
import styles from './EditProfile.module.css'


function EditProfile () {
    //const navigate = useNavigate();

    const handleButtonClick = () => {
        //navigate("/page")
        console.log("Ok");
    };

    return (
        <div className={styles["body"]}>
            <div className={styles["container"]}>
                <button 
                    className={styles["button"]}
                    onClick={handleButtonClick}
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
}

export default EditProfile