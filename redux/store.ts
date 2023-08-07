import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can choose a different storage engine here
import rootReducer from './reducer'; // Replace this with your root reducer

// Configuration for Redux persist
const persistConfig = {
  key: 'root', // The key used to store the state in storage
  storage, // The storage engine to use (e.g., localStorage)
  // You can customize the blacklist/whitelist to include/exclude specific reducers from being persisted
  blacklist: ['blacklistedReducer'], 
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = createStore(persistedReducer);

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
