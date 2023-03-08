import React from "react";
import Login from "./Login";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./AddProduct";
import GetProducts from "./GetProducts";
import GetProduct from "./GetProduct";
import SignUp from "./SignUP";
import UserCart from "./UserCart";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/add/product" element={<AddProduct />} />
        <Route path="/get/products" element={<GetProducts />} />
        <Route path="/get/product/:id" element={<GetProduct />} />
        <Route path="/get/cart" element={<UserCart />} />
      </Routes>
    </>
  );
};

export default Router;
