import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ViewApplications.css";

const ViewApplications = () => {
  const { id,ListingID } = useParams();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(""); // To handle no applications
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [ApplicationDetails, setApplicationDetails] = useState(null);
  const [candidateDetails, setCandidateDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/recruiterfunc/applications/${ListingID}`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        if (response.data.size!==0) {
          setData(response.data);
          setMessage(""); // Reset message
          // Fetch candidate details for each application
          response.data.forEach(async (application) => {
            const candidateID = application.CandidateID;
            try {
              const candidateResponse = await axios.get(
                `http://localhost:8000/api/candidate/getcandidate/${candidateID}`
              );

              setCandidateDetails((prevState) => ({
                ...prevState,
                [candidateID]: candidateResponse.data,
              }));
            } catch (err) {
              console.log(`Error fetching candidate ${candidateID}:`, err);
            }
          });
        } else {
          setData([]); // Clear previous applications
          setMessage(response.data.message || "No applications available.");
        }
      } catch (error) {
        console.log("Error fetching applications:", error);
        setMessage("Error fetching applications. Please try again later.");
      }
    }

    fetchData();
  }, [ListingID, token]);

  const showDetails = async (ApplicationID, CandidateID) => {
    if (selectedApplication === ApplicationID) {
      setSelectedApplication(null); // Hide details if same application is clicked
    } else {
      setSelectedApplication(ApplicationID);
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/recruiterfunc/application/details/${ApplicationID}/${CandidateID}`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setApplicationDetails(response.data);
      } catch (error) {
        console.log("Error fetching application details:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStatusChange = async (ApplicationID, RecruiterID, newStatus) => {
    try {
      setStatusUpdating(true);
      await axios.put(
        `http://localhost:8000/api/recruiterfunc/updateApplication/${ApplicationID}/${RecruiterID}`,
        { Status: newStatus },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      // Update UI after successful status update
      setData((prevData) =>
        prevData.map((app) =>
          app.ApplicationID === ApplicationID ? { ...app, Status: newStatus } : app
        )
      );
    } catch (error) {
      console.log("Error updating application status:", error);
    } finally {
      setStatusUpdating(false);
    }
  };

  return (
    <div>
      <h1
        className="text-center mt-5"
        style={{ color: "white", fontFamily: "sans-serif" }}
      >
        Applications
      </h1>

      {message ? (
        <p className="text-center" style={{ color: "white" }}>{message}</p>
      ) : (
        <div className="application-list">
          {data.map((application) => (
            <div key={application.ApplicationID} className="application">
              {candidateDetails[application.CandidateID] && (
                <>
                  <h2>Candidate Details</h2>
                  <p>
                    <strong>Name: </strong>
                    {candidateDetails[application.CandidateID].Name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {candidateDetails[application.CandidateID].Email}
                  </p>
                  <p>
                    <strong>Contact: </strong>
                    {candidateDetails[application.CandidateID].Phone_No}
                  </p>
                </>
              )}
              <p>
                <strong>Status:</strong> {application.Status}
              </p>
              <p>
                <strong>Applied:</strong> {application.Applied_Date}
              </p>
              <div className="update-status">
                <label htmlFor="status">Update Status:</label>
                <select
                  disabled={statusUpdating}
                  value={application.Status}
                  onChange={(e) =>
                    handleStatusChange(application.ApplicationID, id, e.target.value)
                  }
                >
                  <option value="SUBMITTED">SUBMITTED</option>
                  <option value="INTERVIEW SCHEDULED">INTERVIEW SCHEDULED</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="HIRED">HIRED</option>
                </select>
              </div>
              <div className="application-details">
                <button
                  className="view-btn"
                  onClick={() => showDetails(application.ApplicationID, application.CandidateID)}
                >
                  Details
                </button>
              </div>

              {selectedApplication === application.ApplicationID && (
                <div className="details">
                  {loading ? (
                    <p>Loading...</p>
                  ) : ApplicationDetails ? (
                    <>
                      <h2>Application Details</h2>
                      <h3>Education Details:</h3>
                      <p>Degree: {ApplicationDetails.Educationdetails?.Degree}</p>
                      <p>Institution: {ApplicationDetails.Educationdetails?.Institution}</p>
                      <p>Major: {ApplicationDetails.Educationdetails?.Major}</p>
                      <p>Graduation Year: {ApplicationDetails.Educationdetails?.Graduation_year}</p>

                      <h3>Experience Details:</h3>
                      <p>Position: {ApplicationDetails.Experiencedetails?.Position}</p>
                      <p>Company: {ApplicationDetails.Experiencedetails?.Company}</p>
                      <p>Skill Name: {ApplicationDetails.Experiencedetails?.skill_name}</p>

                      <h3>Resume Data:</h3>
                      <div className="resume">
                        <iframe
                          src={`http://localhost:8000/${ApplicationDetails.ResumeData?.ResumeData}`}
                          width="100%"
                          height="600px"
                        ></iframe>
                        <a href={`http://localhost:8000/${ApplicationDetails.ResumeData?.ResumeData}`} download>
                          Download Resume
                        </a>
                      </div>
                    </>
                  ) : (
                    <p>No details available.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplications;