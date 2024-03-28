const {JobListing,JobApplication,Recruiter} = require('../Models/models')

const RegisterRecruiter = async(req,res)=>{
    const {Name,Email} = req.body
    if (!Name || !Email) {
        return res.status(400).json({msg:"Please enter all fields"})
    }
    try{
        let recruiter = await Recruiter.findOne({email: Email});
        if (recruiter){
            return res.status(400).json({msg:'User already exists'})
        }
        const newUser = await Recruiter.create({Name,Email})
        res.status(201).json("Recruiter:\n",newUser);
    }catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
}

const ListJob = async(req,res)=>{
    const {RecruiterID} = req.params
    const validRecruiter = await Recruiter.findByPk(RecruiterID)
    if(!validRecruiter){
        return res.status(400).send('Invalid Recruiter ID')
    }
    const {Title,CompanyName,Sector,JobType,Description,SalOffered,Location,Deadline} = req.body
    await JobListing.create({RecruiterID,Title,CompanyName,Sector,JobType,Description,SalOffered,Location,Deadline})
    .then((job)=>res.status(201).json("Job succesfully added!\n",job))
    .catch(e=>{
        console.log(e)
    })
}

const getAllApplications = async(req,res) => {
    const {ListingID} = req.params
    try{
        const applications = await JobApplication.find({where:{ListingID:ListingID}})
        res.status(200).json(applications)
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Internal Server error"})
    }
}
const updateApplication = async(req,res)=>{
    const {ApplicationID,RecruiterID}=req.params

    let appicationCheck = await JobApplication.findOne({where:{ApplicationID: ApplicationID}})
    let recruiterCheck = await JobListing.findOne({where:{RecruiterID:RecruiterID}})
    
    if (!appicationCheck || !recruiterCheck ) {
        return res.status(400).json("Error in finding the application or listing")
    }

    const {Status} = req.body
    await JobApplication.update({Status},{where:{ApplicationID:ApplicationID}});
    res.status(200).json("Update Successful!")
}

module.exports = {RegisterRecruiter,ListJob,getAllApplications,updateApplication}