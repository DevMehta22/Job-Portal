import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Styles/Recruiter.css";

const Recruiter = () => {
  const navigate = useNavigate();
  const { UserID } = useParams();
  const [profileData, setProfileData] = useState({ Name: "", Email: "" });
  const [errmsg, seterrmsg] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const navigateToDashboard = useCallback((RecruiterID) => {
    navigate(`/recruiter/dashboard/${RecruiterID}`);
  }, [navigate]);

  useEffect(() => {
    if (UserID) {
      axios
        .get(`http://localhost:8000/api/recruiter/isexists/${UserID}`)
        .then((response) => {
          if (response.data) {
            setIsRegistered(true);
            navigateToDashboard(response.data.RecruiterID);
          }
        })
        .catch((error) => {
          if (error.response?.status === 404) {
            setIsRegistered(false);
          } else {
            console.error("Error fetching recruiter details:", error);
          }
        });
    }
  }, [UserID, navigateToDashboard]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistered) {
      alert("You are already registered.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/recruiter/register/${UserID}`,
        profileData
      );
      navigateToDashboard(response.data.Recruiter.RecruiterID);
    } catch (error) {
      console.error("Profile creation error:", error);
      seterrmsg(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="recruiter">
      <h2 className="text-center" style={{ fontFamily: "serif", fontSize: "35px" }}>
        Recruiter Profile
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input type="text" id="name" name="Name" value={profileData.Name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input type="email" id="Email" name="Email" value={profileData.Email} onChange={handleChange} required />
        </div>
        <button type="submit">Create Profile</button>
        {errmsg && <p className="error-message">{errmsg}</p>}
      </form>
    </div>
  );
};

export default Recruiter;