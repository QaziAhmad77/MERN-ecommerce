import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetProducts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  console.log(deleteData, "deleteData");
  useEffect(() => {
    axios
      .get("http://localhost:4001/api/products/get-products")
      .then((res) => {
        console.log("getProduct", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);
  const handleDelete = () => {
    const data = deleteData;
    console.log(data, "Data");
    axios
      .post("http://localhost:4001/api/products//delete-products", data)
      .then((res) => {
        console.log(res.data, "25");
        if (res.data.code === 200) {
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1>
        <strong>Products :</strong>
      </h1>
      {deleteData.length > 0 && (
        <button
          onClick={handleDelete}
          style={{ height: "50px", margin: "0 auto", display: "block", backgroundColor: "#e91e63", color: "white", fontSize: "20px", borderRadius: "10px", border: "none" }}>
          DELETE SELECTED
        </button>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "center" }}>
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <div style={{ margin: "50px 30px", background: "#eee", width: "27%" }} key={item._id}>
                <div>
                  <img style={{ width: "100%", height: "300px" }} src={item.image} alt="" />
                </div>
                <div className="content" style={{ textAlign: "center", paddingBottom: "10px" }}>
                  <p>
                    <strong>{item.name}</strong> in {item.category}
                  </p>
                  <p>
                    <strong>By: </strong>
                    {item.seller}
                  </p>
                  <p>
                    <strong>PRICE : </strong>
                    {item.price} Only /-
                  </p>
                  <button
                    onClick={() => {
                      navigate(`/get/product/${item._id}`);
                    }}>
                    EDIT
                  </button>
                  <input
                    type="checkbox"
                    style={{ marginLeft: "10px" }}
                    onChange={(e) => {
                      if (e.target.checked === true) {
                        setDeleteData([...deleteData, item._id]);
                      } else {
                        setDeleteData(
                          deleteData.filter((ele) => {
                            return ele !== item._id;
                          })
                        );
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default GetProducts;
