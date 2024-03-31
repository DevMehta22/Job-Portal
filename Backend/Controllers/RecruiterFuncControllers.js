const {JobListing,JobApplication,Recruiter} = require('../Models/models')

const ListJob = async(req,res)=>{
    const {RecruiterID} = req.params
    const validRecruiter = await Recruiter.findByPk(RecruiterID)
    if(!validRecruiter){
        return res.status(400).send('Invalid Recruiter ID')
    }
    const {Title,CompanyName,Sector,JobType,Description,SalOffered,Location,Deadline} = req.body
    await JobListing.create({RecruiterID,Title,CompanyName,Sector,JobType,Description,SalOffered,Location,Deadline})
    .then((job)=>res.status(201).json({"Job succesfully added!\n":job}))
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
        return res.status(400).json({error:"Error in finding the application or listing"})
    }

    const {Status} = req.body
    await JobApplication.update({Status},{where:{ApplicationID:ApplicationID}});
    res.status(200).json({msg:"Update Successfull!"})
}

module.exports = {ListJob,getAllApplications,updateApplication}