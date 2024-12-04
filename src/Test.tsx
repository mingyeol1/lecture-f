import React, { useEffect, useState } from "react";
import { axiosInstance } from "./config"; // 위에서 만든 axiosInstance를 import

const Test = () => {
    const [message, setMessage] = useState<string>(""); // API 응답을 저장할 상태

    useEffect(() => {
        // API 호출
        axiosInstance
            .get("test") // GET 요청
            .then((response) => {
                // 성공 시
                setMessage(response.data); // 응답 데이터 설정
            })
            .catch((error) => {
                // 실패 시
                console.error("Error fetching test API:", error);
                setMessage("Failed to fetch data");
            });
    }, []);

    return (
        <div>
            <h1>백엔드 데이트 응답확인</h1>
            <p>{message}</p>
        </div>
    );
};

export default Test;