import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import React from 'react';
import { Provider } from 'react-redux';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}