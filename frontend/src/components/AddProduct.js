import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [seller, setSeller] = useState('');
  const [price, setPrice] = useState('');
  console.log(image, 12);
  const handleSubmit = (e) => {
    e.preventDefault();
    const headers = { Authorization: localStorage.getItem('token') };
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('seller', seller);
    formData.append('price', price);
    formData.append('image', image);
    axios
      .post('http://localhost:4001/api/products/add-product', formData, {
        headers,
      })
      .then((res) => {
        console.log('addProduct', res.data);
        if (res.status === 201) {
          navigate('/get/products');
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className='sign-up-form'>
      <h1>Add Product here</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          className="input-box"
          placeholder='Product Name'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-box"
          placeholder='Category Name'
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="input-box"
          placeholder='Seller Name'
          type="text"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
        />
        <input
          className="input-box"
          placeholder='Price'
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="input-box"
          placeholder='Image'
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        <button className='signup-btn' type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
