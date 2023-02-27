import React from "react";
import Login from "./Login";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./AddProduct";
import GetProducts from "./GetProducts";
import GetProduct from "./GetProduct";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add/product" element={<AddProduct />} />
        <Route path="/get/products" element={<GetProducts />} />
        <Route path="/get/product/:id" element={<GetProduct />} />
      </Routes>
    </>
  );
};

export default Router;
