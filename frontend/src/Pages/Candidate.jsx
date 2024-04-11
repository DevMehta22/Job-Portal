import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Styles/Candidate.css"; 

const Candidate = () => {
    const navigate = useNavigate()
  const [profileData, setProfileData] = useState({
    Name: "",
    Email: "",
    Phone_no:"",
    Address:"",
    DOB:"",
    Gender:""
  });

  const handleChange = (e) => { 
    const { name, value } = e.target;
    console.log(value)
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:3000/api/candidate/getcandidates`)
    .then((response1)=>{
      console.log(response1.data[0])
      for(let res in response1.data){
        if(profileData===response1.data[res]){
          alert("You are already registered.")
        }else{
            console.log(profileData)
          axios.post("http://localhost:3000/api/candidate/register", profileData)
      .then((response) => {
        console.log(response);
        navigate(`/candidate/dashboard/${response.data.Candidate.candidateID}`)
      })
      .catch((error) => {
        console.error("Profile creation error:", error);
      });
          
        }
      }
    }).catch(err=>console.log(err.message))
    
    
  };

  const handleClick = () =>{
    axios.get(`http://localhost:3000/api/candidate/getcandidates`)
    .then((response)=>{
      let c=0;
      console.log(response)
      for(let res in response.data){
        if(profileData===response.data[res]){
          navigate(`/candidate/dashboard/:${response.data[res].CandidateID}`)
          c=1
        }
      }
      if (c===0) {
        alert("You are not registered.")
      }
      
    }).catch(err=>console.log(err.message))
    
  }

  return (
    <div className="candidate">
      <h2 className="text-center" style={{fontFamily:"serif",fontSize:"35px"}}>Candidate Profile</h2>
      <form  onSubmit={handleSubmit}>
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
          <label htmlFor="Phone_no">Phone_no</label>
          <input
            type="number"
            id="Phone_no"
            name="Phone_no"
            value={profileData.Phone_no}
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
            type="true"
            id="Gender"
            name="Gender"
            value={profileData.Gender}
            onChange={handleChange}
          >
            <option value="Male"> Male</option>
            <option value="Female">Female</option>
            
          </select>
        </div>
        <button className="btn btn-danger" onClick={handleClick}>Enter Dashboard</button>
        <button onClick={handleSubmit}>Create Profile</button>
      </form>
    </div>
  );
};

export default Candidate;
