const {Recruiter} = require('../Models/models')

const RegisterRecruiter = async(req,res)=>{
    const {UserID} = req.params;
    const {Name,Email} = req.body
    if (!Name || !Email) {
        return res.status(400).json({msg:"Please enter all fields"})
    }
    try{
        let recruiter = await Recruiter.findOne({where: {Email:Email}});
        console.log(recruiter)
        if (recruiter){
            return res.status(400).json({msg:'User already exists'})
        }
        const newUser = await Recruiter.create({Name,Email,UserID})
        res.status(201).json({"Recruiter":newUser});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

const getRecruiters = async(req,res)=>{
    try {
        const recruiters = await Recruiter.findAll()
        res.status(200).send(recruiters)
    } catch (error) {
        console.log(error)
        res.status(404).json({err:"No record found"})
    }
}

const getARecruiter = async(req,res)=>{
    const {id} = req.params;
    try{
        const user = await Recruiter.findOne({where: {RecruiterID:id}})
        res.status(200).json({"Recruiter":user})
    }catch(err){
        console.log(err)
        res.status(404).json({msg:"Record not found!"})
    }
}

const isRecruiterExists = async(req,res)=>{
    const {UserID} = req.params;
    try{
        const recruiter = await Recruiter.findOne({where:{UserID:UserID}});
        if(!recruiter)
            return res.status(404).json({ message: "Recruiter not found" });
        res.status(200).json(recruiter);
    }catch(e){
        console.error("Error fetching Recruiter:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


const updateRecruiter = async(req,res)=>{
    const {id} = req.params
    const updateFields = req.body

    const checkRecruiter = Recruiter.findByPk(id)
    if (!checkRecruiter) {
        res.status(400).json({error:"Recruiter does not exist"})
    }
    try {
        await Recruiter.update(updateFields,{where:{RecruiterID:id}})
        res.status(201).json({msg:"Recruiter updated successfully!"})
        
    } catch (error) {
        console.log(error)
        res.status(401).json({error:"Error updating profile"})
    }
}

const deleteRecruiter = async(req,res)=>{
    const {id} = req.params
    try{
        await Recruiter.destroy({where:{RecruiterID : id}});
        res.status(200).send('Deleted Successfully')
   }catch(err){
       console.log(err);
       res.status(500).json({error:"Error deleting record"})
   }
    
}

module.exports = {RegisterRecruiter,getRecruiters,isRecruiterExists,getARecruiter,updateRecruiter,deleteRecruiter}