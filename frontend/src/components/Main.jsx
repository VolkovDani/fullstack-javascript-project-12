import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigator = useNavigate();
  const userAuthInfo = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!userAuthInfo) navigator('/login');
  });
  if (userAuthInfo) {
    return (
      <h1>Hello</h1>
    );
  } return null;
};

export default Main;
