import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Styles/Candidate.css";

const Candidate = () => {
  const navigate = useNavigate();
  const { UserID } = useParams(); // Extract UserID from URL parameters
  const [profileData, setProfileData] = useState({
    Name: "",
    Email: "",
    Phone_No: "",
    Address: "",
    DOB: "",
    Gender: "",
  });
  const [isRegistered, setIsRegistered] = useState(false); // Track if user exists

  // Fetch candidate details based on UserID
  useEffect(() => {
    if (UserID) {
      axios
        .get(`http://localhost:8000/api/candidate/isexists/${UserID}`)
        .then((response) => {
          if (response.data) {
            setIsRegistered(true);
            navigate(`/candidate/dashboard/${response.data.candidateID}`); // Redirect to dashboard
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setIsRegistered(false); // Candidate not found
          } else {
            console.error("Error fetching candidate details:", error);
          }
        });
    }
  }, [UserID, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle profile creation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistered) {
      alert("You are already registered.");
      return;
    }
    axios
      .post(`http://localhost:8000/api/candidate/register/${UserID}`, profileData)
      .then((response) => {
        navigate(`/candidate/dashboard/${response.data.Candidate.candidateID}`);
      })
      .catch((error) => {
        console.error("Profile creation error:", error);
      });
  };

  return (
    <div className="candidate">
      <h2
        className="text-center"
        style={{ color: "black", fontFamily: "serif", fontSize: "35px" }}
      >
        Candidate Profile
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            id="Name"
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
        <div className="form-group">
          <label htmlFor="Address">Address</label>
          <input
            type="text"
            id="Address"
            name="Address"
            value={profileData.Address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Phone_No">Phone No</label>
          <input
            type="number"
            id="Phone_No"
            name="Phone_No"
            value={profileData.Phone_No}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="DOB">DOB</label>
          <input
            type="date"
            id="DOB"
            name="DOB"
            value={profileData.DOB}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Gender">Gender</label>
          <select
            id="Gender"
            name="Gender"
            value={profileData.Gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button type="submit" disabled={isRegistered}>
          {isRegistered ? "Already Registered" : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default Candidate;