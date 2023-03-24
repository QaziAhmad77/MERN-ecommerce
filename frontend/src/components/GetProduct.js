import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct } from '../redux/actions/product.actions';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from './../redux/actions/product.actions';

const GetProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [seller, setSeller] = useState('');
  const [price, setPrice] = useState('');
  const headers = { Authorization: localStorage.getItem('token') };
  const { product } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getSingleProduct(id, headers));
  }, []);
  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setSeller(product.seller);
      setPrice(product.price);
    }
  }, [product]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('seller', seller);
    formData.append('price', price);
    dispatch(updateProduct(formData, headers));
    navigate('/get/products');
  };
  return (
    <>
      <div className="sign-up-form">
        <h1>Update Product</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            className="input-box"
            placeholder="Product Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            className="input-box"
            placeholder="Category"
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <br />
          <input
            className="input-box"
            placeholder="Seller Name"
            type="text"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
          />
          <br />
          <input
            className="input-box"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <button className="signup-btn" type="submit">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default GetProduct;
