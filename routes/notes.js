var express = require('express');
var router = express.Router();
var notes = require("../Controller/Notes")
/* GET users listing. */

// router.get("/getNote",notes.getNote)
router.get("/getNoteByEmail/:email",notes.getNoteByEmail)
router.post("/createNote",notes.createNote)
router.post("/deleteNote",notes.deleteNote)
router.put("/updateNote",notes.updateNote)
module.exports = router;
