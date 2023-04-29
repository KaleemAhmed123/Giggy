import React, { useState } from "react";
import "./Register.scss";
import uploadUtil from "../../utils/uploadUtil";
import axiosUtil from "../../utils/axiosUtil";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
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
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setUser((prev) => {
      // [variable] notation- all are text
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // its a checkbox
  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  // handle Submit- {user, cdn}
  const handleSubmit = async (e) => {
    e.preventDefault();

    // will return cloudinary cdn url
    const url = await uploadUtil(file);

    try {
      await axiosUtil.post("/auth/register", {
        ...user,
        img: url, // databse has img name in schema
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
    //
  };
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

          <button type="submit">Register</button>
        </div>
        {/* Right */}
        <div className="right">
          <h1>I want to become a seller</h1>

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
