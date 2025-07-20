import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import LoadingIndicator from "../components/LoadingIndicator";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        setLoading(true);
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => {
                console.error("Error fetching notes:", err);
                setError("Failed to load notes. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteNote = (id) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            api
                .delete(`/api/notes/delete/${id}/`)
                .then((res) => {
                    if (res.status === 204) {
                        setNotes(notes.filter(note => note.id !== id));
                    } else {
                        setError("Failed to delete note.");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting note:", error);
                    setError("Failed to delete note. Please try again.");
                });
        }
    };

    const createNote = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    // Add the new note to the list
                    setNotes([res.data, ...notes]);
                    // Clear the form
                    setTitle("");
                    setContent("");
                } else {
                    setError("Failed to create note.");
                }
            })
            .catch((err) => {
                console.error("Error creating note:", err);
                setError("Failed to create note. Please try again.");
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="home-container">
            <section className="notes-section">
                <h2 className="section-title">My Notes</h2>
                
                {loading ? (
                    <div className="loading-container">
                        <LoadingIndicator />
                    </div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : notes.length === 0 ? (
                    <div className="empty-notes">
                        <h3>No notes yet</h3>
                        <p>Create your first note to get started!</p>
                    </div>
                ) : (
                    <div className="notes-container">
                        {notes.map((note) => (
                            <Note note={note} onDelete={deleteNote} key={note.id} />
                        ))}
                    </div>
                )}
            </section>
            
            <section className="create-note-section">
                <h2 className="section-title">Create Note</h2>
                
                <form onSubmit={createNote} className="create-note-form">
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-control"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="Enter title..."
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            className="form-control"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter note content..."
                        ></textarea>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="submit-button" 
                        disabled={submitting}
                    >
                        {submitting ? "Creating..." : "Create Note"}
                    </button>
                </form>
            </section>
        </div>
    );
}

export default Home;