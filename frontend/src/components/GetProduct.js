import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GetProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [seller, setSeller] = useState('');
  const [price, setPrice] = useState('');
  const headers = { Authorization: localStorage.getItem('token') };
  useEffect(() => {
    axios
      .get(`http://localhost:4001/api/products/get-product/${id}`, { headers })
      .then((res) => {
        setImage(res.data.data.image);
        setName(res.data.data.name);
        setCategory(res.data.data.category);
        setSeller(res.data.data.seller);
        setPrice(res.data.data.price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (e) => {
    const headers = { Authorization: localStorage.getItem('token') };
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('seller', seller);
    formData.append('price', price);
    formData.append('image', newImage);
    console.log(formData, 'Ahmad');
    axios
      .put(`http://localhost:4001/api/products/edit-product`, formData, {
        headers,
      })
      .then((res) => {
        console.log('addProduct', res.data);
        if (res.data.code === 200) {
          navigate('/get/products');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
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
            onChange={(e) => setCategory(e.target.value)}
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
          <input
            className="input-box"
            type="file"
            onChange={(e) => setNewImage(e.target.files[0])}
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
