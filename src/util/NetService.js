import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { apiServerUrl } from '../res/prop';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const ACCESS_TOKEN_TIMEOUT = 'ACCESS_TOKEN_TIMEOUT';
const REFRESH_TOKEN_TIMEOUT = 'REFRESH_TOKEN_TIMEOUT';
const ROLES = 'ROLES';

//Local auth methods
const saveSec = (res) => {
    const accessToken = res.data.accessToken;
    const refreshToken = res.data.refreshToken;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);

    const decodedAccessToken = jwtDecode(accessToken);
    localStorage.setItem(ROLES, decodedAccessToken.roles);
    localStorage.setItem(ACCESS_TOKEN_TIMEOUT, decodedAccessToken.exp);
}

const refresh = () => {
    const sec = {
        accessToken: localStorage.getItem(ACCESS_TOKEN),
        refreshToken: localStorage.getItem(REFRESH_TOKEN),
    }
    axios
        .post(`${apiServerUrl}/api/auth/refresh`, sec)
        .then(response => {
            saveSec(response);
        }).catch(err => {
            console.error();
        })
}

const clearCreds = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(ROLES);
    localStorage.removeItem(ACCESS_TOKEN_TIMEOUT);
    console.log('Local credentials are dropped')
}

const getCreds = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    return {accessToken, refreshToken};
}

//Export auth methods
export const login = (loginData) => {
    const id = loginData.id;
    const pass = loginData.password;

    axios
        .post(`${apiServerUrl}/api/auth/login`, { id, pass })
        .then(response => {
            saveSec(response);
            console.log();
        })
        .catch(err => {
            console.error('There was an error!', err);
        });
}

export const logout = () => {
    clearCreds();
    return axios.post(`${apiServerUrl}/api/auth/logout`, getCreds());
}

export const hasRoleAdmin = () => {
    const roles = localStorage.getItem(ROLES);
    return roles.includes('A');
}

export const isServerAvailable = () => {
    return axios.get(`${apiServerUrl}/api/isAvailable`);
}

export const checkAuth = async () => {
    const creds = getCreds();
    if (creds.accessToken != null && creds.refreshToken != null) {
        try {
            const response = await axios.post(`${apiServerUrl}/api/auth/validate`, creds);
            return true;
        } catch(error) {
            return false;
        }
    }
    return false;
}

//Service methods
export const getUsers = (currentPage, pageSize, sortDir) => {
    return authAxios.get(`${apiServerUrl}/api/users?page=${currentPage}&size=${pageSize}&ascDir=${sortDir}`);
}

export const getUserDetails = (id) => {
    const response_promise = authAxios.get(`${apiServerUrl}/api/user?id=${id}`);
    return response_promise;
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
// --