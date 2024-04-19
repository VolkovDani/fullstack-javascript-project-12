import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import Main from './Main.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
