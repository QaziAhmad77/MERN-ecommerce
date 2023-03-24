import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCart } from '../redux/actions/cart.actions';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { cart } = useSelector((state) => state.carts);
  const handleDelete = (productId) => {
    const _productId = productId;
    const userId = localStorage.getItem('userId');
    const data = { productId: _productId, userId };
    dispatch(deleteCart(data));
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: '60px' }}>
        <Container>
          <Nav className="me-auto">
            <Button style={{ backgroundColor: 'black', marginRight: '25px' }}>
              <NavLink
                to="/add/product"
                className="textDecoration-none text-light mx-3"
              >
                AddProduct
              </NavLink>
            </Button>
            <Button style={{ backgroundColor: 'black', marginRight: '25px' }}>
              <NavLink to="/" className="textDecoration-none text-light mx-3">
                Login
              </NavLink>
            </Button>
            <Button style={{ backgroundColor: 'black', marginRight: '8px' }}>
              <NavLink to="/signup" className="textDecoration-none text-light">
                SignUp
              </NavLink>
            </Button>
            <Button
              style={{ backgroundColor: 'black' }}
              className="textDecoration-none text-light mx-3"
              onClick={() => {
                localStorage.clear();
                navigate('/');
              }}
            >
              Logout
            </Button>
          </Nav>
          <Badge
            badgeContent={cart?.data?.cart?.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: '25px', cursor: 'pointer' }}
            ></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {cart?.data?.cart ? (
            <div
              className="card_details"
              style={{ width: '25rem', padding: '10px' }}
            >
              <Table>
                <thead>
                  <tr>
                    <th
                      style={{
                        display: 'block',
                        marginRight: '4rem',
                        marginLeft: '1rem',
                      }}
                    >
                      Photo
                    </th>
                    <th>Restaurant Name</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.data.cart.map((item) => {
                    return (
                      <React.Fragment key={item._id}>
                        <tr>
                          <td>
                            <NavLink
                              to={`/cart/${item._id}`}
                              onClick={handleClose}
                            >
                              <img
                                alt=""
                                src={`http://localhost:4001/${item.image}`}
                                style={{ width: '5rem', height: '5rem' }}
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>Name: {item.name}</p>
                            <p>Category: {item.price}</p>
                            <p>Seller: {item.seller}</p>
                            <p>Price: Rs {item.price}</p>
                            <p
                              style={{
                                color: 'red',
                                cursor: 'pointer',
                                fontSize: 20,
                              }}
                              onClick={() => handleDelete(item._id)}
                            >
                              <i className="fas fa-trash smalltrash"></i>
                            </p>
                          </td>
                          <td
                            className="mt-5"
                            style={{
                              color: 'red',
                              cursor: 'pointer',
                              fontSize: 20,
                            }}
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          >
                            <p>
                              <i className="fas fa-trash largetrash"></i>
                            </p>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                  <tr>
                    <td>
                      <p className="text-center">Total: ₹ {price} </p>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-item-center"
              style={{ width: '24rem', padding: 10, position: 'relative' }}
            >
              <i
                className="fas fa-close smallclose"
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 20,
                  fontSize: 23,
                  cursor: 'pointer',
                }}
              ></i>
              <p style={{ fontSize: 22, marginTop: 20 }}>Your carts is empty</p>
              <img
                src="../cart.gif"
                alt=""
                className="emptycart_img"
                style={{ width: '5rem', padding: 10 }}
              />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
