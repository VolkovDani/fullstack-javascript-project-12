import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Main () {
  const navigator = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('user'); 
    if (!token) navigator('/login')
    else return (
      <>
        <h1>Hello from MAIN</h1>
      </>
    )
  })
}