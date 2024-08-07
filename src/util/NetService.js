import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const BASE_URL = 'http://localhost:8080';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const ACCESS_TOKEN_TIMEOUT = 'ACCESS_TOKEN_TIMEOUT';
const REFRESH_TOKEN_TIMEOUT = 'REFRESH_TOKEN_TIMEOUT';
const ROLES = 'ROLES';

export const login = (loginData) => {
    const id = loginData.id;
    const pass = loginData.password;

    axios
        .post(`${BASE_URL}/api/auth/login`, { id, pass })
        .then(response => {
            saveSec(response);
            console.log();
        })
        .catch(err => {
            console.error('There was an error!', err);
        });
}

const refresh = () => {
    const sec = {
        accessToken: localStorage.getItem(ACCESS_TOKEN),
        refreshToken: localStorage.getItem(REFRESH_TOKEN),
    }
    axios
        .post(`${BASE_URL}/api/auth/refresh`, sec)
        .then(response => {
            saveSec(response);
        }).catch(err => {
            console.error();
        })
}

export const logout = () => {
    axios
        .post(`${BASE_URL}/api/auth/logout`)
        .then(res => {
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            localStorage.removeItem(ROLES);
            localStorage.removeItem(ACCESS_TOKEN_TIMEOUT);
            console.log('Complete logout');
        })
        .catch(err => {
            console.error('Fail logout');
        })
}

const saveSec = (res) => {
    const accessToken = res.data.accessToken;
    const refreshToken = res.data.refreshToken;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);

    const decodedAccessToken = jwtDecode(accessToken);
    localStorage.setItem(ROLES, decodedAccessToken.roles);
    localStorage.setItem(ACCESS_TOKEN_TIMEOUT, decodedAccessToken.exp);
}


export const hasAuth = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (accessToken != null && refreshToken != null) {
        return true;
    }
    return false;
}

export const hasRoleAdmin = () => {
    const roles = localStorage.getItem(ROLES);
    return roles.includes('A');
}

// Create an instance of Axios
export const authAxios = axios.create();
authAxios.interceptors.request.use(config => {
    const at = localStorage.getItem(ACCESS_TOKEN);
    config.headers['Authorization'] = at;
    return config;
}, error => {
    return Promise.reject(error);
});