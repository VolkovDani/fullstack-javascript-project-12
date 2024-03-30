// import './App.css';
import Login from "./Login";
import Error from "./Error";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./Main";

function App() {
  return (
    <BrowserRouter>
    <h1>Hello world</h1>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
