import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    // 1. Tune into the Radio Tower to get the user state and the logout action
    const { user, logout } = useContext(AuthContext);
    
    // 2. A tool to programmatically move the user to a different page
    const navigate = useNavigate(); 

    // 3. The function that fires when they click Logout
    const handleLogout = () => {
        logout(); // This instantly deletes the JWT from React and Chrome's memory
        navigate('/login'); // Instantly kicks them back to the login screen
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#1a1a1a', color: 'white' }}>
            <div>
                {/* Link acts like an <a> tag, but without the screen-flashing reload */}
                <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '22px', fontWeight: 'bold' }}>
                    IIT ISM Marketplace
                </Link>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {/* THE SMART LOGIC: Is the user logged in? */}
                {user ? (
                    // YES: Render this block (The Fragment <></> lets us return multiple elements)
                    <>
                        <span style={{ color: '#00ffcc' }}>Hey, {user.name}</span>
                        <Link to="/profile" style={{ marginRight: '15px', color: '#00ffcc', textDecoration: 'none' }}>Dashboard</Link>
                        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    // NO: Render this block instead
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;