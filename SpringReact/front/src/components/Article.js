import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function Article({ product, onBack, onDelete, onUpdate }) {
  if (!product) return <p>상품을 찾을 수 없습니다.</p>;

  return (
    <article>
      <br />
      <br />
      <Table>
        <tbody>
          <tr>
            <td
              rowSpan={7}
              style={{
                textAlign: "right",
                padding: "15px",
                verticalAlign: "top"
              }}
            >
              <img
                src={`http://localhost:8080${product.imagePath}`}
                alt={product.title}
                style={{
                  maxWidth: "300px",
                  height: "auto",
                  textAlign: "right"
                }}
              />
            </td>
            <td style={{ padding: "0 0 0 5px", fontSize: "30px" }}>
              <strong>{product.title}</strong>
            </td>
          </tr>

          <tr>
            <td style={{ padding: "10px 0 50px 5px", fontSize: "30px" }}>
              <strong>
                {product.price === "무료" ? product.price : product.price + "원"}
              </strong>
            </td>
          </tr>

          <tr>
            <td style={{ padding: "0 0 5px 5px", fontSize: "20px" }}>
              <strong>상품 설명:</strong> {product.description}
            </td>
          </tr>

          <tr>
            <td style={{ padding: "0 0 5px 5px", fontSize: "20px" }}>
              <strong>거래 희망 지역:</strong> {product.location}
            </td>
          </tr>

          <tr>
            <td style={{ padding: "20px", fontSize: "20px" }}></td>
          </tr>

          <tr>
            <td style={{ padding: "10px" }}>
              <Button
                style={{
                  backgroundColor: "#ff8a3d",
                  borderColor: "#ff8a3d",
                  color: "white",
                  fontWeight: "bold",
                  width: "35rem"
                }}
                onClick={onDelete}
              >
                삭제하기
              </Button>
              <br />
              <br />
              <Button
                style={{
                  backgroundColor: "#ff8a3d",
                  borderColor: "#ff8a3d",
                  color: "white",
                  fontWeight: "bold",
                  width: "35rem"
                }}
                onClick={onUpdate}
              >
                정보수정
              </Button>
              <br />
              <br />
              <Button
                style={{
                  backgroundColor: "#B8B8B8",
                  borderColor: "#B8B8B8",
                  color: "white",
                  fontWeight: "bold",
                  width: "35rem"
                }}
                onClick={onBack}
              >
                뒤로가기
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </article>
  );
}