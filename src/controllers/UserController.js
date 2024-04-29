import axios from "axios"
import { setToken, getToken, getURL } from "../data/Constants"

const url = getURL();

export async function login(email, password) {
    try {
        let result = await axios.post(url + "/user/login", {
            email : email,
            password : password,
        });

        setToken(result.data);
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

export async function register(name, email, password, phone) {
    try {
        await axios.post(url + "/user/register", {
            name : name,
            email : email,
            password : password,
            phone : phone,
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.response.data.message };
    }
}

export async function getUser(userId) {
    try {
        let result = await axios.get(url + "/user/userId/" + userId, {
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
        await axios.put(url + "/user",user,{
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
        await axios.put(url + "/user/userId/" + userId + "/changePassword", {
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
        await axios.delete(url + "/user/userId/" + userId, {
            headers: {
                Authorization: "Bearer " + getToken,
            },
        });
    } catch (error) {
        console.error(error);
    }
    
}