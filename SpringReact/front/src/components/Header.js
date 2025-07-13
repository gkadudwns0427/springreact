import React, { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(ProductContext);

  return (
    <Navbar style={{ backgroundColor: "#ff8a3d" }} expand="lg" variant="dark">
      <Container>
        <Navbar.Brand
          href="#"
          onClick={(event) => {
            event.preventDefault();
            navigate("/");
          }}
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          🥕 당근마켓
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              onClick={() => navigate("/")}
              style={{ color: "#fff", fontSize: "1.1rem", cursor: "pointer" }}
            >
              동네생활
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/product")}
              style={{ color: "#fff", fontSize: "1.1rem", cursor: "pointer" }}
            >
              중고거래
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("/job")}
              style={{ color: "#fff", fontSize: "1.1rem", cursor: "pointer" }}
            >
              알바
            </Nav.Link>

            {isLoggedIn ? (
              <>
                <Button
                  variant="light"
                  style={{ fontWeight: "bold", marginLeft: "10px" }}
                  onClick={() => navigate("/create")}
                >
                  + 상품 등록
                </Button>
                <Button
                  variant="outline-light"
                  style={{ fontWeight: "bold", marginLeft: "10px" }}
                  onClick={() => setIsLoggedIn(false)} // 로그아웃 처리
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  style={{ fontWeight: "bold", marginLeft: "10px" }}
                  onClick={() => navigate("/register")}
                >
                  회원가입
                </Button>
                <Button
                  variant="outline-light"
                  style={{ fontWeight: "bold", marginLeft: "10px" }}
                  onClick={() => navigate("/login")}
                >
                  로그인
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}