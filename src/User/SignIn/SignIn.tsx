import { ChangeEvent, useState } from "react";
import { axiosInstance } from "../../config";
import { Link } from "react-router-dom";
import "../css/Sign.css"
import axios from "axios";

interface SignInData {
    userId : string,
    userPw : string,
    isDel : boolean
}


function SignIn(){

    //로그인 데이터 받기.
const [signData, setSignData] = useState<SignInData>({
    userId : "",
    userPw : "",
    isDel : false 
});

    //타이핑으로 스테이트 값 변경.
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignData({ ...signData, [e.target.name]: e.target.value });
  };


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        // 로그인 요청
        const response = await axiosInstance.post("/auth/signIn", signData);
        const { accessToken, refreshToken, isDel } = response.data;
        // const {isDel} = response.data;

       if(isDel){
        throw new Error("삭제된 아이디입니다.")
       }
        

    
        if (accessToken && refreshToken) {
            // 토큰 저장
            localStorage.setItem("ACCESS_TOKEN", accessToken);
            localStorage.setItem("REFRESH_TOKEN", refreshToken);
            alert("로그인 성공");
        } else {
            throw new Error("토큰이 반환되지 않았습니다.");
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log("서버 응답:", error.response); // 서버 응답 확인
    
            const errorData = error.response?.data;
            const errorMessage = typeof errorData === 'string' 
                ? errorData
                : errorData?.message || 'unknown error';
    
            alert(`로그인 실패: ${errorMessage}`);
        }
    }
    
}

    return (
        <div className="mainBackground">
        <div className="main-container">
          <form className="main-form" onSubmit={handleLogin}>
            <h2>로그인</h2>
            <input name="userId" value={signData.userId} onChange={handleChange} placeholder="아이디" />
            <input name="userPw" type="password" value={signData.userPw} onChange={handleChange} placeholder="비밀번호" />
            <button type="submit" >로그인</button>
            <Link to="/Signup"><p className='signUpBtn'>회원가입</p></Link>
          </form>
        </div>
      </div>
    )
}


export default SignIn;