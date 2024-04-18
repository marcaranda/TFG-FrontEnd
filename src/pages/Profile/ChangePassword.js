import React, {useState} from "react";
import styles from './ChangePassword.module.css'
import Navbar from "../../components/Navbar";
import Profilebar from "../../components/Profilebar";
import { editPassword } from "../../controllers/UserController";
import { getText } from "../../data/Constants";

function ChangePassword () {
    const [error, setError] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [currentPassword, setCP] = useState("");
    const [newPassword, setNP] = useState("");
    const [reNewPassword, setRNP] = useState("");
    const text = getText();

    async function saveAttempt() {
        if (newPassword === reNewPassword) {
            let bool = await editPassword(1, currentPassword, newPassword);
            if (!bool) {
                setError(true)
                setTimeout(() => {
                    setError(false);
                }, 3000);
            }
        }
        else {
            setErrorPassword(true)
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    }

    const handleSaveButton = () => {
        saveAttempt();
        console.log("save");
    };

    const handleInputChange = (event, inputNumber) => {
        const inputValue = event.target.value;
    
        switch (inputNumber) {
          case 1:
            setCP(inputValue);
            break;
          case 2:
            setNP(inputValue);
            break;
          case 3:
            setRNP(inputValue);
            break;
          default:
            break;
        }
      };

    return (
        <div className={styles["body"]}>
            <Navbar />
            <div className={styles["page"]}>
                <Profilebar />
                <div className={styles["container"]}>
                    <p className={styles["title"]}>{text.changePassword.title}</p>
                    <div className={styles["container-title-input"]}>
                        <p className={styles["input-title"]}>{text.changePassword.currentPassword}</p>
                        <input
                            className={styles["input"]}
                            placeholder="Current Password"
                            onChange={(event) => handleInputChange(event, 1)}
                        ></input>
                    </div>
                    <div className={styles["container-title-input"]}>
                        <p className={styles["input-title"]}>{text.changePassword.newPassword}</p>
                        <input
                            className={styles["input"]}
                            placeholder="New Password"
                            onChange={(event) => handleInputChange(event, 2)}
                        ></input>
                    </div>
                    <div className={styles["container-title-input"]}>
                        <p className={styles["input-title"]}>{text.changePassword.confirmPassword}</p>
                        <input
                            className={styles["input"]}
                            placeholder="Retype New Password"
                            onChange={(event) => handleInputChange(event, 3)}
                        ></input>
                    </div>
                    {error && <p className={styles["error"]}>Error while changing password</p>}
                    {errorPassword && <p className={styles["error"]}>Password does not match</p>}
                    <button
                        className={styles["button"]}
                        onClick={handleSaveButton}
                    >
                        Save
                    </button>
                </div>
          </div>
        </div>
    );
}

export default ChangePassword