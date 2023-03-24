import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInUser } from '../redux/actions/user.actions';
import './login.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const data = { name: userName, password };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userName || !password) {
      setError('Please fill all input fields');
    } else {
      const login = await Dispatch(signInUser(data));
      if (login) {
        navigate('/get/products');
        setError('');
      }
    }
  };
  return (
    <>
     <div className="main1">
     <div className="sign-up-form">
        <h1>Login your account</h1>
        {error && (
          <h3 style={{ color: 'red', textAlign: 'center' }}>{error}</h3>
        )}
        <input
          type="text"
          className="input-box"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          type="password"
          className="input-box"
          placeholder="Your Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="signup-btn" onClick={handleLogin}>
          SUBMIT
        </button>
        <hr />
        <p className="or">OR</p>
        <p>
          Do you have an account ? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
     </div>
    </>
  );
};

export default Login;
