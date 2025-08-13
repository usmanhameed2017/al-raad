import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../utils/toasterMessage';

// Create auth context
const AuthContext = createContext();

function AuthProvider({ children })
{
    const [isLoading, setLoading] = useState(false); // Loader
    const [user, setUser] = useState(null); // User payload
    const [isLoggedIn, setLoggedIn] = useState(null); // Login flag
    const [csrfToken, setCsrfToken] = useState(""); 

    // For navigation
    const navigate = useNavigate();

    // Generate CSRF Token
    const generateCsrfToken = useCallback(async () => {
        try
        {
            const response = await api.get("/user/generateCsrfToken");
            localStorage.setItem("csrfToken", response.data);
            setCsrfToken(response.data);
        } 
        catch(error) 
        {
            showError(error.message);
        }
    },[]);

    // Signup
    const userSignup = useCallback(async (user, action) => {
        if (!csrfToken) return showError("CSRF token is missing");
        try 
        {
            setLoading(true);
            const response = await api.post("/user/signup", user);
            action.resetForm();
            setLoading(false);
            showSuccess(response.message);
            navigate("/accountActivation");
        } 
        catch(error) 
        {
            setLoading(false);
            showError(error.message);
        }
    },[csrfToken]);   

    // Login
    const userLogin = useCallback(async (user, action) => {
        if(!csrfToken) return showError("CSRF token is missing");
        try 
        {
            setLoading(true);
            const response = await api.post("/user/login", user);
            setUser(response.data);
            setLoggedIn(response.success);
            setLoading(false);
            localStorage.setItem("user", JSON.stringify(response.data));
            action.resetForm();
            showSuccess(response.message);
            navigate('/');
        } 
        catch(error) 
        {
            setLoading(false);
            showError(error.message);
        }
    },[csrfToken]);

    // Logout
    const userLogout = useCallback(async () => {
        try 
        {
            await api.get("/user/logout");
            setUser(null);
            setLoggedIn(false);
            localStorage.removeItem("user");
            navigate("/");
        } 
        catch(error) 
        {
            showError(error.message);
        }
    },[]);

    // Verify Access Token
    const verifyAccessToken = useCallback(async () => {
        try 
        {
            const response = await api.get("/user/verifyAccessToken");
            setUser(response.data); // Plain user object
            setLoggedIn(response.success);
            localStorage.setItem("user", JSON.stringify(response.data));
        } 
        catch (error) 
        {
            setUser(null);
            setLoggedIn(false);
            localStorage.removeItem("user");
        }
    },[]);

    useEffect(() => {
        verifyAccessToken();
        generateCsrfToken();
        console.log("CSRF Token", csrfToken);
    },[]);

    return(
        <AuthContext.Provider value={{ csrfToken, userSignup, userLogin, userLogout, isLoading, setLoading, isLoggedIn, setLoggedIn, user, setUser }}>
            { children }
        </AuthContext.Provider>
    );
}

// Custom hook
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;