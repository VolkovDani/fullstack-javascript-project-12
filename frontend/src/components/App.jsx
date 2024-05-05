import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import Main from './Main.jsx';
import store from '../slices/index';
import '../network/socket.js';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
