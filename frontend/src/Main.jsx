import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { channels as channelsRoute } from './routes';
import { actions as channelsActions } from './slices/channels';
import { actions as authActions } from './slices/auth';
import Chat from './Chat.jsx';
import Login from './Login.jsx';

export default function Main() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const authState = useSelector((state) => state.auth);
  useEffect(() => {
    const userAuthInfo = JSON.parse(localStorage.getItem('user'));
    if (!userAuthInfo) navigator('/login');
    else {
      dispatch(authActions.setAuth(userAuthInfo));
      axios.get(channelsRoute.getAll(), {
        headers: {
          Authorization: `Bearer ${userAuthInfo.token}`,
        },
      }).then((res) => {
        dispatch(channelsActions.setChannels({
          id: userAuthInfo.username,
          channels: res.data,
        }));
      }).catch(console.error);
    }
  });
  if (authState.token) {
    return (
    <>
      <Chat />
    </>);
  }
  return (
    <>
      <Login />
    </>
  );
}
