import React from "react";
import { Link, useParams } from "react-router-dom";
import ListJob from "../Components/ListJob"
import ViewApplications from "../Components/ViewApplications"
import axios from "axios";
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
        <h1 className="text-center" style={{color:"white",margin:"20px",fontFamily:"serif"}}>Recruiter Dashboard</h1>
        <ul>
            <li>
              <ListJob/>
            </li>
            <li>
              <ViewApplications/>
            </li>
        </ul>
           
      </div>
  );
};

export default RecruiterDashboard;
