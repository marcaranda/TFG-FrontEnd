import React from "react";
import styles from './Navbar.module.css';
import {useNavigate} from "react-router-dom";
import logo from '../assets/pictures/logoTFG_NL.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { setLanguage } from '../data/Constants';
import DropDown from "./DropDown";

function Navbar() {
    const navigate = useNavigate();
    const textsToChange = document.querySelectorAll("[text-section]");

    function handleProfileButton(){
        navigate("/user-settings/user-profile");
    }

    function handleMainButton(){
        navigate("/main");
    }

    const handleLanguageButton = async (language) => {
        setLanguage(language.value);

        const response = await import(`../assets/languages/${language.value}.json`);
        const text = response.default;

        for (const textToChange of textsToChange) {
            const textKey = textToChange.getAttribute("text-section");
            
            let value = text;
            const keys = textKey.split(".");
            for (const key of keys) {
                if (value[key] === undefined) {
                    value = null;
                    break;
                }
                value = value[key];
            }

            textToChange.textContent = value;
        }
    };


    return(
        <div className={styles['navbar']}>
            <button 
                className={styles['main-button']} 
                onClick={handleMainButton}
            >
                <img src={ logo } alt="Logo" className={styles["logo"]}/>
            </button>
            <DropDown
                onSelect={handleLanguageButton}
                options={[
                    { value: 'es', label: 'Español', icon: '../assets/pictures/es.svg' },
                    { value: 'en', label: 'English', icon: '../assets/pictures/en.svg'},
                    { value: 'cat', label: 'Català', icon: '../assets/pictures/es-ct.svg'}
                  ]}
                predeterminated={{ value: 'en', label: 'English' }}
            />
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