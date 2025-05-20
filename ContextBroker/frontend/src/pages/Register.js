import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [comfPassword, setComfPassword] = useState('')
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

     if (password != comfPassword) {
            setErrorMsg("Try again, passwords do not match");
        }

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/'); 
      } else {
        setErrorMsg(data.message || 'Login error');
      }
    } catch (error) {
      setErrorMsg('Server error');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Register</h2>
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
         <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={password}
            onChange={(e) => setComfPassword(e.target.value)}
            placeholder="Repeat your password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sing up</button>
      </form>
      <p className="mt-3">
        Already have an account? <a href="/">Sing in</a>
      </p>
    </div>
  );
}

