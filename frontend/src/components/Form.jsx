import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        setError("");
        e.preventDefault();

        try {
            const payload = {
                username,
                password
            };
            
            const response = await api.post(route, payload);
            
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        }
        catch (error) {
            console.error("Error details:", error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Response data:", error.response.data);
                let errorMessage = "";
                
                if (typeof error.response.data === 'object') {
                    // Handle Django validation errors which come as objects
                    const errorData = error.response.data;
                    for (const field in errorData) {
                        errorMessage += `${field}: ${errorData[field].join(', ')}\n`;
                    }
                } else if (error.response.data.detail) {
                    errorMessage = error.response.data.detail;
                } else {
                    errorMessage = `Error: ${error.response.status}`;
                }
                
                setError(errorMessage);
            } else if (error.request) {
                // The request was made but no response was received
                setError("No response from server. Please check your connection.");
            } else {
                // Something happened in setting up the request that triggered an Error
                setError(`Error: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            {error && <div className="error-message">{error}</div>}
            
            <input className="form-input" 
            type="text" 
            value={username} 
            placeholder="Username" 
            required
            onChange={(e) => setUsername(e.target.value)} />

            <input className="form-input" 
            type="password" 
            value={password} 
            placeholder="Password" 
            required
            onChange={(e) => setPassword(e.target.value)} />

            {loading && <LoadingIndicator />}
            
            <button className="form-button" type="submit" disabled={loading}>{name}</button>
            
            <div className="form-footer">
                {method === "login" ? (
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                ) : (
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                )}
            </div>
        </form>
    );
}

export default Form;

