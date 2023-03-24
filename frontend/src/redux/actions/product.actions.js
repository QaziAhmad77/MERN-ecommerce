import * as types from './actionType';
import axios from 'axios';

const getProducts = (products) => ({
  type: types.GET_PRODUCTS,
  payload: products,
});
const productAdded = (product) => ({
  type: types.ADD_PRODUCT,
  payload: product,
});
const productDeleted = () => ({
  type: types.DEL_PRODUCT,
});
const getProduct = (product) => ({
  type: types.GET_SINGLE_PRODUCT,
  payload: product,
});
const productUpdated = (product) => ({
  type: types.UPDATE_PRODUCT,
  payload: product,
});

const host = 'http://localhost:4001';
export const loadProducts = (headers) => {
  return function (dispacth) {
    axios
      .get(`${host}/api/products/get-products`, { headers })
      .then((res) => {
        console.log('res', res);
        dispacth(getProducts(res.data));
      })
      .catch((error) => console.log(error));
  };
};

export const addProduct = (formData, headers) => {
  return function (dispacth) {
    axios
      .post(`${host}/api/products/add-product`, formData, { headers })
      .then((res) => {
        console.log('addProducts', res.data);
        dispacth(productAdded(res.data));
      })
      .catch((e) => console.log(e));
  };
};

export const deleteProduct = (data, headers) => {
  return function (dispacth) {
    axios
      .post(`${host}/api/products/delete-products`, data, { headers })
      .then((res) => {
        console.log('deleted', res);
        dispacth(productDeleted());
        dispacth(getProducts());
      })
      .catch((error) => console.log(error));
  };
};

export const getSingleProduct = (id, headers) => {
  return function (dispacth) {
    axios
      .get(`${host}/api/products/get-product/${id}`, { headers })
      .then((res) => {
        console.log('respos', res.data.data);
        dispacth(getProduct(res.data.data));
        return true;
      })
      .catch((error) => console.log(error));
  };
};

export const updateProduct = (formData, headers) => {
  return function (dispacth) {
    axios
      .put(`${host}/api/products/edit-product`, formData, { headers })
      .then((res) => {
        console.log('res', res);
        dispacth(productUpdated(formData));
      })
      .catch((error) => console.log(error));
  };
};
