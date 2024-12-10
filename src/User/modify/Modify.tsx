import React, { useState } from 'react';
import '../css/Modify.css';



const Modify: React.FC = () => {
  const handleDelete = () => {
    if (window.confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      // API 호출 로직
      console.log('회원 탈퇴 처리');
    }
  };

  return (
    <div className="profileContainer">
      <section className="section">
        <h2 className="sectionTitle">내 프로필</h2>
        <div className="profileItem">
          <div className="profileImage">
            
          </div>
          <span className="label">이미지</span>
          <button className="editButton">설정</button>
        </div>
        <div className="profileItem">
          <span className="label">닉네임</span>
          <span className="value nickname"></span>
          <button className="editButton">설정</button>
        </div>
      </section>

      <section className="section">
        <h2 className="sectionTitle">기본 정보</h2>
        <div className="profileItem">
          <span className="label">이메일</span>
          <span className="value"></span>
          <button className="editButton">설정</button>
        </div>
        <div className="profileItem">
          <span className="label">비밀번호</span>
          <span className="value maskedPassword">*****</span>
          <button className="editButton">설정</button>
        </div>
        <div className="profileItem">
          <span className="label">휴대폰 번호</span>
          <span className="value"></span>
          <button className="editButton">설정</button>
        </div>
      </section>

      <section className="dangerSection">
        <button className="deleteButton" onClick={handleDelete}>
          회원 탈퇴
        </button>
      </section>
    </div>
  );
};

export default Modify;