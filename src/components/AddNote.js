import React, { useState,useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:'',description:'',tag:''})

    const handlenewnote = (e) =>{
        e.preventDefault();
         addNote(note.title,note.description,note.tag); 
         console.log(note); 
         setNote({title:'',description:'',tag:''});
         props.showAlert("Added note successfully","success");
    }
    const onChange = (e) =>{
       setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className='container my-3'>
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Tile</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
          </div>
         
          <button type="submit" disabled={note.title<5 || note.description<5} className="btn btn-primary" onClick={handlenewnote}>Add Note</button>
        </form>
      </div>
  )
}

export default AddNote