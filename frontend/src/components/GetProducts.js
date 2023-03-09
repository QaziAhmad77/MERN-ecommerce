import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const GetProducts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const rights = JSON.parse(localStorage.getItem('rights'))[0].permissions;
  const headers = { Authorization: localStorage.getItem('token') };
  useEffect(() => {
    axios
      .get('http://localhost:4001/api/products/get-products', { headers })
      .then((res) => {
        console.log('getProduct', res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);
  const handleDelete = () => {
    const data = deleteData;
    console.log(data, 'Data');
    axios
      .post('http://localhost:4001/api/products/delete-products', data, {
        headers,
      })
      .then((res) => {
        console.log(res.data, '25');
        if (res.data.code === 200) {
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddCart = (productId) => {
    const _productId = productId;
    const userId = localStorage.getItem('userId');
    const data = { productId: _productId, userId };
    axios
      .post('http://localhost:4001/api/users/add-to-cart', data, { headers })
      .then((res) => {
        console.log(res.data);
        if (res.data.cdoe === 200) {
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>
        <strong>SHOPPING CART PRODUCTS</strong>
      </h1>
      <Link to="/get/cart">Go go cart</Link>
      {deleteData.length > 0 && (
        <button
          onClick={handleDelete}
          style={{
            height: '50px',
            margin: '0 auto',
            display: 'block',
            backgroundColor: '#e91e63',
            color: 'white',
            fontSize: '20px',
            borderRadius: '10px',
            border: 'none',
          }}
        >
          DELETE SELECTED
        </button>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <div
                style={{
                  margin: '50px 30px',
                  background: '#eee',
                  width: '27%',
                }}
                key={item._id}
              >
                <div>
                  <img
                    style={{ width: '100%', height: '300px' }}
                    src={`http://localhost:4001/${item.image}`}
                    alt=""
                  />
                </div>
                <div
                  className="content"
                  style={{ textAlign: 'center', paddingBottom: '10px' }}
                >
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
                  {rights.indexOf('edit product') !== -1 && (
                    <button
                      onClick={() => {
                        navigate(`/get/product/${item._id}`);
                      }}
                    >
                      EDIT
                    </button>
                  )}
                  {rights.indexOf('delete products') !== -1 && (
                    <input
                      type="checkbox"
                      style={{ marginLeft: '10px' }}
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
                  )}
                  <button
                    onClick={() => {
                      handleAddCart(item._id);
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default GetProducts;
