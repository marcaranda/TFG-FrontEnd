import axios from "axios"
import {getToken} from "../data/Constants"

export async function fileReader(file, userId) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        console.log("ok");

        let result = await axios.post("http://localhost:8080/file/userId/" + userId, formData, {
            headers: {
                Authorization: "Bearer " + getToken(),
                'Content-Type': 'multipart/form-data'
            },
        });
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

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

export async function downloadDataset(datasetName, version) {
    try {
        let response = await axios.get("http://localhost:8080/file/download/datasetName/" + datasetName + "/version/" + version, {
            responseType: 'blob',
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', `${datasetName}_${version}.csv`);

        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteDataset(userId, datasetName, version) {
    try {
        await axios.delete("http://localhost:8080/file/userId/" + userId + "/datasetName/" + datasetName + "/version/" + version, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });
    } catch (error) {
        console.error(error);
    }
}