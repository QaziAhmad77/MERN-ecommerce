import * as types from '../actions/actionType';
const initialState = {
  user: {},
  loading: true,
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case types.LOGIN_USER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
