import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GetProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [seller, setSeller] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:4001/api/products/get-product/${id}`)
      .then((res) => {
        console.log(res, 11);
        setImage(res.data.data.image);
        setCategory(res.data.data.name);
        setSeller(res.data.data.category);
        setPrice(res.data.data.price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ id: id, image, name, category, seller, seller, price });
    const data = { id: id, image, name, category, seller, seller, price };
    axios
      .put(`http://localhost:4001/api/products/edit-product`, data)
      .then((res) => {
        console.log(res, "res");
        if (res.data.code === 200) {
          navigate("/get/products");
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
          Image: <input className="inputs" type="text" value={image} onChange={(e) => setImage(e.target.value)} /> <br />
          Name: <input className="inputs" type="text" value={name} onChange={(e) => setName(e.target.value)} /> <br />
          category: <input className="inputs" type="text" value={category} onChange={(e) => setCategory(e.target.value)} /> <br />
          Seller: <input className="inputs" type="text" value={seller} onChange={(e) => setSeller(e.target.value)} /> <br />
          Price: <input className="inputs" type="number" value={price} onChange={(e) => setPrice(e.target.value)} /> <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default GetProduct;
