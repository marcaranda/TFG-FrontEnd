import React, { useEffect, useState } from "react";
import styles from './UserSettings.module.css'
import Navbar from "../../components/Navbar";
import Profilebar from "../../components/Profilebar";
import { editUser, getUser } from "../../controllers/UserController";
import { getUserId, getText } from "../../data/Constants";
import { useNavigate } from "react-router-dom";

function UserSettings () {
    const navigate = useNavigate();
    const userId = getUserId();
    const text = getText();
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUserFunction(){
            const result = await getUser(userId);
            setUser(result);
            setName(result?.name);
            setEmail(result?.email);
            setPhone(result?.phone);
        }
        getUserFunction()
    }, [userId]);

    async function saveAttempt() {
        const userAux = {
            ...user,
            "name": name,
            "email": email,
            "phone": phone,
        }

        let bool = await editUser(userAux);
        if (!bool) {
            setError(true)
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
        else {
            navigate("/user-settings/user-profile");
        }
    }

    const handleSaveButton = () => {
        saveAttempt();
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
            setPhone(inputValue);
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
                    <p className={styles["title"]} text-section="userSettings.title">{text.userSettings.title}</p>
                    <div className={styles["container-title-input"]}>
                        <p className={styles["input-title"]} text-section="userSettings.name">{text.userSettings.name}</p>
                        <input
                            className={styles["input"]}
                            value={name}
                            onChange={(event) => handleInputChange(event, 1)}
                        ></input>
                    </div>
                    <div className={styles["container-title-input"]}>
                        <p className={styles["input-title"]} text-section="userSettings.email">{text.userSettings.email}</p>
                        <input
                            className={styles["input"]}
                            value={email}
                            onChange={(event) => handleInputChange(event, 2)}
                        ></input>
                    </div>
                    <div className={styles["container-title-input"]}>
                    <p className={styles["input-title"]} text-section="userSettings.phone">{text.userSettings.phone}</p>
                        <input
                            className={styles["input"]}
                            value={phone}
                            onChange={(event) => handleInputChange(event, 3)}
                        ></input>
                    </div>
                    {error && <p className={styles["error"]} text-section="userSettings.errorEditUser">{text.userSettings.errorEditUser}</p>}
                    <button
                        className={styles["button"]}
                        onClick={handleSaveButton}
                        text-section="userSettings.save"
                    >
                        {text.userSettings.save}
                    </button>
                </div>
          </div>
        </div>
    );
}

export default UserSettings