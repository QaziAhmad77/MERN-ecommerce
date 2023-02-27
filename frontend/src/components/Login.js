import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const data = { userName, password };
  const handleLogin = async () => {
    try {
      console.log(userName, password);
      const res = await axios.post("http://localhost:4000/users", data);
      if (res.data.password) {
        localStorage.setItem("token", res.data.password);
        navigate("/home");
      }
    } catch (error) {
      console.log(error.message);
    }
    console.log(userName, password);
  };
  return (
    <>
      <div>
        <h1>Login page</h1>
        USERNAME -
        <input
          type="text"
          value={userName}
          onChange={(e) => {
            console.log(e.target.value);
            setUserName(e.target.value);
          }}
        />{" "}
        <br /> <br />
        PASSWORD -
        <input
          type="password"
          value={password}
          onChange={(e) => {
            console.log(e.target.value);
            setPassword(e.target.value);
          }}
        />
        <br /> <br />
        <button onClick={handleLogin}>SUBMIT</button>
      </div>
    </>
  );
};

export default Login;
