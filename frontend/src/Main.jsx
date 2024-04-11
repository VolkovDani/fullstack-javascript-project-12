import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { channels as channelsRoute } from './routes';

export default function Main() {
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
        console.log(res.data);
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
