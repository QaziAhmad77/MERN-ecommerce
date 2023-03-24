import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions/user.actions';
import './login.css';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const data = { name: userName, password: password, type: type };
  const handleSignUP = (e) => {
    e.preventDefault();
    if (!userName || !password || !type) {
      setError('Please fill all input fields');
    } else {
      Dispatch(addUser(data));
      navigate('/');
      setError('');
    }
  };
  return (
    <>
      <div className="main">
        <div className="sign-up-form">
          <i className="fa-solid fa-user-plus"></i>
          <h1>Sign Up Now</h1>
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
          <select
            name="user-type"
            className="input-box1"
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option>Select Type</option>
            <option value="SELLER">SELLER</option>
            <option value="USER">USER</option>
          </select>
          <p>
            <span>
              <input type="checkbox"></input>
            </span>
            I agree to the terms of Services
          </p>
          <button className="signup-btn" onClick={handleSignUP}>
            Sign up
          </button>
          <hr />
          <p className="or">OR</p>
          <p>
            Do you have an account ? <Link to="/">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
