import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('access');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <div className="layout">
      <header className="navbar">
        <div className="container navbar-container">
          <div className="logo">
            <Link to="/">
              <h1>NotesApp</h1>
            </Link>
          </div>
          <nav className="nav-links">
            {isLoggedIn ? (
              <>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                  My Notes
                </Link>
                <button onClick={handleLogout} className="btn btn-logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                  Login
                </Link>
                <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="container main-content">
        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} NotesApp - Your Digital Notebook</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 