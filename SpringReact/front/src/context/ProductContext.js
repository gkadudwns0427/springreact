import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// ProductContext 생성
export const ProductContext = createContext(null);

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 상품 데이터 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // 상품 삭제
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  // 상품 수정
  const handleUpdate = (id, title, price, description, location, image) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("location", location);
    if (image) formData.append("image", image);

    axios
      .put(`http://localhost:8080/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setProducts(products.map((p) => (p.id === id ? response.data : p)));
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  // 상품 추가
  const handleAdd = (title, price, description, location, image) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("image", image);

    axios
      .post("http://localhost:8080/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setProducts([...products, response.data]);
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  // 컨텍스트 값 정의
  const contextValue = {
    products,
    handleDelete,
    handleUpdate,
    handleAdd,
    isLoggedIn,
    setIsLoggedIn, // 로그인 상태 관리 함수 포함
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}