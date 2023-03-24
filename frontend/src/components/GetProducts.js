import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, deleteProduct } from '../redux/actions/product.actions';
import { addCart } from './../redux/actions/cart.actions';
import './style.css';
import Rate from './Rate';

const GetProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteData, setDeleteData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const headers = { Authorization: localStorage.getItem('token') };
  const { products } = useSelector((state) => state.products);
  const rights = JSON.parse(localStorage.getItem('rights'))[0].permissions;
  
  useEffect(() => {
    dispatch(loadProducts(headers));
  }, [refresh]);

  const handleDelete = async () => {
    const Data = deleteData;
    await dispatch(deleteProduct(Data, headers));
    setRefresh(!refresh);
  };
  const handleAddCart = (productId) => {
    const _productId = productId;
    const userId = localStorage.getItem('userId');
    const data = { productId: _productId, userId };
    dispatch(addCart(data, headers));
  };
  return (
    <>
      <div className="main2">
        <div className="container mt-3">
          <div className="image">
            <img src="../6.jpg" alt="" />
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
          <div className="row d-flex justify-content-center align-items-center">
            {products &&
              products.length > 0 &&
              products.map((item, index) => {
                return (
                  <Card
                    style={{ width: '22rem', border: 'none' }}
                    className="mx-2 mt-4 card_style"
                    key={index}
                  >
                    <Card.Img
                      variant="top"
                      style={{ height: '16rem' }}
                      className="mt-3"
                      src={`http://localhost:4001/${item.image}`}
                    />
                    <Card.Body>
                      <Card.Title>
                        Name: <strong>{item.name}</strong>
                      </Card.Title>
                      <Card.Title>
                        Category: <strong>{item.category}</strong>
                      </Card.Title>
                      <Card.Title>
                        Seller: <strong>{item.seller}</strong>
                      </Card.Title>
                      <Card.Title>
                        Price : ₹ <strong>{item.price}</strong>
                      </Card.Title>
                      <Rate className=""/>
                      <div className="button_div d-flex justify-content-center">
                        <Button
                          className="col-lg-12"
                          onClick={() => {
                            handleAddCart(item._id);
                          }}
                          variant="primary"
                        >
                          ADD TO CART
                        </Button>
                      </div>

                      <div className="button_div d-flex justify-content-center mt-1">
                        {rights.indexOf('edit product') !== -1 && (
                          <Button
                            variant="primary"
                            className="col-lg-12"
                            onClick={() => {
                              navigate(`/get/product/${item._id}`);
                            }}
                          >
                            EDIT
                          </Button>
                        )}
                      </div>
                      {rights.indexOf('delete products') !== -1 && (
                        <Form.Group
                          className="mb-3"
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          controlId="formBasicCheckbox"
                        >
                          <Form.Check
                            type="checkbox"
                            label="Delete Product"
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
                        </Form.Group>
                      )}
                    </Card.Body>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default GetProducts;
