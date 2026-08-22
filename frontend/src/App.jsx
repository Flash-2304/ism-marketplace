import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // IMPORT OUR NEW NAVBAR
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      {/* 
        Notice that Navbar is OUTSIDE of the <Routes> block. 
        This means it will permanently sit at the top of the screen,
        acting as a roof while the pages change underneath it. 
      */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<h2 style={{textAlign: 'center', marginTop: '50px'}}>IIT ISM Marketplace Home (Coming Soon)</h2>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;