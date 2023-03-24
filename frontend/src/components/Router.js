import React from 'react';
import Login from './Login';
import { Routes, Route } from 'react-router-dom';
import AddProduct from './AddProduct';
import GetProducts from './GetProducts';
import GetProduct from './GetProduct';
import SignUp from './SignUP';
import Header from './Header';
import CardsDetails from './CardsDetails';
import Error from './Error';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/add/product" element={<AddProduct />} />
        <Route path="/get/product/:id" element={<GetProduct />} />
        <Route
          path="/cart/:id"
          element={
            <>
              <Header />
              <CardsDetails />
            </>
          }
        />
        <Route
          path="/get/products"
          element={
            <>
              <Header />
              <GetProducts />
            </>
          }
        />
        <Route
          path="*"
          element={
              <Error />
          }
        />
      </Routes>
    </>
  );
};

export default Router;
