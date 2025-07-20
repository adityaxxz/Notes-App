import React from "react";
import "../styles/Note.css"

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US", {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="note-container">
            <h3 className="note-title">{note.title}</h3>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button 
                className="delete-button" 
                onClick={() => onDelete(note.id)} 
                aria-label="Delete note"
            ></button>
        </div>
    );
}

export default Note