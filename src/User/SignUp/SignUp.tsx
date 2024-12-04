import { ChangeEvent, useState } from "react"
import { axiosInstance } from "../../config";
import axios from "axios";
import "./SignUp.css";

interface SignUpData {
    userId : string,
    userPw : string,
    checkPw : string,
    email : string,
    nickname : string,
    phoneNum : string,

}


function SignUp(){

    const [signData, setSignData] = useState<SignUpData>({
        userId: "",
        userPw: "",
        checkPw: "",
        email: "",
        nickname: "",
        phoneNum: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSignData({ ...signData, [e.target.name]: e.target.value });
      };

      const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const { userId, userPw, checkPw , email, nickname, phoneNum} = signData;
    
 
        if (!userId) {
          alert("아이디를 입력해주세요");
          return;
        }
        if (!userPw) {
          alert("비밀번호를 입력해주세요");
          return;
        }
        if (!email) {
          alert("이름을 입력해주세요");
          return;
        }
        if (!nickname) {
          alert("닉네임을 입력해주세요");
          return;
        }
        if (!email) {
          alert("이메일을 입력해주세요");
          return;
        }
        if (!phoneNum) {
          alert("번호를 입력해주세요");
          return;
        }
    
        // 비밀번호 확인
        if (userPw !== checkPw) {
          alert("비밀번호가 일치하지 않습니다.");
          return;
        }
    


        try {
          const response = await axiosInstance.post('/auth/signUp', signData);
          // 회원가입 성공처리.
          alert("가입에 성공하셨습니다.");
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.log(error.response);
        
            // 서버에서 반환된 에러 메시지 확인
            const errorMessage = error.response?.data;
        
            if (errorMessage.includes('아이디가 이미 존재합니다.')) {
              alert("이미 존재하는 아이디입니다.");
            } else if (errorMessage.includes('이메일이 이미 존재합니다.')) {
              alert("이미 존재하는 이메일입니다.");
            } else if(errorMessage.includes('닉네임이 이미 존재합니다.')){
              alert("이미 존재하는 닉네임입니다.")
            }
              else {
              alert("회원가입에 실패하셨습니다.");
            }
          } else {
            console.error("회원가입 실패:", error);
            alert("회원가입에 실패하셨습니다.");
          }
        }
        
    }


    return (
    <div className="mainBackground">
     <div className="main-container">
        <form className="main-form" onSubmit={handleSignUp}>
            <h2>회원가입</h2>
            <input name="userId" value={signData.userId} onChange={handleChange} placeholder="아이디" />
            <input name="userPw" type="password" value={signData.userPw} onChange={handleChange} placeholder="비밀번호" />
            <input name="checkPw" type="password" value={signData.checkPw} onChange={handleChange} placeholder="비밀번호 확인" />
            <input name="nickname" value={signData.nickname} onChange={handleChange} placeholder="닉네임" />
            <input name="email" type="email" value={signData.email} onChange={handleChange} placeholder="이메일" />
            <input name="phoneNum" value={signData.phoneNum} onChange={handleChange} placeholder="핸드폰번호" />
            <button type="submit">회원가입</button>
            </form>
     </div>
    </div>
    )
}

export default SignUp;