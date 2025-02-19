import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./LectureRead.css";
import { authAxiosInstance } from "../config";

interface Lecture {
  id: number;
  title: string;
  description: string;
  uploaderNickname: string;
  imagesUrl: string[];
  videoUrl: string | null;
  rating: number;
  boardName: string;
}

const LectureRead: React.FC = () => {
  const { boardId, lectureId } = useParams<{ boardId?: string; lectureId?: string }>();
  const [lecture, setLecture] = useState<Lecture | null>(null);

  useEffect(() => {
    console.log("boardId:", boardId, "lectureId:", lectureId);  // 🚨 값 확인용

    if (boardId && lectureId) {
      fetchLecture(boardId, lectureId);
    }
  }, [boardId, lectureId]);

  const fetchLecture = async (boardId: string, lectureId: string) => {
    try {
      const response = await authAxiosInstance.get<Lecture>(`/boards/${boardId}/lectures/${lectureId}`);
      setLecture(response.data);
    } catch (error) {
      console.error("강의 정보를 불러오는 중 오류 발생:", error);
    }
  };

  if (!lecture) return <p>강의 정보를 불러오는 중...</p>;

  return (
    <div className="lecture-read-container">
      <h1 className="lecture-title">{lecture.title}</h1>
      <p className="lecture-instructor">강사: {lecture.uploaderNickname}</p>
      <p className="lecture-description">{lecture.description}</p>
      {lecture.videoUrl && (
        <video controls className="lecture-video">
          <source src={lecture.videoUrl} type="video/mp4" />
          브라우저가 비디오 태그를 지원하지 않습니다.
        </video>
      )}
      <p className="lecture-rating">별점: {lecture.rating}</p>
      <p className="lecture-board-name">게시판: {lecture.boardName}</p>
      {lecture.imagesUrl && lecture.imagesUrl.length > 0 && (
        <div className="lecture-images">
          {lecture.imagesUrl.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`강의 이미지 ${index + 1}`} className="lecture-image" />
          ))}
        </div>
      )}
    </div>
  );
};

export default LectureRead;
