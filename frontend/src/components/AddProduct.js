import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
  const [price, setPrice] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { image, name, category, seller, price };
    axios
      .post("http://localhost:4001/api/products/add-product", data)
      .then((res) => {
        console.log("addProduct", res.data);
        if (res.status === 201) {
          navigate("/get/products");
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        Image: <input className="inputs" type="text" value={image} onChange={(e) => setImage(e.target.value)} /> <br />
        Name: <input className="inputs" type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
        category: <input className="inputs" type="text" value={category} onChange={(e) => setCategory(e.target.value)} /> <br />
        Seller: <input className="inputs" type="text" value={seller} onChange={(e) => setSeller(e.target.value)} /> <br />
        Price: <input className="inputs" type="number" value={price} onChange={(e) => setPrice(e.target.value)} /> <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
