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

const deleteNote = async (req, res) => {
    try {
      const { id } = req.body;
      console.log(id)
  
      // Update the 'deleted' flag instead of physically deleting the record
      const updatedNote = await Notes.update(
        { deleted: true },
        {
          where: {
            id: id,
          },
        }
      );
      console.log("updnote",updateNote)
  
      if (updatedNote[0] === 0) {
        // No records were updated, indicating the note with the given ID doesn't exist
        return res.status(404).send({ message: "Note not found" });
      }
  
      res.status(200).send({ message: "Soft deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal error" });
    }
  };
  
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
    if(getNote.length !== 0 && db.notes.deleted == null)
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
    getNoteByEmail
}