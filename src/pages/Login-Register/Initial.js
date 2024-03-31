import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Initial.module.css";
import { login, register } from "../../controllers/UserController";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Initial() {
    const [errorLogIn, setErrorLogIn] = useState(false);
    const [errorRegister, setErrorRegister] = useState(false);
    const [nameRegister, setNameRegister] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [phoneRegister, setPhoneRegister] = useState("");
    const [visibleRegister, setVisibleRegister] = useState(true);
    const [emailLogIn, setEmailLogIn] = useState("");
    const [passwordLogIn, setPasswordLogIn] = useState("");
    const [visibleLogIn, setVisibleLogIn] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    async function handleRegisterButton(event) {
        event.preventDefault();
        let bool = await register(nameRegister, emailRegister, passwordRegister, phoneRegister);
        if (!bool) {
            setErrorRegister(true);
          setTimeout(() => {
            setErrorRegister(false);
          }, 3000);
        } else {
          navigate("/main");
        }
    }

    async function handleLoginButton(event) {
        event.preventDefault();
        let bool = await login(emailLogIn, passwordLogIn);
        if(!bool){
            setErrorLogIn(true);
            setTimeout(()=>{
                setErrorLogIn(false);
            }, 3000);
        }
        else{
            navigate("/main");
        }
    }

    const handleChangePage = () => {
        setIsActive(!isActive);
    };

    const handleVisibleLogIn = (event) => {
        event.preventDefault();
        setVisibleLogIn(!visibleLogIn);
    };

    const handleVisibleRegister = (event) => {
        event.preventDefault();
        setVisibleRegister(!visibleRegister);
    };

    const handleRegisterInputChange = (event, inputNumber) => {
        const inputValue = event.target.value;
    
        switch (inputNumber) {
          case 1:
            setNameRegister(inputValue);
            break;
          case 2:
            setEmailRegister(inputValue);
            break;
          case 3:
            setPasswordRegister(inputValue);
            break;
          case 4:
            setPhoneRegister(inputValue);
            break;
          default:
            break;
        }
      };

      const handleLogInInputChange = (event, inputNumber) => {
        const inputValue = event.target.value;
    
        switch (inputNumber) {
          case 1:
            setEmailLogIn(inputValue);
            break;
          case 2:
            setPasswordLogIn(inputValue);
            break;
          default:
            break;
        }
      };

    return (
        <div className={styles["body"]}>
            <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
                <div className={styles['form-container']}>
                    <div className={styles["sign-up"]}>
                        <form className={styles["form"]}>
                            <h1>Create Account</h1>
                            <span>use your email for registration</span>
                            <input
                                className={styles["input"]}
                                placeholder="Name"
                                type="text"
                                onChange={(event) => handleRegisterInputChange(event, 1)}
                            ></input>
                            <input
                                className={styles["input"]}
                                placeholder="Email"
                                type="email"
                                onChange={(event) => handleRegisterInputChange(event, 2)}
                            ></input>
                            <div className={styles["password-container"]}>
                                <input
                                    className={styles["input"]}
                                    placeholder="Password"
                                    type={visibleRegister ? "text" : "password"}
                                    onChange={(event) => handleRegisterInputChange(event, 3)}
                                ></input>
                                <span
                                    className={styles["eye-button"]}
                                    onClick={handleVisibleRegister}
                                >
                                    {visibleRegister ? <FontAwesomeIcon icon={faEyeSlash} size="1x" /> : <FontAwesomeIcon icon={faEye} size="1x" />}
                                </span>
                            </div>
                            <input
                                className={styles["input"]}
                                placeholder="Phone Number"
                                type="text"
                                onChange={(event) => handleRegisterInputChange(event, 4)}
                            ></input>
                            {errorRegister && <p className={styles["error"]}>Error while registering</p>}
                            <button
                                className={styles["button"]}
                                onClick={handleRegisterButton}
                            >
                                sign up
                            </button>
                        </form>
                    </div>
                </div>
                <div className={styles['form-container']}>
                    <div className={styles["sign-in"]}>
                        <form className={styles["form"]}>
                            <h1>Sign In</h1>
                            <span>use your account</span>
                            <input
                                className={styles["input"]}
                                placeholder="Email"
                                type="email"
                                onChange={(event) => handleLogInInputChange(event, 1)}
                            ></input>
                            <div className={styles["password-container"]}>
                                <input
                                    className={styles["input"]}
                                    placeholder="Password"
                                    type={visibleLogIn ? "text" : "password"}
                                    onChange={(event) => handleLogInInputChange(event, 2)}
                                ></input>
                                <span
                                    className={styles["eye-button"]}
                                    onClick={handleVisibleLogIn}
                                >
                                    {visibleLogIn ? <FontAwesomeIcon icon={faEyeSlash} size="1x" /> : <FontAwesomeIcon icon={faEye} size="1x" />}
                                </span>
                            </div>
                            {errorLogIn && <p className={styles["error"]}>Incorrect Email or Password</p>}
                            <button
                                className={styles["button"]}
                                onClick={handleLoginButton}
                            >
                                sign in
                            </button>
                        </form>
                    </div>
                </div>
                <div className={styles["toggle-container"]}>
                    <div className={styles["toggle"]}>
                        <div className={styles["toggle-panel-left"]}>
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button
                                    className={styles["button-hidden"]}
                                    onClick={handleChangePage}
                                >
                                    Sign In
                                </button>
                        </div>
                        <div className={styles["toggle-panel-right"]}>
                                <h1>Hello, Friend!</h1>
                                <p>Register with your personal details to use all of site features</p>
                                <button
                                    className={styles["button-hidden"]}
                                    onClick={handleChangePage}
                                >
                                    Sign Up
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Initial