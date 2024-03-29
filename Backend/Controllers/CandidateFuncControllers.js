const {JobListing,Education,Experience,Resume,JobApplication} = require('../Models/models')

const ViewJobs = async(req,res)=>{
    try{
        const jobsData = await JobListing.findAll();
        res.status(200).json(jobsData);
    } catch(err){
        console.log('Error in fetching job listings', err);
        res.status(500).json({ error : 'Internal server error' });
    }
}

const  ApplyForJob = async(req,res) => {
    const {CandidateId , ListingId}= req.params;
    try {
        const {Degree,Institution,Major,Graduation_year,Position,Company,start_date,end_date,skill_name,ResumeData} = req.body;
        if (!Degree || !Institution || !Major || !Graduation_year || !skill_name || !ResumeData) {
            return res.status(400).json({ message: "please provide all required fields." })
        }
        let  applicantCheck = await JobApplication.findOne({where :{
            CandidateId:CandidateId,
            ListingId: ListingId
        }});

        if (applicantCheck){
            return res.status(409).json({message:"You have already applied for this job!"});
        }
        
        let education = await Education.findOne({where: {CandidateId:CandidateId}})
        if (!education) {
            await Education.create ({CandidateId, Degree, Institution, Major, Graduation_year});
        }else{
            await education.update({Degree, Institution, Major, Graduation_year});
        }

        let experience = await Experience.findOne({where: {CandidateId:CandidateId}})
        if (!experience) {
            await Experience.create ({CandidateId,Position,Company,start_date,end_date,skill_name});
        }else{
            await experience.update({Position,Company,start_date,end_date,skill_name});
        }

        let resume = await Resume.findOne({where: {CandidateId:CandidateId}})
        if (!resume) {
            await Resume.create ({CandidateId,ResumeData});
        }else{
            await resume.update({ResumeData});
        }
        const newApplication = await JobApplication.create({CandidateId,ListingId});
        console.log(newApplication);
        res.status(201).json({msg:"Application Submitted Successfully!"});
    } catch (error) {
        console.log("Error occured while applying:",error);
        res.status(500).json("Internal Server Error");
    }
}

module.exports = {ViewJobs,ApplyForJob};