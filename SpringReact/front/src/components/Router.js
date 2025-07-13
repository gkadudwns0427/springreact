import React, { useContext } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import Nav from "../components/Nav";
import Article from "../components/Article";
import Create from "../components/Create";
import Update from "../components/Update";
import Login from "../components/Login";
import Register from "../components/Register";

// Article을 위한 래퍼 컴포넌트
function ArticleWrapper() {
  const { products, handleDelete, handleUpdate } = useContext(ProductContext);
  const { id } = useParams();
  const navigate = useNavigate();
  
  // URL 파라미터의 id로 해당 상품 찾기
  const product = products.find(p => p.id === parseInt(id));
  
  const handleBack = () => {
    navigate('/'); // 메인 페이지로 돌아가기
  };
  
  const handleDeleteProduct = () => {
    handleDelete(parseInt(id));
    navigate('/'); // 삭제 후 메인 페이지로 이동
  };
  
  const handleUpdateProduct = () => {
    navigate(`/update/${id}`); // 수정 페이지로 이동
  };
  
  return (
    <Article 
      product={product} 
      onBack={handleBack}
      onDelete={handleDeleteProduct}
      onUpdate={handleUpdateProduct}
    />
  );
}

// Update를 위한 래퍼 컴포넌트
function UpdateWrapper() {
  const { products, handleUpdate } = useContext(ProductContext);
  const { id } = useParams();
  
  // URL 파라미터의 id로 해당 상품 찾기
  const product = products.find(p => p.id === parseInt(id));
  
  return (
    <Update 
      product={product}
      onUpdate={handleUpdate} 
    />
  );
}

export default function RouterComponent() {
  const { products, handleAdd } = useContext(ProductContext);

  return (
    <Routes>
      <Route path="/" element={<Nav products={products} />} />
      <Route path="/product/:id" element={<ArticleWrapper />} />
      <Route path="/create" element={<Create onAdd={handleAdd} />} />
      <Route path="/update/:id" element={<UpdateWrapper />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}