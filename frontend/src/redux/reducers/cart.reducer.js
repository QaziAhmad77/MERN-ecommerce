import * as types from '../actions/actionType';
const initialState = {
  carts: [],
  cart: {},
  loading: true,
};

export const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CART:
      return {
        ...state,
        cart: action.payload,
        carts: [...state.carts, action.payload],
        Loading: false,
      };
    case types.DELETE_CART:
      return {
        ...state,
        Loading: false,
      };
    case types.GET_SINGLE_CART:
      return {
        ...state,
        cart: action.payload,
        Loading: false,
      };
    default:
      return state;
  }
};
