import axios from "axios"
import {getToken} from "../data/Constants"

export async function fileReader(file, userId) {
    try {
        const formData = new FormData();
        formData.append('file', file);
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

export async function applyFilter(datasetId, titlesFilter, rowStates) {
    const rowsWanted = Object.values(rowStates);    

    try {
        let result = await axios.post("http://localhost:8080/file/filter/datasetId/" + datasetId, {titlesFilter, rowsWanted}, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export async function applySampleFilter(datasetId, improve, type, numInitialRows, numWantedRows, rowStates, sliderValue) {
    try {
        let initialRows = Array.from(rowStates);
        let result = await axios.put("http://localhost:8080/file/filter/datasetId/" + datasetId + "/improve/" + improve + "/type/" + type + "?numInitialRows=" + numInitialRows + "&numWantedRows=" + numWantedRows + "&sliderValue=" + sliderValue, initialRows, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export async function showHistorial(userId, order = null, search = null, datasetName = null) {
    try {
        let url = "http://localhost:8080/file/historial/userId/" + userId;

        const params = new URLSearchParams();
        if (order) params.append('orderBy', order);
        if (search) params.append('search', search);
        if (datasetName) params.append('datasetName', datasetName);

        if (Array.from(params).length > 0) url += "?" + params.toString();

        let result = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getDataset(datasetId) {
    try {
        let result = await axios.get("http://localhost:8080/file/datasetId/" + datasetId, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export async function downloadDataset(datasetId, datasetName, version) {
    try {
        let response = await axios.get("http://localhost:8080/file/download/datasetId/" + datasetId, {
            responseType: 'blob',
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;

        if (version === 0){
            link.setAttribute('download', `${datasetName}.csv`);
        }
        else {
            link.setAttribute('download', `${datasetName}_${version}.csv`);
        }
    

        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteDataset(datasetId) {
    try {
        await axios.delete("http://localhost:8080/file/datasetId/" + datasetId, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });
    } catch (error) {
        console.error(error);
    }
}