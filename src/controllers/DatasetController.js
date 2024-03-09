import axios from "axios"
import {getToken} from "../data/Constants"

export async function showHistorial(userId) {
    try {
        let result = await axios.get("http://localhost:8080/file/historial/userId/" + userId, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });
        return result.data;
    } catch (error) {
        console.error(error);
    }
}