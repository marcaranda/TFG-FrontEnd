import axios from "axios"
import { getToken, getURL } from "../data/Constants"

const url = getURL();

export async function fileReader(file, userId, rowsDenied) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        let result = await axios.post(url + "/file/userId/" + userId + "/rows/" + rowsDenied, formData, {
            headers: {
                Authorization: "Bearer " + getToken(),
                'Content-Type': 'multipart/form-data'
            },
        });
        return { success: true, result: result.data };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.response.data.message };
    }
}

export async function applyFilter(datasetId, titlesFilter, rowStates) {
    const rowsWanted = Object.values(rowStates);    

    try {
        let result = await axios.post(url + "/file/filter/datasetId/" + datasetId, {titlesFilter, rowsWanted}, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });
        return { success: true, result: result.data };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.response.data.message };
    }
}

export async function applySampleFilter(datasetId, improve, type, numInitialRows, numWantedRows, rowStates, sliderValue) {
    try {
        let initialRows = Array.from(rowStates);
        let result = await axios.put(url + "/file/filter/datasetId/" + datasetId + "/improve/" + improve + "/type/" + type + "?numInitialRows=" + numInitialRows + "&numWantedRows=" + numWantedRows + "&sliderValue=" + sliderValue, initialRows, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });
        return { success: true, result: result.data };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.response.data.message };
    }
}

export async function showHistorial(userId, order = null, search = null, datasetName = null) {
    try {
        let new_url = url + "/file/historial/userId/" + userId;

        const params = new URLSearchParams();
        if (order) params.append('orderBy', order);
        if (search) params.append('search', search);
        if (datasetName) params.append('datasetName', datasetName);

        if (Array.from(params).length > 0) new_url += "?" + params.toString();

        let result = await axios.get(new_url, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });
        return { success: true, result: result.data };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.response.data.message };
    }
}

export async function getDataset(datasetId) {
    try {
        let result = await axios.get(url + "/file/datasetId/" + datasetId, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });
        return { success: true, result: result.data };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.response.data.message };
    }
}

export async function downloadDataset(datasetId, datasetName, version) {
    try {
        let response = await axios.get(url + "/file/download/datasetId/" + datasetId, {
            responseType: 'blob',
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });

        const new_url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = new_url;

        if (version === 0){
            link.setAttribute('download', `${datasetName}.csv`);
        }
        else {
            link.setAttribute('download', `${datasetName}_${version}.csv`);
        }
    

        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.response.data.message };
    }
}

export async function deleteDataset(datasetId) {
    try {
        await axios.delete(url + "/file/datasetId/" + datasetId, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.response.data.message };
    }
}