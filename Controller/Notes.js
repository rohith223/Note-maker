const db = require("../Entity");
const Notes = db.notes;
const createNote=async(req,res)=>{
    try {
        const {title,note,category,userEmail} = req.body
        const time = new Date(Date.now())
        const date = time.getFullYear()+'-'+time.getMonth()+1+'-'+time.getDate()+' '+time.getHours()+':'+time.getMinutes()
        +':'+time.getSeconds()
        let createNoteData={
            title:title,
            category:category,
            date:date,
            note:note,
            userEmail:userEmail
        }
        let createNote = await Notes.create(
            createNoteData
        )
        res.status(200).send({message:"Note created succefully"})
    } catch (error) {
        res.status(500).send({message:"Internal error"})
    }

}
const getNote=async(req,res)=>{
    try {
        let getAllNote=await Notes.findAll();
        
        if(getAllNote)
        {
            res.status(200).send(getAllNote)
        }
        else{
            res.status(400).send({message:"error fetching"})
        }
 }catch (error) {
        res.status(500).send({message:"Internal error"})
    } 
    
}
const deleteNote=async(req,res)=>{
    try {
        let {id}= req.body;
        let deleteNotesbyId=await Notes.destroy({where:{
            id:id
        }})
        res.status(200).send({message:"Deleted successfully"})
    } catch (error) {
        res.status(500).send({message:"Internal error"})
    }
}
const updateNote=async(req,res)=>{
    try {
        const { title,note,category,note_id} = req.body
        const time = new Date(Date.now())
        const date = time.getFullYear()+'-'+time.getMonth()+1+'-'+time.getDate()+' '+time.getHours()+':'+time.getMinutes()
        +':'+time.getSeconds()
        let updateNoteData={
            title:title,
            category:category,
            note:note,
            date:date,
        }
        let update= await Notes.update(updateNoteData,{where:{
            id:note_id
        }})
        res.status(200).send({message:"Updated"})
    } catch (error) {
        res.status(500).send({message:"Internal error"})
    }
}
const getNoteByEmail = async(req,res)=>{
    console.log(req.params.email );
try {
    let getNote = await Notes.findAll({where:{userEmail:req.params.email}})
    console.log(getNote);
    if(getNote.length !== 0)
    {
        res.status(200).send(getNote)
    }
    else{
        res.status(400).send({message:"No Notes"})
    }
    // res.status(200).send(getNote)
} catch (error) {
    res.status(500).send({message:"Internal error"})
}
}
module.exports={
    createNote,
    deleteNote,
    updateNote,
    getNoteByEmail,
    getNote
}