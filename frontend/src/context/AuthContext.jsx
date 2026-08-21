import { createContext, useState } from 'react';

// 1. Create the empty Context (The Radio Frequency)
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// 2. Create the Provider (The Radio Tower)
export const AuthProvider = ({ children }) => {
    // Clean lazy-state initialization: Check localStorage immediately when the component mounts.
    // This avoids the 'setState synchronously within an effect' warning entirely!
    const [user, setUser] = useState(() => {
        const loggedInUser = localStorage.getItem('userInfo');
        return loggedInUser ? JSON.parse(loggedInUser) : null;
    });

    // The Login Action
    const login = (userData) => {
        setUser(userData); // Save to React's live memory
        localStorage.setItem('userInfo', JSON.stringify(userData)); // Save to Chrome's hard drive
    };

    // The Logout Action
    const logout = () => {
        setUser(null); // Erase from React's live memory
        localStorage.removeItem('userInfo'); // Erase from Chrome's hard drive
    };

    // 3. Broadcast the user data and auth functions to the rest of the app
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};