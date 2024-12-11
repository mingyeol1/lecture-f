import React, { ChangeEvent, useEffect, useState } from 'react';
import '../css/Modify.css';
import { authAxiosInstance, axiosInstance } from '../../config';
import axios from 'axios';

interface UserData {
  userId: string;
  userPw: string; // 새 비밀번호
  checkPw: string; // 새 비밀번호 확인
  currentPw: string; // 현재 비밀번호
  email: string;
  nickname: string;
  phoneNum: string;
}

interface OriginData {
  nickname: string;
  email: string;
}

const Modify: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    userId: '',
    userPw: '',
    checkPw: '',
    currentPw: '',
    email: '',
    nickname: '',
    phoneNum: '',
  });

  const [originData, setOriginData] = useState<OriginData>({
    nickname: '',
    email: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        // 로그인 페이지로 리다이렉트
        return;
    }

    authAxiosInstance
        .get('/api/user/getModify')
        .then((response) => {
            const { userId, nickname, email, phoneNum } = response.data;
            setUserData({ userId, nickname, email, phoneNum, userPw: '', checkPw: '', currentPw: '' });
            setOriginData({ nickname, email });
        })
        .catch((error) => {
            console.error(error);
            if (error.message === 'No token found' || error.response?.status === 401) {
                alert('로그인이 필요한 서비스입니다.');
                // 로그인 페이지로 리다이렉트
            } else {
                alert('유저 정보를 불러오는 데 실패했습니다.');
            }
        });
}, []);

  // 입력 필드 값 업데이트
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // 회원정보 수정 제출
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { userId,nickname, email, phoneNum, userPw, checkPw, currentPw } = userData;

    // 빈 값 확인
    if (!nickname) {
      alert("닉네임을 입력해주세요");
      return;
    }
    if (!email) {
      alert("이메일을 입력해주세요");
      return;
    }
    if (!phoneNum) {
      alert("핸드폰 번호를 입력해주세요");
      return;
    }

    if (userPw && userPw !== checkPw) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (userPw && !currentPw) {
      alert('현재 비밀번호를 입력해주세요.');
      return;
    }

    // 서버 요청
    try {
      await authAxiosInstance.put('/api/user/modify', {
        userId,
        nickname,
        email,
        phoneNum,
        userPw,
        currentPw,
      });
      alert('회원 정보가 성공적으로 수정되었습니다.');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
    
        // 서버에서 반환된 에러 메시지 확인
        const errorMessage = error.response?.data;
    
        if (errorMessage.includes('닉네임이 이미 존재합니다.')) {
          alert("이미 존재하는 닉네임입니다.");
        } else if (errorMessage.includes('이메일이 이미 존재합니다.')) {
          alert("이미 존재하는 이메일입니다.");
        } 
          else {
          alert("수정에 실패하셨습니다.");
        }
      } else {
        console.error("회원정보수정 실패:", error);
        alert("수정에 실패하셨습니다.");
      }
    }
  };

  // 회원 탈퇴 처리
  const handleDelete = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        await authAxiosInstance.delete('/api/user/delete');
        alert('회원 탈퇴가 완료되었습니다.');
        window.location.href = '/'; // 홈으로 리디렉션
      } catch (error) {
        console.error(error);
        alert('회원 탈퇴에 실패했습니다.');
      }
    }
  };

  return (
    <div className="profileContainer">
      <form onSubmit={handleSubmit}>
        <section className="section">
          <h2 className="sectionTitle">내 프로필</h2>
          <div className="profileItem">
            <span className="label">닉네임</span>
            <input
              name="nickname"
              value={userData.nickname}
              onChange={handleChange}
              placeholder="닉네임"
            />
          </div>
        </section>

        <section className="section">
          <h2 className="sectionTitle">기본 정보</h2>
          <div className="profileItem">
            <span className="label">아이디</span>
            <input name="userId" value={userData.userId} readOnly onChange={handleChange}
/>
          </div>
          <div className="profileItem">
            <span className="label">이메일</span>
            <input name="email" type="email" value={userData.email} onChange={handleChange} placeholder="이메일"/>
          </div>
          <div className="profileItem">
            <span className="label">비밀번호</span>
            <input name="currentPw" type="password" value={userData.currentPw} onChange={handleChange} placeholder="현재 비밀번호" />
            <input name="userPw" type="password" value={userData.userPw} onChange={handleChange} placeholder="새 비밀번호" />
            <input name="checkPw" type="password" value={userData.checkPw} onChange={handleChange} placeholder="새 비밀번호 확인" />
          </div>
          <div className="profileItem">
            <span className="label">휴대폰 번호</span>
            <input name="phoneNum" value={userData.phoneNum} onChange={handleChange} placeholder="휴대폰 번호"/>
          </div>
        </section>

        <section className="buttonSection">
          <button type="submit" className="submitButton">
            수정 완료
          </button>
        </section>
      </form>

      <section className="dangerSection">
        <button className="deleteButton" onClick={handleDelete}>
          회원 탈퇴
        </button>
      </section>
    </div>
  );
};

export default Modify;
