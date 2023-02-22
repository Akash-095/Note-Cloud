import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItems from './NoteItems';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const [note, setNote] = useState({id:'',etitle:'',edescription:'',etag:''})
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
            getNotes();
        }
        else{
     navigate("/login");
        }
       
    },[])
    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
      
    }
    const handlenewnote = (e) =>{
        editNote(note.id, note.etitle, note.edescription, note.etag);
       refClose.current.click();
       props.showAlert("Updated successfully","success");
        
    }
    const onChange = (e) =>{
       setNote({...note,[e.target.name]:e.target.value})
    }


    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button type="button" ref={ref} className="btn d-none btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Tile</label>
                                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.edescription} id="edescription" name='edescription' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name='etag' onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.title<5 || note.description<5} onClick={handlenewnote} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="mx-1">
                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note, addnote) => {
                    return <NoteItems key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes
