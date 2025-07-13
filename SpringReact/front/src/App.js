import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import RouterComponent from "./components/Router";
import ProductProvider from "./context/ProductContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Header />
        <div className="container mt-4">
          <RouterComponent />
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;