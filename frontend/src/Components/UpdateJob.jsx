import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateJob.css'

const UpdateJob = () => {
  const { ListingID } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [job, setJob] = useState({
    Title: '',
    CompanyName: '',
    Sector: '',
    JobType: '',
    Description: '',
    SalOffered: '',
    Location: '',
    Deadline: ''
  });

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await axios.get(`http://localhost:8000/api/recruiterfunc/job/${ListingID}`, {
          headers: {
            'x-auth-token': token
          }
        });
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    }
    fetchJob();
  }, [ListingID, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob(prevJob => ({
      ...prevJob,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/recruiterfunc/updatejob/${ListingID}`, job, {
        headers: {
          'x-auth-token': token
        }
      });
      alert('Job updated successfully!');
      navigate(`/recruiter/dashboard/${job.RecruiterID}`); // Redirect to job list after update
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div className="update-job">
      <h3>Update Job</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input type="text" id="title" name="Title" value={job.Title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company Name</label>
          <input type="text" id="company" name="CompanyName" value={job.CompanyName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="sector">Sector</label>
          <input type="text" id="sector" name="Sector" value={job.Sector} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="jobType">Job Type</label>
          <select id="jobType" name="JobType" value={job.JobType} onChange={handleChange}>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea id="description" name="Description" value={job.Description} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary Offered</label>
          <input type="number" id="salary" name="SalOffered" value={job.SalOffered} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="Location" value={job.Location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input type="date" id="deadline" name="Deadline" value={job.Deadline} onChange={handleChange} />
        </div>
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
};

export default UpdateJob;
