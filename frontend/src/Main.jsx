import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { channels as channelsRoute } from './routes';
import { actions as channelsActions } from './slices/channels';

export default function Main() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  useEffect(() => {
    const userAuthInfo = JSON.parse(localStorage.getItem('user'));
    if (!userAuthInfo) navigator('/login');
    else {
      axios.get(channelsRoute.getAll(), {
        headers: {
          Authorization: `Bearer ${userAuthInfo.token}`,
        },
      }).then((res) => {
        dispatch(channelsActions.setChannels({
          id: userAuthInfo.username,
          channels: res.data,
        }));
        // console.log(res.data);
      })
        .catch(console.error);
    }
  });
  return (
    <>
      <h1>Hello from MAIN</h1>
    </>
  );
}
