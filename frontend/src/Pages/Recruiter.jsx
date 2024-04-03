import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Styles/Recruiter.css"; 

const Recruiter = () => {
    const navigate = useNavigate()
  const [profileData, setProfileData] = useState({
    Name: "",
    Email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:3000/api/recruiter/`)
    .then((response)=>{
      console.log(response.data[0])
      for(let res in response.data){
        if(profileData.Name===response.data[res].Name && profileData.Email===response.data[res].Email){
          alert("You are already registered as a recruitment professional.")
          navigate(`/recruiter/dashboard/:${response.data[res].RecruiterID}`)
        }else{
          axios.post("http://localhost:3000/api/recruiter/register", profileData)
      .then((response) => {
        // console.log(response);
        navigate(`/recruiter/dashboard/:${response.data.Recruiter.RecruiterID}`)
      })
      .catch((error) => {
        console.error("Profile creation error:", error);
      });
        }
      }
    }).catch(err=>console.log(err.message))
    
  };

  return (
    <div className="recruiter">
      <h2 className="text-center" style={{fontFamily:"serif",fontSize:"35px"}}>Recruiter Profile</h2>
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
        <button className="btn btn-danger" onClick={handleSubmit}>Enter Dashboard</button>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default Recruiter;
