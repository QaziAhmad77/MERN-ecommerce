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
      .post('http://localhost:4001/api/products/add-product', formData, { headers })
      .then((res) => {
        console.log('addProduct', res.data);
        if (res.status === 201) {
          navigate('/get/products');
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        Name:
        <input
          className="inputs"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        category:
        <input
          className="inputs"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        Seller:
        <input
          className="inputs"
          type="text"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
        />
        <br />
        Price:
        <input
          className="inputs"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        Image:
        <input
          className="inputs"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
