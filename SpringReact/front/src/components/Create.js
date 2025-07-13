import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductContext } from "../context/ProductContext";

export default function Create() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const navigate = useNavigate();
  const { handleAdd } = useContext(ProductContext); // ProductContext에서 handleAdd 가져오기

  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // 파일 객체 직접 저장
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || (!isFree && !price) || !description || !location || !image) {
      return alert("모든 필수 항목을 입력해주세요!");
    }

    // handleAdd 호출 (ProductContext에서 정의된 로직 사용)
    handleAdd(title, isFree ? "무료" : price, description, location, image);

    // 작성 완료 후 Nav.js가 있는 홈 경로로 이동
    navigate("/");
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <Form onSubmit={handleSubmit} style={{ maxWidth: "550px", width: "100%" }}>
        <h2 className="fw-bold text-center mb-4">내 물건 팔기</h2>

        <div className="mb-3 text-center">
          <label className="d-block border rounded p-3" style={{ cursor: "pointer" }}>
            {image ? (
              <img
                src={URL.createObjectURL(image)} // 업로드된 이미지 미리보기
                alt="상품 이미지"
                style={{ maxWidth: "150px", height: "auto" }}
              />
            ) : (
              <span>📷 사진 추가</span>
            )}
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </label>
        </div>

        <div>제목</div>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <div>거래 방식</div>
        <div className="mb-3 d-flex gap-2 justify-content-start">
          <Button
            variant={isFree ? "outline-secondary" : "dark"}
            onClick={() => setIsFree(false)}
            style={{ flex: "none", padding: "6px 16px", fontSize: "0.9rem" }}
          >
            판매하기
          </Button>
          <Button
            variant={isFree ? "dark" : "outline-secondary"}
            onClick={() => {
              setIsFree(true);
              setPrice("");
            }}
            style={{ flex: "none", padding: "6px 16px", fontSize: "0.9rem" }}
          >
            나눔하기
          </Button>
        </div>

        {!isFree && (
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="₩ 가격(숫자만)을 입력해주세요."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
        )}

        <div>자세한 설명</div>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="상세한 설명을 작성해주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <div>희망지역 입력</div>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="지역 (예: 서울 강남구)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          style={{ backgroundColor: "#ff8a3d", borderColor: "#ff8a3d", fontWeight: "bold" }}
          className="w-100"
        >
          작성 완료
        </Button>
      </Form>
    </div>
  );
}