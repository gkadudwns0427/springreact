import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "", // email → userId으로 변경 (백엔드와 일치)
    password: "",
    confirmPassword: "",
    username: "", // 추가 필드
    phoneNumber: "", // 추가 필드
  });
  const [error, setError] = useState("");

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 회원가입 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인 체크
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 백엔드에 회원가입 요청
      await axios.post("http://localhost:8080/api/auth/register", {
        userId: formData.userId,
        password: formData.password,
        username: formData.username,
        phoneNumber: formData.phoneNumber,
      });

      alert("회원가입이 완료되었습니다!");
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      setError(
        error.response?.data || "회원가입에 실패했습니다. 다시 시도해주세요."
      );
      console.error("Signup error:", error);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Card.Body>
          <h2
            className="text-center mb-4"
            style={{ fontWeight: "bold", color: "#ff8a3d" }}
          >
            🥕 회원가입
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* 아이디 (userId) 입력 */}
            <Form.Group className="mb-3" controlId="formBasicuserId">
              <Form.Label>아이디 (이메일)</Form.Label>
              <Form.Control
                type="email"
                placeholder="이메일을 입력하세요"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>

            {/* 비밀번호 입력 */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>

            {/* 비밀번호 확인 입력 */}
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>

            {/* 이름 입력 */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                placeholder="이름을 입력하세요"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>

            {/* 휴대전화 번호 입력 */}
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>휴대전화 번호</Form.Label>
              <Form.Control
                type="text"
                placeholder="전화번호를 입력하세요"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                style={{ borderRadius: "8px" }}
              />
            </Form.Group>

            {/* 회원가입 버튼 */}
            <Button
              variant="warning"
              type="submit"
              className="w-100 mt-2"
              style={{
                backgroundColor: "#ff8a3d",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "white",
              }}
            >
              회원가입
            </Button>

            {/* 로그인으로 이동 */}
            <div className="text-center mt-3">
              <span className="text-muted">이미 계정이 있으신가요?</span>
              <Button
                variant="link"
                onClick={() => navigate("/login")}
                style={{
                  textDecoration: "none",
                  color: "#ff8a3d",
                  fontWeight: "bold",
                }}
              >
                로그인
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}