import * as types from './actionType';
import axios from 'axios';

const addToCart = (cart) => ({
  type: types.ADD_CART,
  payload: cart,
});
const cartDeleted = () => ({
  type: types.DELETE_CART,
});
const getCart = (cart) => ({
  type: types.GET_SINGLE_CART,
  payload: cart,
});

const host = 'http://localhost:4001';
export const addCart = (data, headers) => {
  return function (dispacth) {
    axios
      .post(`${host}/api/users/add-to-cart`, data, { headers })
      .then((res) => {
        console.log('addCart', res.data);
        dispacth(addToCart(res.data));
      })
      .catch((error) => console.log(error));
  };
};
export const deleteCart = (data) => {
  return function (dispacth) {
    axios
      .post(`${host}/api/users/delete-cart`, data)
      .then((res) => {
        console.log('deleteCart', res.data);
        dispacth(cartDeleted());
      })
      .catch((error) => console.log(error));
  };
};
export const getSingleCart = (data) => {
  return function (dispacth) {
    axios
      .post(`${host}/api/users/get-single-cart`, data)
      .then((res) => {
        console.log('getSingleCart', res.data.data[0]);
        dispacth(getCart(res.data.data[0]));
      })
      .catch((error) => console.log(error));
  };
};
