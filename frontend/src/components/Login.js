import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const data = { userName, password };
  const handleLogin = async () => {
    try {
      console.log(userName, password);
      const res = await axios.post("http://localhost:4000/users", data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user",JSON.stringify(res.data.user));
        localStorage.setItem("userId",res.data.user._id);
        localStorage.setItem("rights",JSON.stringify(res.data.user.roles));
        // if(res.data.user.type === "USER"){
        //   navigate("/home");
        // }
        // if(res.data.user.type === "SELLER"){
          navigate("/get/products");
      //   }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div>
        <h1>Login page</h1>
        <div><Link to="/signup">Sign Up page</Link></div>
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
