import React, { useState } from "react";
import { Toaster, toast } from 'sonner'
import styles from './ChangePassword.module.css'
import Navbar from "../../components/Navbar";
import Profilebar from "../../components/Profilebar";
import { editPassword } from "../../controllers/UserController";
import { getText } from "../../data/Constants";

function ChangePassword () {
    const [currentPassword, setCP] = useState("");
    const [newPassword, setNP] = useState("");
    const [reNewPassword, setRNP] = useState("");
    const text = getText();

    async function handleSaveButton () {
        if (newPassword === reNewPassword) {
            const result = await editPassword(1, currentPassword, newPassword);
            if (!result.success) {
                toast.error(result.message);
            }
        }
        else {
            toast.error(text.changePassword.errorMatchPasswords);
        }
    }

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
            <Toaster position="top-center" />
            <Navbar />
            <div className={styles["page"]}>
                <Profilebar />
                <div className={styles["container"]}>
                    <p className={styles["title"]} text-section="changePassword.title">{text.changePassword.title}</p>
                    <div className={styles["container-title-input"]}>
                        <p className={styles["input-title"]} text-section="changePassword.currentPassword">{text.changePassword.currentPassword}</p>
                        <input
                            className={styles["input"]}
                            placeholder={text.changePassword.currentPassword}
                            onChange={(event) => handleInputChange(event, 1)}
                        ></input>
                    </div>
                    <div className={styles["container-title-input"]}>
                        <p className={styles["input-title"]} text-section="changePassword.newPassword">{text.changePassword.newPassword}</p>
                        <input
                            className={styles["input"]}
                            placeholder={text.changePassword.newPassword}
                            onChange={(event) => handleInputChange(event, 2)}
                        ></input>
                    </div>
                    <div className={styles["container-title-input"]}>
                        <p className={styles["input-title"]} text-section="changePassword.confirmPassword">{text.changePassword.confirmPassword}</p>
                        <input
                            className={styles["input"]}
                            placeholder={text.changePassword.confirmPassword}
                            onChange={(event) => handleInputChange(event, 3)}
                        ></input>
                    </div>
                    <button
                        className={styles["button"]}
                        onClick={handleSaveButton}
                        text-section="changePassword.save"
                    >
                        {text.changePassword.save}
                    </button>
                </div>
          </div>
        </div>
    );
}

export default ChangePassword