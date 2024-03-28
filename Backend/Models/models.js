require('dotenv').config()
const sequelize = require('sequelize')

const db = new sequelize({
    dialect: 'mysql',
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
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
    },
    CompanyName: {
        type: sequelize.STRING,
        allowNull: false
    },
    Sector: {
        type: sequelize.STRING,
        allowNull: false
    },
    Branch_Address: {
        type: sequelize.TEXT, 
        allowNull: true
    }
});

const JobListing = db.define("JobListing",{
    ListingID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    RecruiterID: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Recruiters',
            key: 'RecruiterID'
        }
    },
    Title: {
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
    CandidateID: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Candidates',
            key: 'CandidateID'
        }
    },
    ListingID: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'JobListings',
            key: 'ListingID'
        }
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
    CandidateID: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Candidates',
            key: 'CandidateID'
        }
    },
    FileData: {
        type: sequelize.BLOB('long'),
        allowNull: false
    }
});

const Education = db.define("Education",{
    EducationID: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CandidateID: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Candidates',
            key: 'CandidateID'
        }
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
    candidateID: {
      type: sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Candidates',
        key: 'CandidateID'
      }
    },
    Postion: {
      type: sequelize.STRING,
      allowNull: false
    },
    Company: {
      type: sequelize.STRING,
      allowNull: false
    },
    start_date: {
      type: sequelize.DATE,
      allowNull: false
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

//Associations
JobListing.belongsTo(Recruiter);
Recruiter.hasMany(JobListing);

JobApplication.belongsTo(Candidate);
Candidate.hasOne(JobApplication);

Education.belongsTo(Candidate);
Experience.belongsTo(Candidate);
Resume.belongsTo(Candidate);
Candidate.hasOne(Resume);
Candidate.hasMany(Experience);
Candidate.hasMany(Education);

const syncModel = async()=>{
    try {
        await db.sync({alter: true});
        console.log("Models Synchronized")
    } catch (error) {
        console.log(error);
    }
}

module.exports = {syncModel}