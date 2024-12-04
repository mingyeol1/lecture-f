import { ChangeEvent, useState } from "react";
import { axiosInstance } from "../../config";
import { Link } from "react-router-dom";
import "./SignIn.css";

interface SignInData {
    userId : string,
    userPw : string
}


function SignIn(){

    //로그인 데이터 받기.
const [signData, setSignData] = useState<SignInData>({
    userId : "",
    userPw : ""
});

    //타이핑으로 스테이트 값 변경.
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignData({ ...signData, [e.target.name]: e.target.value });
  };


  //로그인. form 데이터 받기.
  const handleLogin = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/signIn', signData);
      console.log(response.data.userId);

      alert("로그인에 성공하셨습니다.");
    } catch (error) {
      console.error('로그인 실패:', error);
      alert("아이디 또는 비밀번호가 다릅니다.");
    }
  };

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