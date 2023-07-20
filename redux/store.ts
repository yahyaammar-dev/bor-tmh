// store.js
import { createStore } from 'redux';
import rootReducer from './reducer'; // Create this file in the next step

const store = createStore(rootReducer);

export default store;