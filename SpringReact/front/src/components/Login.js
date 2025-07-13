import React, { useState, useContext } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductContext } from "../context/ProductContext";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 오류 메시지 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(ProductContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // 이전 오류 초기화
    setLoading(true); // 요청 시작

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        userId,
        password,
      });
      alert(response.data); // "로그인 성공" 메시지
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setError(error.response?.data || "로그인 실패"); // 오류 메시지 설정
    } finally {
      setLoading(false); // 요청 완료
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
            🥕 당근마켓
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                placeholder="이메일을 입력하세요"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                style={{ borderRadius: "8px" }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderRadius: "8px" }}
                required
              />
            </Form.Group>

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
              disabled={loading} // 로딩 중 비활성화
            >
              {loading ? "로그인 중..." : "로그인"}
            </Button>

            <div className="text-center mt-3">
              <span className="text-muted">계정이 없으신가요?</span>
              <Button
                variant="link"
                onClick={() => navigate("/register")}
                style={{
                  textDecoration: "none",
                  color: "#ff8a3d",
                  fontWeight: "bold",
                }}
              >
                회원가입
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}