import axios from "axios"
import { setToken, getToken } from "../data/Constants"

export async function login(email, password) {
    console.log(email);
    try {
        let result = await axios.post("http://localhost:8080/user/login", {
            email : email,
            password : password,
        });

        setToken(result.data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function register(name, email, password, phone) {
    try {
        await axios.post("http://localhost:8080/user/register", {
            name : name,
            email : email,
            password : password,
            phone : phone,
        });

        let bool = await login(email, password);
        if (bool) return true;
        else return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getUser(userId) {
    try {
        let result = await axios.get("http://localhost:8080/user/userId/" + userId, {
            headers: {
                Authorization: "Bearer " + getToken(),
              },
        });
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export async function editUser(user){
    try {
        await axios.put("http://localhost:8080/user",user,{
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function editPassword(userId, currentPassword, newPassword) {
    try {
        await axios.put("http://localhost:8080/user/userId/" + userId + "/changePassword", {
            currentPassword: currentPassword,
            newPassword: newPassword,
            headers: {
                Authorization: "Bearer " + getToken,
            },
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function deleteUser(userId) {
    try {
        await axios.delete("http://localhost:8080/user/userId/" + userId, {
            headers: {
                Authorization: "Bearer " + getToken,
            },
        });
    } catch (error) {
        console.error(error);
    }
    
}