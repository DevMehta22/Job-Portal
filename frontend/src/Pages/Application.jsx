import React, { useState } from "react";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";
import "./Styles/Application.css";

const Application = ({ job, onSubmit }) => {
    const{id,ListingID} = useParams()
    const navigate = useNavigate()
    console.log(id,ListingID)
    const [education, setEducation] = useState({
        degree: "",
        institution: "",
        major: "",
        graduationYear: ""
    });

    const [experience, setExperience] = useState({
        position: "",
        company: "",
        skills:"",
        startDate: "",
        endDate: ""
    });

    const [resume, setResume] = useState(null);

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setEducation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleExperienceChange = (e) => {
        const { name, value } = e.target;
        setExperience(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!resume) return alert("Please upload your resume");
        axios.post(`http://localhost:3000/api/candidatefunc/apply/${id}/${ListingID}`,{
            Degree: education.degree,  
            Institution: education.institution, 
            Major: education.major,
            Graduation_year: education.graduationYear,
            Position: experience.position,
            Company: experience.company,
            start_date:experience.startDate,
            end_date:experience.endDate,
            skill_name:experience.skills,
            ResumeData: resume
        },{ headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    .then((response)=>{
        console.log(response);
        alert("Success! Your application has been submitted.");
        navigate(`/candidate/dashboard/${id}`)
    }).catch((err)=>{
        console.log(err)
        alert('Error occurred while submitting the form');
    })
    };

    return (
        <div className="form-container">
            <h2>Apply</h2>
            <form onSubmit={handleSubmit}>
                <div className="section">
                    <h3>Education</h3>
                    <label>
                        Degree:
                        <input type="text" name="degree" value={education.degree} onChange={handleEducationChange} />
                    </label>
                    <label>
                        Institution:
                        <input type="text" name="institution" value={education.institution} onChange={handleEducationChange} />
                    </label>
                    <label>
                        Major:
                        <input type="text" name="major" value={education.major} onChange={handleEducationChange} />
                    </label>
                    <label>
                        Graduation Year:
                        <input type="text" name="graduationYear" value={education.graduationYear} onChange={handleEducationChange} />
                    </label>
                </div>
                <div className="section">
                    <h3>Experience</h3>
                    <label>
                        Position:
                        <input type="text" name="position" value={experience.position} onChange={handleExperienceChange} />
                    </label>
                    <label>
                        Company:
                        <input type="text" name="company" value={experience.company} onChange={handleExperienceChange} />
                    </label>
                    <label>
                        Skills:
                        <input type="text" name="skills" value={experience.skills} onChange={handleExperienceChange} />
                    </label>
                    <label>
                        Start Date:
                        <input type="date" name="startDate" value={experience.startDate} onChange={handleExperienceChange} />
                    </label>
                    <label>
                        End Date:
                        <input type="date" name="endDate" value={experience.endDate} onChange={handleExperienceChange} />
                    </label>
                </div>
                <div className="section">
                    <h3>Resume</h3>
                    <input type="file" onChange={handleResumeChange} />
                </div>
                <button type="submit">Apply</button>
            </form>
        </div>
    );
};

export default Application;
