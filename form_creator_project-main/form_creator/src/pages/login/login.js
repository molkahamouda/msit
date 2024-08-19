import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthProvider";
import { baseUrl } from "../../config/config";
import "./login.css"

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  // const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [errorForms, setErrorForms] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    if (errorForms[name]) {
      setErrorForms((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = async (e, a) => {
    // console.log(a);
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.target.classList.add("was-validated");
      try {
        const { username, password } = loginData;

        await axios
          .post(`${baseUrl}/login`, {
            username,
            password,
          })
          // .then((response) => {
          //   setIsAuthenticated({
          //     ...isAuthenticated,
          //     data: response.data.data,
          //   });
          //   navigate("/forms/myforms");
          // })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 401) {
                setErrorForms((prevErrors) => ({
                  ...prevErrors,
                  username: "Invalid username",
                  password: "",
                }));
              } else if (error.response.status === 402) {
                setErrorForms((prevErrors) => ({
                  ...prevErrors,
                  username: "",
                  password: "Incorrect password",
                }));
              }
            } else {
              //
            }
            // console.log("Request error :", error);
          });
      } catch (error) {
        console.error(error.response?.data || "An error occurred");
      }
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <form onSubmit={handleSubmit} noValidate >
          <h1>Login</h1>
          <div className="input-box">
            <input
              name="username"
              type="text"
              value={loginData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <div className="text-danger small mt-2 fw-bold">
              {errorForms?.username}
            </div>
          </div>
          <div className="input-box">
            <input
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <div className="text-danger small mt-2 fw-bold">
              {errorForms?.password}
            </div>
          </div>
          <div className="remember-forget mt-1">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/">Forgot password?</a>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account?
              <br />
              <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
