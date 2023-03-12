import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../login.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const data = { name: userName, password };
  const handleLogin = async () => {
    try {
      console.log(userName, password);
      const res = await axios.post(
        'http://localhost:4001/api/users/login',
        data
      );
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('userId', res.data.user._id);
        localStorage.setItem('rights', JSON.stringify(res.data.user.roles));
        // if(res.data.user.type === "USER"){
        //   navigate("/home");
        // }
        // if(res.data.user.type === "SELLER"){
        navigate('/get/products');
        //   }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="sign-up-form">
        <h1>Login your account</h1>
        <input
          type="text"
          className="input-box"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => {
            console.log(e.target.value);
            setUserName(e.target.value);
          }}
        />
        <input
          type="password"
          className="input-box"
          placeholder="Your Password"
          value={password}
          onChange={(e) => {
            console.log(e.target.value);
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
    </>
  );
};

export default Login;
