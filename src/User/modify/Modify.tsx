import React, { ChangeEvent, useEffect, useState } from 'react';
import '../css/Modify.css';
import { authAxiosInstance, axiosInstance } from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserData {
  userId: string;
  userPw: string;
  newPw: string;
  checkNewPw: string;
  email: string;
  nickname: string;
  phoneNum: string;
  profileImage?: string;
}

interface OriginData {
  nickname: string;
  email: string;
}

function Modify() {
  const [userData, setUserData] = useState<UserData>({
    userId: '',
    userPw: '',
    newPw: '',
    checkNewPw: '',
    email: '',
    nickname: '',
    phoneNum: '',
    profileImage: '',
  });

  const [originData, setOriginData] = useState<OriginData>({
    nickname: '',
    email: '',
  });

  const navigate = useNavigate();
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    authAxiosInstance
      .get('/user/getModify')
      .then((response) => {
        const { userId, nickname, email, phoneNum, profileImage } = response.data;
        setUserData({ userId, nickname, email, phoneNum, userPw: '', newPw: '', checkNewPw: '', profileImage });
        setOriginData({ nickname, email });
        if (profileImage) {
          setPreviewUrl(profileImage);
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.message === 'No token found' || error.response?.status === 401) {
          alert('로그인이 필요한 서비스입니다.');
        } else {
          alert('유저 정보를 불러오는 데 실패했습니다.');
        }
      });
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      alert('이미지를 선택해주세요.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const response = await authAxiosInstance.post(
        `/user/${userData.userId}/upload-profile-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      const imageUrl = response.data;
      setUserData({ ...userData, profileImage: imageUrl });
      setPreviewUrl(imageUrl);  // 업로드 후 바로 새 이미지 표시
      // navigate("/modify"); //바로 적용이 안돼서 새로고침.
      window.location.reload();  //바로 적용이 안돼서 강제로 새로고침.
      alert('프로필 이미지가 업로드되었습니다.');
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const { userId, nickname, email, phoneNum, userPw, newPw, checkNewPw } = userData;
  
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
  
    // 비밀번호를 변경하려는 경우에만 비밀번호 검증
    if (newPw || checkNewPw) {
      if (!newPw) {
        alert("새 비밀번호를 입력해주세요");
        return;
      }
      if (newPw !== checkNewPw) {
        alert("새 비밀번호가 일치하지 않습니다.");
        return;
      }
      if (!userPw) {
        alert("현재 비밀번호를 입력해주세요");
        return;
      }
  
      try {
        // 현재 비밀번호 검증
        const response = await authAxiosInstance.post("/user/checkPw", { userPw });
      } catch (error) {
        console.error(error);
        alert("현재 비밀번호가 일치하지 않습니다.");
        return;
      }
    }
  
    try {
      // 프로필 수정 요청
      await authAxiosInstance.put('/user/modify', {
        userId,
        nickname,
        email,
        phoneNum,
        userPw,  // 비밀번호 변경 시 현재 비밀번호 포함
        newPw,   // 비밀번호가 있을 경우만 포함
      });
      alert('회원 정보가 성공적으로 수정되었습니다.');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data;
  
        if (errorMessage.includes('닉네임이 이미 존재합니다.')) {
          alert("이미 존재하는 닉네임입니다.");
        } else if (errorMessage.includes('이메일이 이미 존재합니다.')) {
          alert("이미 존재하는 이메일입니다.");
        } else {
          alert("수정에 실패하셨습니다.");
        }
      } else {
        console.error("회원정보수정 실패:", error);
        alert("수정에 실패하셨습니다.");
      }
    }
  };

  const handleDelete = async () => {

    const {userPw} = userData;

    if (!userData.userPw) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (window.confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        await authAxiosInstance.post('/user/remove',  { userPw } );
        alert('회원 탈퇴가 완료되었습니다.');
        navigate("signin");
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
          <h2 className="sectionTitle">프로필 이미지</h2>
          <div className="profileImageContainer">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="프로필 이미지"
                  className="profileImage"
                  style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '75px', cursor: 'pointer' }}
                  onClick={() => document.getElementById('profileImageInput')?.click()}
                />
              ) : (
                <div className="profileImagePlaceholder" style={{ cursor: 'pointer' }} onClick={() => document.getElementById('profileImageInput')?.click()}>
                  이미지 없음
                </div>
              )}
              <div className="imageUploadControls">
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="profileImageInput" />
                <button type="button" onClick={handleImageUpload} className="imageUploadButton"> 프로필 변경 </button>
              </div>
            </div>
        </section>

        <section className="section">
          <h2 className="sectionTitle">내 프로필</h2>
          <div className="profileItem">
            <span className="label">닉네임</span>
            <input name="nickname" value={userData.nickname} onChange={handleChange} placeholder="닉네임" />
          </div>
        </section>

        <section className="section">
          <h2 className="sectionTitle">기본 정보</h2>
          <div className="profileItem">
            <span className="label">아이디</span>
            <input name="userId" value={userData.userId} readOnly />
          </div>
          <div className="profileItem">
            <span className="label">이메일</span>
            <input name="email" type="email" value={userData.email} onChange={handleChange} placeholder="이메일" />
          </div>
          <div className="profileItem">
            <span className="label">휴대폰 번호</span>
            <input name="phoneNum" value={userData.phoneNum} onChange={handleChange} placeholder="휴대폰 번호" />
          </div>
          <div className="profileItem">
            <span className="label">비밀번호 변경</span>
            <button type="button"  onClick={() => setShowPasswordChange(!showPasswordChange)} className="toggleButton" >
              {showPasswordChange ? '닫기' : '열기'}
            </button>
          </div>
          {showPasswordChange && (
            <div className="passwordChange">
              <input name="userPw" type="password" value={userData.userPw} onChange={handleChange} placeholder="현재 비밀번호" />
              <input name="newPw" type="password" value={userData.newPw} onChange={handleChange} placeholder="새 비밀번호" />
              <input name="checkNewPw" type="password" value={userData.checkNewPw} onChange={handleChange} placeholder="새 비밀번호 확인"/>
            </div>
          )}
        </section>

        <section className="buttonSection">
          <button type="submit" className="submitButton"> 수정 완료 </button>
        </section>
      </form>

      <section className="dangerSection">
        <button 
          className="deleteToggleButton"  onClick={() => setShowDeleteConfirm(!showDeleteConfirm)} >
          {showDeleteConfirm ? '닫기' : '회원 탈퇴'}
        </button>
        {showDeleteConfirm && (
          <div className="deleteConfirm">
            <input name="userPw" type="password" value={userData.userPw} onChange={handleChange} placeholder="비밀번호 확인"/>
            <button className="deleteButton" onClick={handleDelete}> 탈퇴 확인 </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Modify;
