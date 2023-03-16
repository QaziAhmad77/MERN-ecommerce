import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, deleteProduct } from '../redux/actions/product.actions';

const GetProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const headers = { Authorization: localStorage.getItem('token') };
  const { products } = useSelector((state) => state.products);
  //useEffect
  useEffect(() => {
    dispatch(loadProducts(headers));
  }, [refresh]);

  const rights = JSON.parse(localStorage.getItem('rights'))[0].permissions;
  const handleDelete = () => {
    const Data = deleteData;
    console.log(Data, 'Datdsafsdafsdafsdfsdaa');
    dispatch(deleteProduct(Data, headers));
    setRefresh(!refresh);
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
      <div className="cart-btn">
        <button style={{ backgroundColor: '#1c8adb' }}>
          <Link to="/get/cart" style={{ color: 'white' }}>
            Go to cart
          </Link>
        </button>
      </div>
      {deleteData.length > 0 && (
        <button
          onClick={handleDelete}
          style={{
            height: '50px',
            width: '400px',
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
        {products &&
          products.length > 0 &&
          products.map((item, index) => {
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
                      style={{ color: 'blue' }}
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
                    style={{ color: 'blue' }}
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
