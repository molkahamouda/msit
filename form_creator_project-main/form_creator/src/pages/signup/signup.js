import "./signup.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config/config";

const Signup = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, email, phoneNumber, password } = registerData;
      await axios
        .post(`${baseUrl}/api/users/create`, {
          username,
          email,
          phoneNumber,
          password,
        })
        .then((response) => {
          navigate("/login");
        })
        .catch((error) => {});
    } catch (error) {
      console.error(error.response?.data || "An error occurred");
    }
  };

  return (
    <div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Signup</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              value={registerData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <box-icon type="solid" name="Email" color="white"></box-icon>
          </div>
          <div className="input-box">
            <input
              type="text"
              name="phoneNumber"
              value={registerData.phoneNumber}
              onChange={handleChange}
              placeholder="tel"
              required
            />
            <box-icon type="solid" name="tel" color="white"></box-icon>
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <box-icon name="lock-alt" type="solid" color="white"></box-icon>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
              placeholder="confirmPassword"
              required
            />
            <box-icon name="lock-alt" type="solid" color="white"></box-icon>
          </div>

          <button type="submit" className="btn">
            Submit
          </button>
          <div className="register-link">
            <p>
              Already have an account?
              <br />
              <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
