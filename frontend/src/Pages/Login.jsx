import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Styles/Login.css"; 

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/auth/login", formData)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        console.log(localStorage.getItem('token'));
        if (response.data.role == "recruiter") {
            navigate("/recruiter")    
        }else{
            navigate("/candidate")
        }
        
      })
      .catch((error) => {
        console.error("Login error:", error);
      });

    console.log("Form submitted:", formData);
  };

  return (
    <div className="container2">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
