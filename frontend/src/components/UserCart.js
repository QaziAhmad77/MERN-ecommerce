import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Data from "./data.json";

const UserCart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = { userId: localStorage.getItem("userId") };
    axios
      .post("http://localhost:4001/api/users/get-user-cart", data)
      .then((res) => {
        console.log(res.data);
        setData(res.data.data.cart);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  return (
    <div>
      home
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}>
        Logout
      </button>
      <h1>PRODUCT LIST</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {data.map((item, index) => {
          return (
            <div style={{ margin: "50px 30px", background: "#eee", width: "20%" }} key={item._id}>
              <img src={item.url} style={{ width: "100%", height: "300px" }} alt="" />
              <p>
                {item.name} | {item.category}
              </p>
              <p>
                <strong>Seller:</strong> {item.seller}
              </p>
              <p>
                <strong>Price:</strong> {item.price}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserCart;