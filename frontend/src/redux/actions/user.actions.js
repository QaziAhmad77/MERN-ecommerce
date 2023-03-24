import * as types from './actionType';
import axios from 'axios';

const userAdded = (user) => ({
  type: types.ADD_USER,
  payload: user,
});
const userSignIn = () => ({
  type: types.LOGIN_USER,
});

const host = 'http://localhost:4001';

export const addUser = (formData) => {
  return function (dispacth) {
    axios
      .post(`${host}/api/users/signup`, formData)
      .then((res) => {
        console.log('addUser', res.data);
        dispacth(userAdded(res.data));
      })
      .catch((e) => console.log(e));
  };
};

export const signInUser = (data) => {
  return function (dispatch) {
    return axios
      .post(`${host}/api/users/login`, data)
      .then((res) => {
        console.log('logInuser', res.data);
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          localStorage.setItem('userId', res.data.user._id);
          localStorage.setItem('rights', JSON.stringify(res.data.user.roles));
        }
        dispatch(userSignIn());
        return true; 
      })
      .catch((e) => {
        console.log(e);
        return false; 
      });
  };
};
