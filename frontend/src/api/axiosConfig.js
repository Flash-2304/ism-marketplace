import axios from 'axios';

// 1. Create a custom post office that knows where our backend lives
const API = axios.create({
    baseURL: 'http://localhost:5001/api', 
});

// 2. The Interceptor: Stop every request before it leaves React
API.interceptors.request.use((req) => {
    // Check Chrome's hard drive for the saved user
    const userInfo = localStorage.getItem('userInfo');
    
    if (userInfo) {
        // Unpack the user data and grab just the token
        const token = JSON.parse(userInfo).token;
        // Staple the token to the Authorization header of the request
        req.headers.Authorization = `Bearer ${token}`;
    }
    
    return req; // Let the request continue to the backend
});

export default API;