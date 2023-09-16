import React, { useState } from "react";
import "./Register.scss";
import uploadUtil from "../../utils/uploadUtil";
import axiosUtil from "../../utils/axiosUtil";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  // all info except file
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUser((prev) => {
      // [variable] notation- all are text
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // that checkbox
  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  // handle Submit- {user, cdn}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    // will return cloudinary cdn url
    const url = await uploadUtil(file);

    try {
      setIsLoading(true);
      await axiosUtil.post("/auth/register", {
        ...user,
        img: url, // databse has img name in schema
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    //
  };

  // console.log(user);
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        {/* Left */}
        <div className="left">
          <h1>Create a new account</h1>

          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter Name"
            onChange={handleChange}
          />

          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
          />

          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="eg- India Usa"
            onChange={handleChange}
          />

          {/* Button with loading indicator */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
          <Link className="asSeller" to="/login">
            Already got an account
          </Link>
        </div>

        {/* Right */}
        <div className="right">
          <h1>I want to become a seller</h1>
          <span className="asSeller">
            For looking all features of project sign up as SELLER - toggle
            button below ⬇️
          </span>

          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>

          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />

          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
          {/*  */}
        </div>
        {/* Right end */}
      </form>
    </div>
  );
}

export default Register;
