import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; 

const SignUp = () => {
const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "", 
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
      .post("http://localhost:3000/api/auth/signup", formData)
      .then((response) => {
        console.log(response);
        setSuccessMessage("Successfully Signed Up!")
         setTimeout(() => {
          setSuccessMessage(null);
        }, 3000)
        //navigate("/login");
      })
      .catch((error) => {
        console.error("Signup error:", error);
      });

    console.log("Form submitted:", formData);
  };

  return (
    <div className="container1">
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
        <div className="form-group">
          <label>Role</label>
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={formData.role === "recruiter"}
                onChange={handleChange}
              />
              Recruiter
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="candidate"
                checked={formData.role === "candidate"}
                onChange={handleChange}
              />
              Candidate
            </label>
          </div>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default SignUp;
