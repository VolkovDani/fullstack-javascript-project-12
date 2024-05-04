import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import Main from './Main.jsx';
import store from '../slices/index';
import { channelsActions } from '../slices/channels.js';
import { messagesActions } from '../slices/messages.js';

const socket = io();

socket
  .on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  })
  .on('newMessage', (payload) => {
    if (payload) {
      store.dispatch(messagesActions.addMessage(payload));
    }
  });

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
