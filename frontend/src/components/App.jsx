import '../assets/application.scss';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import Main from './Main.jsx';
import store from '../slices/index';
import SignUp from './SignUp.jsx';
import '../network/socket.js';
import MainHeader from './MainHeader.jsx';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div
        className="d-flex flex-column h-100"
      >
        <MainHeader />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
