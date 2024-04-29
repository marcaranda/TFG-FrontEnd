import {jwtDecode} from 'jwt-decode';

let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");
let language = localStorage.getItem("language");
let text = localStorage.getItem("text");
const url = "http://localhost:8080";
//const url = "https://tfg-backend-production-f1e5.up.railway.app";

export function setToken(newToken) {
    token = newToken;
    localStorage.setItem("token", newToken);
    let decode = jwtDecode(newToken);
    userId = decode.sub;
}

export function getToken() {
    return token;
}

export function deleteToken() {
    token = null;
    localStorage.setItem("token", null);
}

export function setUserId(newUserId) {
    userId = newUserId;
    localStorage.setItem("userId", newUserId);
}

export function getUserId() {
    return userId;
}

if (language === null) {
    language = "en";
    localStorage.setItem("language", language);
}

export function setLanguage(newLanguage) {
    language = newLanguage;
    localStorage.setItem("language", language);
    changeLanguaje(newLanguage);
}

export function getLanguage() {
    return language;
}

async function changeLanguaje(language) {
    try {
        const response = await import(`../assets/languages/${language}.json`);
        text = response.default;
        localStorage.setItem("text", text);
    } catch (error) {
        console.error("Error al cargar el archivo de idioma", error);
    }
}

export function getText() {
    return text;
}

export function getURL() {
    return url;
}