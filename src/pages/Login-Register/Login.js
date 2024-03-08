import React, {useState} from 'react'
import {useNavigate} from "react-router-dom";
import styles from "./LoginRegister.module.css";
import {login} from "../../controllers/UserController";
//import {setToken} from '../../data/Constants';

function Login() {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    async function loginAttempt(email, password) {
      let bool = await login(email, password);
      if(!bool){
          setError(true);
          setTimeout(()=>{
              setError(false);
          }, 3000);
      }
      else{
          //navigate("/issueList");
      }
    }
  
    /*const handleInputEnter = (event) => {
      if (event.key === "Enter") {
          loginAttempt(email, password);
      }
      else setInputValue(event.target.value);
    };*/

    const handleBackButton = () => {
        navigate("/");
      };
  
    const handleLoginButton = () => {
      loginAttempt(email, password);
    };
  
    const handleRegisterButton = () => {
      navigate("/register");
    };

    const handleInputChange = (event, inputNumber) => {
        const inputValue = event.target.value;
    
        switch (inputNumber) {
          case 1:
            setEmail(inputValue);
            break;
          case 2:
            setPassword(inputValue);
            break;
          default:
            break;
        }
      };

    return (
      <div className={styles["body"]}>
        <div className={styles["container"]}>
          <button className={styles["close-button"]} onClick={handleBackButton}>
            Back
          </button>
          <p className={styles["title"]}>Data Analysis</p>
          <input
            className={styles["input"]}
            placeholder="Enter Email"
            onChange={(event) => handleInputChange(event, 1)}
          ></input>
          <input
            className={styles["input"]}
            placeholder="Enter Password"
            onChange={(event) => handleInputChange(event, 2)}
          ></input>
          {error && <p className={styles["error"]}>Incorrect Email or Password</p>}
          <div className={styles["button-container"]}>
            <button
              className={styles["button"]}
              onClick={handleLoginButton}
            >
              Login
            </button>
            <button
              className={styles["button"]}
              onClick={handleRegisterButton}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;
