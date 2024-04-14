import React from "react";
import ListJob from "../Components/ListJob"
import "./Styles/RecruiterDashboard.css"

const RecruiterDashboard = () => {
  return (
      <div className="dashboard-container">
        <h2 className="text-center" style={{color:"black",margin:"30px",fontFamily:"serif"}}>RECRUITER DASHBOARD</h2>
        <div className="recFunc">
              <ListJob/>
        </div>
      </div>
  );
};

export default RecruiterDashboard;
