import React from 'react';
import Button from 'react-bootstrap/Button';

const MainHeader = () => {
  const userData = localStorage.getItem('user');
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {
          userData
            ? (
              <Button
                variant="primary"
                href="/login"
              >
                Выйти
              </Button>
            )
            : null
        }
      </div>
    </nav>
  );
};

export default MainHeader;
