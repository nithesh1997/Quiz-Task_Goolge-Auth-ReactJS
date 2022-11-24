import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import QuizSlice from './Redux-toolkit/QuizSlice';
import AuthSlice from './Redux-toolkit/AuthSlice';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    'quiz': QuizSlice,
    'auth': AuthSlice
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
