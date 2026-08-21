import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axiosConfig';

const Login = () => {
    // Memory for the login credentials
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Grab the global login action
    const { login } = useContext(AuthContext);

    // Function triggered on form submit
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent full page reload
        try {
            // Post credentials to the authentication route
            const response = await API.post('/users/login', { email, password });
            
            // Save the received token and user data globally
            login(response.data);
            alert("Logged in successfully!");
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Update state as the user types */}
                <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" style={{ padding: '10px', background: 'green', color: 'white', border: 'none' }}>Login</button>
            </form>
        </div>
    );
};

export default Login;