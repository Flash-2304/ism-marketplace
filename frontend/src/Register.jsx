import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axiosConfig'; 

const Register = () => {
    // State variables to remember exactly what the user types into each box
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    
    // Bring in the login function from our global AuthContext radio tower
    const { login } = useContext(AuthContext);

    // Function triggered when the user clicks the Register button
    const handleRegister = async (e) => {
        e.preventDefault(); // Stop the browser from refreshing the page natively
        try {
            // Send the typed data to the Node.js backend
            const response = await API.post('/users', {
                name,
                email,
                password,
                whatsappNumber: whatsapp,
            });
            // If successful, log them in instantly with the returned VIP wristband
            login(response.data);
            alert("Welcome to the IIT ISM Marketplace!");
        } catch (error) {
            // Show backend bouncer errors (like using a non-institute email)
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Create Account</h2>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Controlled inputs: onChange updates React's memory on every single keystroke */}
                <input type="text" placeholder="Full Name" required onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="IIT ISM Email (@iitism.ac.in)" required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder="WhatsApp Number" required onChange={(e) => setWhatsapp(e.target.value)} />
                <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', border: 'none' }}>Register</button>
            </form>
        </div>
    );
};

export default Register;