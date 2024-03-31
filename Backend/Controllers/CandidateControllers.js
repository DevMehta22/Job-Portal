const {Candidate} = require('../Models/models')

const RegisterCandidate = async(req,res)=>{
    const {Name,Email,Phone_no,Address,DOB,Gender} = req.body;
    if (!Name || !Email || !Phone_no || !Address || !DOB || !Gender) {
        res.status(401).json({message: "Please provide all the details"});
    }
    try{
        //check if the user is already registered or not
        let checkUser=await UserModel.findOne({where : {Email: Email}});
        if(checkUser){
            return res.status(409).send("User Already Exists");
        }
        const newCandidate = await Candidate.create({Name,Email,Phone_no,Address,DOB,Gender});
        res.status(201).json({"Candidate": newCandidate});
    }catch(err){
        console.log('Error in registering candidate', err);
        res.status(500).json({error: 'Internal Server Error'})
    }
}

const getAllCandidates = async(req,res)=>{
    try {
        const  candidates = await Candidate.findAll();
        if (candidates) {
            res.status(200).json(candidates);
        }else{
            res.status(404).json({ message : 'No Data Found!' });
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json("Error fetching Candidates")
    }
}

const getACandidate = async (req , res ) => {
    const {id}=req.params;
    try{
       const data = await Candidate.findOne({where:{CandidateId:id}});
       if(!data)
           return res.status(404).json("Data Not Found!");
       res.status(200).json(data);
   }catch(e){
       res.status(500).json({error:"Internal server error!"});
   }
}

const updateProfile=async(req,res)=>{
    const {id} = req.params;
    const updates=req.body;

    const checkCandidate = await  Candidate.findOne({ where: { CandidateId: id } })
    if (!checkCandidate){
        return res.status(400).json({ error:'Candidate does not exist.' })
    }
    try{
        await Candidate.update(updates,{where:{CandidateId:id}})
        res.status(201).json("Updates successfull!")
    }catch(err){
        console.log(err);
        res.status(401).json({error:"Error updating  profile."})
    }
}

const deleteProfile = async(req,res)=>{
    const {id} = req.params;
    try{
         await Candidate.destroy({where:{CandidateId : id}});
         res.status(200).send('Deleted Successfully')
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Error deleting record"})
    }
}

module.exports = {RegisterCandidate,getAllCandidates,getACandidate,updateProfile,deleteProfile};