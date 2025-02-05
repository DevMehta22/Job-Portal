import axios  from "axios";
import React from "react";
import { useState,useEffect } from "react";
import './Jobs.css'
import { useNavigate,useParams } from "react-router-dom";

const Jobs = ()=>{
    const [jobs,setJobs] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams()
    // Fetch jobs data from the server and set it to our state. 
    useEffect(() => {
        async function  getData() {
            try {
                let response = await axios.get("http://localhost:8000/api/candidatefunc/jobs");
                console.log(response.data)
                setJobs(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);
    console.log(jobs)
    return(
        <div className="job-list">
        {jobs.map((job) => (
            <div key={job.ListingID} className="job">
              {/* Display job details */}
              <h2>{job.Title}</h2>
              <p><strong>Company:</strong> {job.CompanyName}</p>
              <p><strong>Sector:</strong> {job.Sector}</p>
              <p><strong>Job Type:</strong> {job.JobType}</p>
              <p><strong>Description:</strong> {job.Description}</p>
              <p><strong>Salary Offered:</strong> {job.SalOffered}</p>
              <p><strong>Location:</strong> {job.Location}</p>
              <p><strong>Deadline:</strong> {job.Deadline}</p>
              <div className="job-actions">
                <button className='view-btn ' onClick={()=>{navigate(`/candidate/apply/${id}/${job.ListingID}`)}}>Apply</button>
              </div>
            </div>
          ))}
        </div>
    )

}
export default Jobs