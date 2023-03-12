import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../login.css"

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const data = { name: userName, password: password, type: type };
  const handleSignUP = async () => {
    try {
      console.log(userName, password);
      const res = await axios.post(
        'http://localhost:4001/api/users/signup',
        data
      );
      console.log(res);
      if (res.status === 201) {
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
    console.log(userName, password);
  };
  return (
    <>
    <div className='main'>
      <div className="sign-up-form">
        <i className="fa-solid fa-user-plus"></i>
        <h1>Sign Up Now</h1>
        <input
          type="text"
          className="input-box"
          placeholder='Your Name'
          value={userName}
          onChange={(e) => {
            console.log(e.target.value);
            setUserName(e.target.value);
          }}
        />
        <input
          type="password"
          className="input-box"
          placeholder='Your Password'
          value={password}
          onChange={(e) => {
            console.log(e.target.value);
            setPassword(e.target.value);
          }}
        />
        <select
          name="user-type"
          className="input-box1"
          onChange={(e) => {
            console.log(e.target.value);
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
