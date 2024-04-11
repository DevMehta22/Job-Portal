const {JobListing,JobApplication,Recruiter,Education,Experience,Resume} = require('../Models/models')

const ListJob = async(req,res)=>{
    const {RecruiterID} = req.params
    const validRecruiter = await Recruiter.findByPk(RecruiterID)
    if(!validRecruiter){
        return res.status(400).send('Invalid Recruiter ID')
    }
    const {Title,CompanyName,Sector,JobType,Description,SalOffered,Location,Deadline} = req.body
    await JobListing.create({RecruiterID,Title,CompanyName,Sector,JobType,Description,SalOffered,Location,Deadline})
    .then((job)=>res.status(201).json(job))
    .catch(e=>{
        console.log(e)
    })
}

const getJobsByID = async(req,res)=>{
    const {RecruiterID} = req.params
    const validRecruiter = await Recruiter.findByPk(RecruiterID)
    if(!validRecruiter){
        return res.status(400).send('Invalid Recruiter ID')
    }
    try {
        await JobListing.findAll({where:{RecruiterID:RecruiterID}})
            .then(data =>{
                res.status(200).json(data)
            }).catch(e=>{
                console.log(e)
            })
    } catch (error) {
        console.log("Error in getting job by id: ", error);
        return res.status(500).send(`Server Error!`)
    }
}

const getAllApplications = async(req,res) => {
    const {ListingID} = req.params
    try{
        const applications = await JobApplication.findAll({where:{ListingID:ListingID}})
        res.status(200).json(applications)
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Internal Server error"})
    }
}

const applicationDetails = async(req,res)=>{
    const {ApplicationID,CandidateID} = req.params
    const checkApplication = await JobApplication.findByPk(ApplicationID)
    
    if (!checkApplication)
        return res.status(400).json("No Application Found")
    
    const Educationdetails = await Education.findOne({where:{CandidateID:CandidateID}})
    const Experiencedetails = await Experience.findOne({where:{candidateID:CandidateID}})
    const ResumeData = await Resume.findOne({where:{CandidateID:CandidateID}})
    if (Educationdetails && Experiencedetails && ResumeData) {
        res.status(200).json({'Education':Educationdetails,'Experience':Experiencedetails,"Resume":ResumeData});
    }else{
        return res.status(406).json({'Error in data': 'The candidate has not filled up all details yet.'});
    }

}
const updateApplication = async(req,res)=>{
    const {ApplicationID,RecruiterID}=req.params

    let appicationCheck = await JobApplication.findOne({where:{ApplicationID: ApplicationID}})
    let recruiterCheck = await JobListing.findOne({where:{RecruiterID:RecruiterID}})
    
    if (!appicationCheck || !recruiterCheck ) {
        return res.status(400).json({error:"Error in finding the application or listing"})
    }

    const {Status} = req.body
    await JobApplication.update({Status},{where:{ApplicationID:ApplicationID}});
    res.status(200).json({msg:"Update Successfull!"})
}

module.exports = {ListJob,getJobsByID,getAllApplications,applicationDetails,updateApplication}