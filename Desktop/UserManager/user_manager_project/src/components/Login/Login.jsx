import React, { useState } from 'react';
import './Login.css';
import { useAuth } from '../../contexts/AuthContext'; 
import { Link } from 'react-router-dom';

const Login = () => {
  const { currentUser, login, logout, Post, GetAllUsers } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];

    const users = GetAllUsers();
    const user = users.find(element => element.email === email && element.password === password);

    if (user && user.isConfirmed) {
      login(user);
      setErrors([]);
    } else {
      newErrors.push('Invalid credentials');
      setErrors(newErrors);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div id="loginForm">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div id="loginFormHead">Login</div>
          <div className="formGroup">
            <div className="loginLabel">Email:</div>
            <input
              type="email"
              className="loginInput"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="formGroup">
            <div className="loginLabel">Password:</div>
            <input
              type="password"
              className="loginInput"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="buttonGroup">
            <button id="loginButton" type="submit">Login</button>
            <button id="resetButton" type="button" onClick={() => {
              setEmail('');
              setPassword('');
              setErrors([]);
            }}>Reset</button>
          </div>
          {errors.length > 0 && (
            <div className="errorGroup">
              {errors.map((error, index) => (
                <div key={index} className="errorItem">{error}</div>
              ))}
            </div>
          )}
        <div className="registrationPrompt">
            <p>Don't have an account? <Link to='/client/auth/registration'>Sign up here</Link>.</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
