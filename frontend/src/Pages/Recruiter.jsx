import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Styles/Recruiter.css";

const Recruiter = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    Name: "",
    Email: "",
  });
  const [errmsg,seterrmsg] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8000/api/recruiter/`).then((response1) => {
        console.log(response1.data);
        if (response1.data.length == 0) {
          axios
            .post("http://localhost:8000/api/recruiter/register", profileData)
            .then((response) => {
              // console.log(response);
              navigate(
                `/recruiter/dashboard/${response.data.Recruiter.RecruiterID}`
              );
            })
            .catch((error) => {
              console.error("Profile creation error:", error);
              seterrmsg(error)
              console.log(errmsg)
              // setTimeout(()=>{
              //   seterrmsg(null)
              // },8000)
            });
        }
        for (let res in response1.data) {
          if (
            profileData.Name === response1.data[res].Name &&
            profileData.Email === response1.data[res].Email
          ) {
            alert("You are already registered.");
          } else {
            axios
              .post("http://localhost:8000/api/recruiter/register", profileData)
              .then((response) => {
                // console.log(response);
                navigate(
                  `/recruiter/dashboard/${response.data.Recruiter.RecruiterID}`
                );
              })
              .catch((error) => {
                console.error("Profile creation error:", error);
              });
          }
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleClick = () => {
    axios
      .get(`http://localhost:8000/api/recruiter/`)
      .then((response) => {
        let c = 0;
        console.log(response);
        for (let res in response.data) {
          if (
            profileData.Name === response.data[res].Name &&
            profileData.Email === response.data[res].Email
          ) {
            navigate(`/recruiter/dashboard/${response.data[res].RecruiterID}`);
            c = 1;
          }
        }
        if (c === 0) {
          alert("You are not registered.");
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="recruiter">
      <h2
        className="text-center"
        style={{ fontFamily: "serif", fontSize: "35px" }}
      >
        Recruiter Profile
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            id="name"
            name="Name"
            value={profileData.Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={profileData.Email}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-danger" onClick={handleClick}>
          Enter Dashboard
        </button>
        <button onClick={handleSubmit}>Create Profile</button>
        {errmsg && <p className="error-message">{errmsg}</p>}
      </form>
    </div>
  );
};

export default Recruiter;
