import { combineReducers } from 'redux';
import { userReducers } from './user.reducer';
import { productReducers } from './product.reducer';

const rootReducer = combineReducers({
  users: userReducers,
  products: productReducers,
});

export default rootReducer;
