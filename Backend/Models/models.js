require('dotenv').config()
const sequelize = require('sequelize')

const db = new sequelize({
    dialect: 'mysql',
    host: process.env.HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

const Candidate = db.define("Candidate",{
    candidateID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: sequelize.STRING,
        allowNull: false
    },
    Email:{
        type : sequelize.STRING,
        allowNull: false
    },
    Phone_No: {
        type : sequelize.BIGINT,
        allowNull: true
    },
    Address: {
        type: sequelize.TEXT, 
        allowNull: true
    },
    DOB: {
        type: sequelize.DATE,
        allowNull: false
    },
    Gender: {
        type: sequelize.ENUM('Male','Female'),
        allowNull: false
    },
    Registration_Date: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    }
});

const Recruiter = db.define("Recruiter",{
    RecruiterID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: sequelize.STRING,
        allowNull: false
    },
    Email:{
        type : sequelize.STRING,
        allowNull: false
    }
});

const JobListing = db.define("JobListing",{
    ListingID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Title: {
        type: sequelize.STRING,
        allowNull: false
    },
    CompanyName: {
        type: sequelize.STRING,
        allowNull: false
    },
    Sector: {
        type: sequelize.STRING,
        allowNull: false
    },
    JobType: {
        type: sequelize.ENUM('Full Time', 'Part Time','Internship'),
        allowNull: false
    },
    Description: {
        type: sequelize.TEXT, 
        allowNull: false
    },
    SalOffered:{
        type: sequelize.DECIMAL(10,2),
        allowNull: false
    },
    Location:{
        type: sequelize.STRING,
        allowNull: false
    },
    Posted_Date: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    },
    Deadline: {
        type : sequelize.DATE,
        allowNull: false
    } 
});

const JobApplication = db.define("JobApplication",{
    ApplicationID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Status:{
        type: sequelize.ENUM('SUBMITTED','INTERVIEW SCHEDULED','REJECTED','HIRED'),
        defaultValue:'SUBMITTED',
        allowNull: false
    },
    Applied_Date: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW
    }, 
});

const Resume = db.define("Resume",{
    ResumeID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ResumeData: {
        type: sequelize.STRING,
        allowNull: false
    }
});

const Education = db.define("Education",{
    EducationID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Degree: {
        type: sequelize.STRING,
        allowNull: false
      },
    Institution: {
        type: sequelize.STRING,
        allowNull: false
      },
    Major: {
        type: sequelize.STRING,
        allowNull: false
      },
    Graduation_year: {
        type: sequelize.INTEGER,
        allowNull: false
      }
});

const Experience = db.define('Experience', {
    ExperienceID: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Position: {
      type: sequelize.STRING,
      allowNull: true
    },
    Company: {
      type: sequelize.STRING,
      allowNull: true
    },
    start_date: {
      type: sequelize.DATE,
      allowNull: true
    },
    end_date: {
      type: sequelize.DATE,
      allowNull: true 
    },
    skill_name: {
      type: sequelize.STRING,
      allowNull: false
    }
  });

const User = db.define('User',{
    UserID:{
        type:sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type :sequelize.STRING ,
        unique :true ,
        allowNull :false
    },
    password : {
        type:sequelize.STRING,
        allowNull:false
    },
    role:{
        type:sequelize.ENUM("candidate","recruiter"),
    }
}) 

//Associations
// JobListing.belongsTo(Recruiter);
// Recruiter.hasMany(JobListing);

// JobApplication.belongsTo(Candidate);
// Candidate.hasOne(JobApplication);

// Education.belongsTo(Candidate);
// Experience.belongsTo(Candidate);
// Resume.belongsTo(Candidate);
// Candidate.hasOne(Resume);
// Candidate.hasMany(Experience);
// Candidate.hasMany(Education);

Recruiter.hasMany(JobListing);
JobListing.belongsTo(Recruiter);

Candidate.hasMany(JobApplication);
JobApplication.belongsTo(Candidate);

Candidate.hasMany(Education);
Education.belongsTo(Candidate);

Candidate.hasMany(Experience);
Experience.belongsTo(Candidate);

Candidate.hasOne(Resume);
Resume.belongsTo(Candidate);

const syncModel = async()=>{
    try {
        await db.sync({alter: true});
        console.log("Models Synchronized")
    } catch (error) {
        console.log("Error at model sync:\n",error);
    }
}

module.exports = {
    syncModel,
    User,
    Candidate,
    Recruiter,
    JobListing,
    JobApplication,
    Resume,
    Education,
    Experience
}