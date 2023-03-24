import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart } from '../redux/actions/cart.actions';
import { getSingleCart } from './../redux/actions/cart.actions';

const CardsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [seller, setSeller] = useState('');
  const [price, setPrice] = useState('');
  const { cart } = useSelector((state) => state.carts);
  const userId = localStorage.getItem('userId');
  const data = { productId: id, userId: userId };

  useEffect(() => {
    dispatch(getSingleCart(data));
  }, []);
  useEffect(() => {
    if (cart) {
      setName(cart.name);
      setCategory(cart.category);
      setSeller(cart.seller);
      setPrice(cart.price);
      setImage(cart.image);
    }
  });
  const handleDelete = (productId) => {
    const _productId = productId;
    const userId = localStorage.getItem('userId');
    const data = { productId: _productId, userId };
    dispatch(deleteCart(data));
        navigate("/get/products")
  };
  return (
    <>
     <div className="main3">
     <div className="container mt-2">
        <h2 className="text-center">Items Details Page</h2>
        <section className="container mt-3">
          <div className="iteamsdetails"  style={{backgroundColor:"white"}}>
            <div className="items_img">
              <img src={`http://localhost:4001/${image}`} alt="" />
            </div>
            <div className="details">
              <Table>
                <tr>
                  <td>
                    <p>
                      <strong>Name: </strong>
                      {name}
                    </p>
                    <p>
                      <strong>Category: </strong>
                      {category}
                    </p>
                    <p>
                      <strong>Seller: </strong> {seller}
                    </p>
                    <p>
                      <strong>Price: </strong>: ₹ {price}
                    </p>
                    <p>
                      <strong>Total Price</strong>: ₹ {price}
                    </p>
                    <div
                      className="mt-5 d-flex justify-content-between align-items-center"
                      style={{
                        width: 100,
                        cursor: 'pointer',
                        background: '#ddd',
                        color: '#111',
                      }}
                    >
                      <span style={{ fontSize: 24 }}>-</span>
                      <span style={{ fontSize: 22 }}></span>
                      <span style={{ fontSize: 24 }}>+</span>
                    </div>
                  </td>
                  <td>
                    <p>
                      <strong>Rating :</strong>
                      <span
                        style={{
                          backgroundColor: 'green',
                          color: '#fff',
                          padding: '2px 5px',
                          borderRadius: '5px',
                        }}
                      >
                        3.5 ★
                      </span>
                    </p>
                    <p>
                      <strong>Order Review :</strong>
                      <span> 2525 + ordeer placed from here recently</span>
                    </p>
                    <p>
                      <strong>Remove :</strong>
                      <span>
                        <li
                          className="fas fa-trash"
                          onClick={() => handleDelete(id)}
                          style={{
                            color: 'red',
                            fontSize: '20px',
                            cursor: 'pointer',
                          }}
                        ></li>{' '}
                      </span>
                    </p>
                  </td>
                </tr>
              </Table>
            </div>
          </div>
        </section>
      </div>
     </div>
    </>
  );
};

export default CardsDetails;
