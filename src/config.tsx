import axios from "axios";


const API_URL = 'http://localhost:8080/api';

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

