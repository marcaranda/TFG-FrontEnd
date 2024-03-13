import {jwtDecode} from 'jwt-decode';

let token = localStorage.getItem("token");
let userId = localStorage.getItem("userId");

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