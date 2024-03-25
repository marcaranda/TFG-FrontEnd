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

export async function applySampleFilter(datasetId, improve, type, numInitialRows, numWantedRows) {
    try {
        const params = {
            numWantedRows: numWantedRows
        };
        if (numInitialRows !== null) {
            params.numInitialRows = numInitialRows;
        }
        
        let result = await axios.get("http://localhost:8080/file/filter/datasetId/" + datasetId + "/improve/" + improve + "/type/" + type, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
            params: params
        });
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export async function showHistorial(userId, order) {
    try {
        let result = await axios.get("http://localhost:8080/file/historial/userId/" + userId + "?orderBy=" + order, {
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