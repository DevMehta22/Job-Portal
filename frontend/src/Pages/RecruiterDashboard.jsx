import React from "react";
import { Link, useParams } from "react-router-dom";
import ListJob from "../Components/ListJob"
import axios from 'axios';
import "./Styles/RecruiterDashboard.css"

const handleDeleteProfile = (id)=>{
  // axios.delete(`http://localhost:3000/recruiter/delete/${id}`)
}

const handleUpdateProfile=(id)=>{
  // axios.put(`http://localhost:3000/recruiter/update/${id}`)
}

const RecruiterDashboard = () => {
  const {id} = useParams()
  return (
      <div className="dashboard-container">
        
        
        
        <h2 className="text-center" style={{color:"white",margin:"30px",fontFamily:"serif"}}>RECRUITER DASHBOARD</h2>
        <div className="recFunc">
        <ul>
            <li>
              <ListJob/>
            </li>
        </ul>
        </div>
      <div className="menu">
        <ul>
          <li>
            <Link to="#" className="btn btn-primary mx-3" onClick={handleUpdateProfile(id)}>Update Profile</Link>
          </li>
          <li>
          <Link to="#" className="btn btn-danger mx-3" onClick={handleDeleteProfile(id)}>Delete Profile</Link>
          </li>
        </ul>
        </div>
      </div>
  );
};

export default RecruiterDashboard;
