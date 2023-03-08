import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const data = { name: userName, password: password, type: type };
  const handleSignUP = async () => {
    try {
      console.log(userName, password);
      const res = await axios.post("http://localhost:4001/api/users/signup", data);
      console.log(res);
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
    console.log(userName, password);
  };
  return (
    <>
      <div>
        <h1>SignUp page</h1>
        <div><Link to="/login">Login page</Link></div>
        USERNAME -
        <input
          type="text"
          value={userName}
          onChange={(e) => {
            console.log(e.target.value);
            setUserName(e.target.value);
          }}
        />
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
        USER TYPE -
        <input
          type="password"
          value={type}
          onChange={(e) => {
            console.log(e.target.value);
            setType(e.target.value);
          }}
        />
        <button onClick={handleSignUP}>SUBMIT</button>
      </div>
    </>
  );
};

export default SignUp;
