import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => (
  <>
    <h1 style={{ display: 'flex', alignContent: 'center' }}>Страница не найдена</h1>
    <Link to="/">Back to Main</Link>
  </>
);

export default Error;
