const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//Route 1: Get all the notes
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
 
})

//Route 2: Add notes Login Required
router.post('/addnotes',fetchuser,[
    body('title', "Enter a Valid Title").isLength({ min: 3 }),
    body('description', 'Minimum description length must be 5').isLength({ min: 5 })
], async (req,res)=>{

    try {
        const {title,description, tag} = req.body;
    // if there are errors, return Bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Notes({
      title, description,tag,user: req.user.id
    })
    const savedNote = await note.save();

    res.json(savedNote)
    } catch (error) {
        console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
     
 })

 //Rout 3: Update an existing note, login required
 router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
  try {
    const {title, description, tag} = req.body;
  //  Create a newnote object
  const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};


  //Find the note to be updated
  let note = await Notes.findById(req.params.id);
  if(!note){res.status(404).send("Not Found")}

  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not allowed");
  }

  note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
  res.json({note});
  } catch (error) {
    console.log(error.message);
      res.status(500).send("Some Error Occured");
  }
  
 })

 //Route 4: Delete Notes using delete
 router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
  try {
    //Find the note to be deleted
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")}

  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not allowed");
  }

  note = await Notes.findByIdAndDelete(req.params.id)
  res.json({"Success": "Note has been deleted", note : note});
  } catch (error) {
    console.log(error.message);
      res.status(500).send("Some Error Occured");
  }

  
 })

module.exports = router