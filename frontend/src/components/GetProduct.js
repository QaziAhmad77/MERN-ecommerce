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
        console.log(res, 11);
        setImage(res.data.data.image);
        console.log(res.data.data.image, 1212);
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
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('seller', seller);
    formData.append('price', price);
    formData.append('image', image);
    axios
      .put(`http://localhost:4001/api/products/edit-product`, formData, {
        headers,
      })
      .then((res) => {
        console.log(res, 'res');
        if (res.data.code === 200) {
          navigate('/get/products');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
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
          <div>
            <img
              style={{ width: '200px', height: '200px' }}
              src={`http://localhost:4001/${image}`}
              alt=""
            />
          </div>
          Image:
          <input
            className="inputs"
            type="file"
            onChange={(e) => setNewImage(e.target.files[0])}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default GetProduct;
