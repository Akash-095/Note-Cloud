import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItems = (props) => {
    const { note,updateNote } = props;
    const context = useContext(noteContext);
    const { deletenote} = context;

    const ontrash = () =>{
deletenote(note._id);
props.showAlert("Deleted note successfully","success");
    }
    return (
        <div className='col-md-3'>
          
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular mx-1 fa-trash-can" onClick={ontrash}></i>
                    <i className="fa-regular mx-3 fa-pen-to-square" onClick={()=>{updateNote(note) }}></i>
                 
                </div>
            </div>
        </div>
    )
}

export default NoteItems