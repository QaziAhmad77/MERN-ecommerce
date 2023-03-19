import { combineReducers } from 'redux';
import { userReducers } from './user.reducer';
import { productReducers } from './product.reducer';
import { cartReducers } from './cart.reducer';

const rootReducer = combineReducers({
  users: userReducers,
  products: productReducers,
  carts: cartReducers,
});

export default rootReducer;
