import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './Main.jsx';
import Error from './Error.jsx';
import Login from './Login.jsx';
import store from './slices/index';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <h1>Hello world</h1>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
