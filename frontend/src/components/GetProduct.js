import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct } from '../redux/actions/product.actions';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from './../redux/actions/product.actions';

const GetProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [seller, setSeller] = useState('');
  const [price, setPrice] = useState('');
  console.log(image, 'this is image');
  const headers = { Authorization: localStorage.getItem('token') };
  const { product } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getSingleProduct(id, headers));
  }, []);
  useEffect(() => {
    if (product && product.data) {
      setName(product.data.name);
      setCategory(product.data.category);
      setSeller(product.data.seller);
      setPrice(product.data.price);
      setImage(product.data.image);
    }
  }, [product]);
  const handleOnImage = (e) => {
    e.preventDefault();
    if (image) {
      setImage(e.target.files[0]);
    } else {
      setNewImage(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('seller', seller);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    } else {
      formData.append('image', newImage);
    }
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
          <div>
            <img
              style={{ width: '200px', height: '200px' }}
              src={`http://localhost:4001/${image}`}
              alt=""
            />
          </div>
          <input className="input-box" type="file" onChange={handleOnImage} />
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
