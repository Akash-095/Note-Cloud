import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000'

  //const [state, setState] = useState(s1)
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

   //Get all Notes
   const getNotes = async () => {
    //to do api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      
    });
    const json =await response.json();
   // console.log(json);
    setNotes(json);

  }



  //Add a Note
  const addNote = async (title, description, tag) => {
    //to do api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }
  //Delete a Note
  
  const deletenote = async (id) => {
    //api call
     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({})
    });
    const json = await response.json();
    console.log(json);

    //logic for client side
    console.log(id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    console.log(id,notes);
    setNotes(newNotes);
  }


  return (
    <noteContext.Provider value={{ notes, addNote, deletenote, editNote, setNotes,getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;