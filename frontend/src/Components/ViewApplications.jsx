import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ViewApplications.css";

const ViewApplications = () => {
  const { ListingID } = useParams();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  
  const [selectedApplication, setSelectedApplication] = useState([]);
  const [ApplicationDetails, setApplicationDetails] = useState();
  const [candidateDetails, setCandidateDetails] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      async function fetchData() {
        console.log(ListingID);
        await axios.get(`http://localhost:3000/api/recruiterfunc/applications/${ListingID}`,
            {
              headers: {
                "x-auth-token": token,
              },
            }
          )
          .then((i) => {
            setData(i.data)
            i.data.forEach(async (application) => {
              const candidateID = application.CandidateID;
              const candidateResponse = await axios.get(`http://localhost:3000/api/candidate/getcandidate/${candidateID}`);
              setCandidateDetails(prevState => ({
                ...prevState,
                [candidateID]: candidateResponse.data
              }));
            });
          });
      }
      fetchData();
    } catch (error) {
      console.log("Error", error);
    }
  }, [ListingID,token]);


  const showDetails = async (ApplicationID, CandidateID) => {
    // Toggle selected application
    if (selectedApplication === ApplicationID) {
      setSelectedApplication(null); // If the same application is clicked again, hide details
    } else {
      setSelectedApplication(ApplicationID); // Show details of the clicked application
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/recruiterfunc/application/details/${ApplicationID}/${CandidateID}`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setApplicationDetails(response.data);
        console.log(candidateDetails)
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false);
      }
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
      <div className="application-list">
        {data.map((application) => (
          <div key={application.ApplicationID} className="application">
            {candidateDetails[application.CandidateID] && (
                      <>
                        <h2>Candidate Details</h2>
                        <p><strong>Name: </strong>{candidateDetails[application.CandidateID].Name}</p>
                        <p><strong>Email: </strong>{candidateDetails[application.CandidateID].Email}</p>
                        <p><strong>Contact: </strong>{candidateDetails[application.CandidateID].Phone_No}</p>
                      </>
                    )}
            {/* <h2>{application.ApplicationID}</h2> */}
            <p>
              <strong>Status:</strong> {application.Status}
            </p>
            <p>
              <strong>Applied :</strong> {application.Applied_Date}
            </p>

            <div className="application-details">
              <button button className="update-btn">
                Update
              </button>
              <button
                className="view-btn"
                onClick={() => {
                  showDetails(
                    application.ApplicationID,
                    application.CandidateID
                  );
                }}
              >
                Details
              </button>
            </div>
            {selectedApplication === application.ApplicationID && (
              <div className="details">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <h2>Application Details</h2>
                    <h3>Education Details:</h3>
                    <p>Degree: {ApplicationDetails.Educationdetails.Degree}</p>
                    <p>
                      Institution:{" "}
                      {ApplicationDetails.Educationdetails.Institution}
                    </p>
                    <p>Major: {ApplicationDetails.Educationdetails.Major}</p>
                    <p>
                      Graduation Year:{" "}
                      {ApplicationDetails.Educationdetails.Graduation_year}
                    </p>
                    <h3>Experience Details:</h3>
                    <p>
                      Position: {ApplicationDetails.Experiencedetails.Position}
                    </p>
                    <p>
                      Company: {ApplicationDetails.Experiencedetails.Company}
                    </p>
                    <p>
                      Skill Name:{" "}
                      {ApplicationDetails.Experiencedetails.skill_name}
                    </p>
                    <h3>Resume Data:</h3>
                    <div className="resume">
                    <iframe src={`http://localhost:3000/${ApplicationDetails.ResumeData.ResumeData}`} width="100%" height="600px"></iframe>
                    <a href={`http://localhost:3000/${ApplicationDetails.ResumeData.ResumeData}`} download>Download Resume</a>
                    </div>
                    
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewApplications;
