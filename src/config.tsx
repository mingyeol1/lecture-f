import axios from "axios";

const API_URL = 'http://localhost:8080/api';

// 기본 axios 인스턴스 (로그인용)
export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// 인증이 필요한 요청을 위한 axios 인스턴스
export const authAxiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// 인증용 인스턴스에 인터셉터 추가
authAxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) {
            throw new Error('No token found');
        }
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);