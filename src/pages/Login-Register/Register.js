import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./LoginRegister.module.css";
import {register} from "../../controllers/UserController";
import logo from "../../assets/pictures/logoTFG.png"

function Register() {
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
  
    async function registerAttempt() {
      let bool = await register(name, email, password, phone);
      if (!bool) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      } else {
        navigate("/main");
      }
    }
  
    const handleBackButton = () => {
      navigate("/");
    };
  
    const handleInputChange = (event, inputNumber) => {
      const inputValue = event.target.value;
  
      switch (inputNumber) {
        case 1:
          setName(inputValue);
          break;
        case 2:
          setEmail(inputValue);
          break;
        case 3:
          setPassword(inputValue);
          break;
        case 4:
          setPhone(inputValue);
          break;
        default:
          break;
      }
    };
  
    const handleRegisterButton = () => {
      registerAttempt();
    };
  
    return (
      <div className={styles["body"]}>
        <img src={ logo } alt="LogoIni" className={styles["logo"]}/>
        <div className={styles["container"]}>
          <button className={styles["close-button"]} onClick={handleBackButton}>
            Back
          </button>
          <p className={styles["title"]}>Data Analysis</p>
          <input
            className={styles["input"]}
            placeholder="Enter Name"
            onChange={(event) => handleInputChange(event, 1)}
          ></input>
          <input
            className={styles["input"]}
            placeholder="Enter Email"
            onChange={(event) => handleInputChange(event, 2)}
          ></input>
          <input
            className={styles["input"]}
            placeholder="Enter Password"
            onChange={(event) => handleInputChange(event, 3)}
          ></input>
          <input
            className={styles["input"]}
            placeholder="Enter Phone Number"
            onChange={(event) => handleInputChange(event, 4)}
          ></input>
          {error && <p className={styles["error"]}>Error while registering</p>}
          <button
            className={styles["button"]}
            onClick={handleRegisterButton}
          >
            Register
          </button>
        </div>
        <img src={ logo } alt="LogoIni" className={styles["logo"]}/>
      </div>
    );
  }
  
  export default Register;