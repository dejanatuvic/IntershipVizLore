import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h2 className="mb-2">ZEST Project</h2>
      <p className='text-center'>Sending data via Orion Context Broker and storing it in the database</p>
      <div>
        <button className="btn btn-primary mx-2" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="btn btn-outline-primary mx-2" onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    </div>
  );
};

export default HomePage;
