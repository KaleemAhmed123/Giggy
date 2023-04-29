import React, { useState } from "react";
import "./Login.scss";
import axiosUtil from "../../utils/axiosUtil";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosUtil.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      // axios way
      setError(err.response.data);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>

        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter Email"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        {/* if err show err */}
        {error && error}
      </form>
    </div>
  );
}

export default Login;
