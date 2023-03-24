import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/actions/product.actions';

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [seller, setSeller] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState("");
  const headers = { Authorization: localStorage.getItem('token') };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !category || !seller || !price || !image) {
      setError("Please fill all input fields");
    } else {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('seller', seller);
      formData.append('price', price);
      formData.append('image', image);
      dispatch(addProduct(formData, headers));
      navigate('/get/products');
      setError("");
    }
  };
  return (
   <div className="main3">
     <div className="sign-up-form">
      <h1>Add Product here</h1>
      {error && <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>}
      <form action="" onSubmit={handleSubmit}>
        <input
          className="input-box"
          placeholder="Product Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-box"
          placeholder="Category Name"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="input-box"
          placeholder="Seller Name"
          type="text"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
        />
        <input
          className="input-box"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="input-box"
          placeholder="Image"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        <button className="signup-btn" type="submit">
          Add
        </button>
      </form>
    </div>
   </div>
  );
};

export default AddProduct;
