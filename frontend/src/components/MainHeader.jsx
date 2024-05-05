import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainHeader = () => {
  const userData = localStorage.getItem('user');
  const navigator = useNavigate();
  const handleCLick = () => {
    navigator('/login');
    localStorage.removeItem('user');
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {
          userData
            ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCLick}
              >
                Выйти
              </button>
            )
            : null
        }
      </div>
    </nav>
  );
};

export default MainHeader;
