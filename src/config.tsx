import axios from "axios";


const API_URL = 'http://localhost:8080/api';

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
    withCredentials: true,       // 쿠키 및 인증 정보 포함
    baseURL: API_URL,           //설정한 URL주소
    headers: { 'Content-Type': 'application/json' },    // JSON 데이터 타입 명시
});

