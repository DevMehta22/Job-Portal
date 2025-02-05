// 
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './ListJob.css';
import { useParams,useNavigate } from 'react-router-dom';

const ListJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // let ID = parseInt(id.substring(1))
  const token = localStorage.getItem('token')
  // State to manage list of jobs
  const [jobs, setJobs] = useState([]);
  // State to manage form inputs
  const [Title, setTitle] = useState('');
  const [CompanyName, setCompanyName] = useState('');
  const [Sector, setSector] = useState('');
  const [JobType, setJobType] = useState('Full Time');
  const [Description, setDescription] = useState('');
  const [SalOffered, setSalOffered] = useState('');
  const [Location, setLocation] = useState('');
  const [Deadline, setDeadline] = useState('');

  useEffect(()=>{
    try {
      async function fetchData(){
        await axios.get(`http://localhost:8000/api/recruiterfunc/jobs/${id}`,{
        headers:{
            'x-auth-token':token
        }
      })
      .then((i) => setJobs(i.data))
      }
      fetchData()
      
    } catch (error) {
      console.log("Error", error);
    }
  },[id,token])


  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send POST request to backend API
      await axios.post(`http://localhost:8000/api/recruiterfunc/list/${id}`, {
        Title,
        CompanyName,
        Sector,
        JobType,
        Description,
        SalOffered,
        Location,
        Deadline,
      },{
        headers:{
            'x-auth-token':token
        }
      }).then((res)=>{
        setJobs(prevJobs => [...prevJobs, res.data]);
        console.log(res.data)
        alert("Sucessfully added!")
          // Clear form inputs
          setTitle('');
          setCompanyName('');
          setSector('');
          setJobType('Full Time');
          setDescription('');
          setSalOffered('');
          setLocation('');
          setDeadline('');
      }).catch((err)=>{
        console.error(err);
      })
      
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleDelete = async (ListingID) => {
    try {
      await axios.delete(`http://localhost:8000/api/recruiterfunc/deletejob/${ListingID}`, {
        headers: {
          'x-auth-token': token
        }
      });
      setJobs(jobs.filter(job => job.ListingID !== ListingID));
      alert("Successfully deleted!");
    } catch (error) {
      console.error('Error deleting job:', error.response);
    }
  };

  return (
    <div className="list-job">
      <h3 style={{fontFamily:"serif",color:"white",backgroundColor:"slategray",textAlign:'center',borderRadius:"10px"}}>List Job</h3>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company Name</label>
          <input
            type="text"
            id="company"
            value={CompanyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sector">Sector</label>
          <input
            type="text"
            id="sector"
            value={Sector}
            onChange={(e) => setSector(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobType">Job Type</label>
          <select
            id="jobType"
            value={JobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary Offered</label>
          <input
            type="number"
            id="salary"
            value={SalOffered}
            onChange={(e) => setSalOffered(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            value={Deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <button type="submit">Add Job</button>
      </form>
      {/* List of jobs */}
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
              <button className='delete-btn' onClick={() => handleDelete(job.ListingID)}>Delete</button>
              <button className='update-btn' onClick={()=>{navigate(`/updatejob/${job.ListingID}`);}}>Update</button>
              <button className='view-btn' onClick={()=>{navigate(`/recruiters/applications/${id}/${job.ListingID}`)}}>View Applications</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListJob;
