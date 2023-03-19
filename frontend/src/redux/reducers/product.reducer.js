import * as types from '../actions/actionType';
const initialState = {
  products: [],
  product: {},
  loading: true,
};

export const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PRODUCT:
      return {
        ...state,
        product: action.product,
        loading: false,
      };
    case types.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case types.DEL_PRODUCT:
      return {
        ...state,
        loading: false,
      };
    case types.GET_SINGLE_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case types.UPDATE_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
