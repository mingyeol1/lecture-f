import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./LectureCreate.css";
import { authAxiosInstance } from "../config";

const LectureCreate: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>(); // URL에서 boardId 가져오기
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      setImages([...images, ...fileList]);
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setVideo(event.target.files[0]);
    }
  };

  // 이미지 삭제 핸들러
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      alert("제목과 설명을 입력해주세요.");
      return;
    }

    if (!boardId) {
      alert("게시판 정보가 없습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("lecture", JSON.stringify({ title, description }));

    images.forEach((image) => {
      formData.append("images", image);
    });

    if (video) {
      formData.append("video", video);
    }

    try {
      await authAxiosInstance.post(`/boards/${boardId}/lectures/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("강의가 성공적으로 생성되었습니다.");
      setTitle("");
      setDescription("");
      setImages([]);
      setVideo(null);
    } catch (error) {
      console.error("강의 생성 중 오류 발생:", error);
      alert("강의 생성에 실패했습니다.");
    }
  };

  return (
    <div className="lecture-create-container">
      <h2>강의 생성</h2>
      <input
        type="text"
        placeholder="강의 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="lecture-input"
      />
      <textarea
        placeholder="강의 설명"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="lecture-textarea"
      ></textarea>

      {/* 이미지 업로드 */}
      <label className="file-label">이미지 업로드 --첫번째 이미지는 썸네일로 적용됩니다.</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="lecture-file-input"
      />

      {/* 이미지 미리보기 */}
      <div className="image-preview-container">
        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={URL.createObjectURL(image)} alt="preview" />
            <button onClick={() => removeImage(index)}>✖</button>
          </div>
        ))}
      </div>

      {/* 동영상 업로드 */}
      <label className="file-label">동영상 업로드</label>
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        className="lecture-file-input"
      />

      <button onClick={handleSubmit} className="lecture-submit-button">
        강의 생성
      </button>
    </div>
  );
};

export default LectureCreate;
