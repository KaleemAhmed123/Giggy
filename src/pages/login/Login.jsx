import React, { useState } from "react";
import "./Login.scss";
import axiosUtil from "../../utils/axiosUtil";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axiosUtil.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      // axios way
      setError(err?.response?.data);
    } finally {
      setLoading(false);
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

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading...." : "Login"}
        </button>

        <Link className="asSeller" to="/register">
          Wanna create an account ?
        </Link>

        <div className="gray">
          <div>sample ID's for testing: </div>
          <hr />
          <div>username: arpan nandan</div>
          <div>password: 12345</div>
          <div>its a seller id</div>
          <hr />

          <div>username: kaleem ahmed</div>
          <div>password: 12345</div>
          <div>its a buyer id</div>
          <hr />
        </div>

        {/* if err show err */}
        {error && error}
      </form>
    </div>
  );
}

export default Login;
