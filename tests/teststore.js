import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../redux/reducer'; // Import your application's root reducer

export const createTestStore = (initialState = {}) => {
  return createStore(
    rootReducer,
    initialState
  );
};