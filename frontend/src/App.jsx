import './assets/application.scss';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './network/socket.js';
import MainHeader from './components/MainHeader.jsx';
import store from './slices/index';
import NotFound from './pages/NotFound.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import Main from './pages/Main.jsx';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div
        className="d-flex flex-column h-100"
      >
        <MainHeader />
        <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
