import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import client from '../utils/axios';
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
            const response = await client.get("/user/generateCsrfToken");
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
            const response = await client.post("/user/signup", user);
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

    // User Login
    const userLogin = useCallback(async (user, action) => {
        if(!csrfToken) return showError("CSRF token is missing");
        try 
        {
            setLoading(true);
            const response = await client.post("/user/login", user);
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

    // Admin Login
    const adminLogin = useCallback(async (user, action) => {
        if(!csrfToken) return showError("CSRF token is missing");
        try 
        {
            setLoading(true);
            const response = await client.post("/user/admin/login", user);
            setUser(response.data);
            setLoggedIn(response.success);
            setLoading(false);
            localStorage.setItem("user", JSON.stringify(response.data));
            action.resetForm();
            showSuccess(response.message);
            navigate('/admin');
        } 
        catch(error) 
        {
            setLoading(false);
            showError(error.message);
        }
    },[csrfToken]);    

    // User Logout
    const userLogout = useCallback(async () => {
        try 
        {
            await client.get("/user/logout");
            setUser(null);
            setLoggedIn(false);
            localStorage.removeItem("user");
            navigate("/", { replace:true });
        } 
        catch(error) 
        {
            showError(error.message);
        }
    },[]);

    // Admin Logout
    const adminLogout = useCallback(async () => {
        try 
        {
            await client.get("/user/logout");
            setUser(null);
            setLoggedIn(false);
            localStorage.removeItem("user");
            navigate("/auth");
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
            const response = await client.get("/user/verifyAccessToken");
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
    },[]);

    return(
        <AuthContext.Provider value={{ csrfToken, userSignup, userLogin, adminLogin, userLogout, adminLogout, isLoading, setLoading, isLoggedIn, setLoggedIn, user, setUser }}>
            { children }
        </AuthContext.Provider>
    );
}

// Custom hook
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;