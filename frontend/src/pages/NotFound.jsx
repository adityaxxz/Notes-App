import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="not-found-container" style={{
            textAlign: 'center',
            padding: '60px 20px',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <h1 style={{ 
                fontSize: '3rem', 
                color: 'var(--primary-color)',
                marginBottom: '20px'
            }}>404</h1>
            <h2 style={{ marginBottom: '20px' }}>Page Not Found</h2>
            <p style={{ 
                fontSize: '1.1rem', 
                color: 'var(--text-light)',
                marginBottom: '30px'
            }}>
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn" style={{
                display: 'inline-block',
                padding: '12px 25px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                borderRadius: 'var(--border-radius)',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'var(--transition)'
            }}>
                Go to Home
            </Link>
        </div>
    );
}

export default NotFound;