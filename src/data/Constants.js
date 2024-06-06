import {jwtDecode} from 'jwt-decode';

let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");
let language = localStorage.getItem("language");
let text = localStorage.getItem("text");
let top = localStorage.getItem("top");
let left = localStorage.getItem("left");
const url = "https://eigenentropydataanalysis-949983df6ec8.herokuapp.com";

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

export function setTop(newTop) {
    top = newTop;
    localStorage.setItem("top", newTop);
}

export function getTop() {
    return top;
}

export function setLeft(newLeft) {
    left = newLeft;
    localStorage.setItem("left", newLeft);
}

export function getLeft() {
    return left;
}

export function getText() {
    return text;
}

export function getURL() {
    return url;
}