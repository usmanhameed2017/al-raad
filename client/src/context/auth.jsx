import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { showError } from '../utils/toasterMessage';
import { getRequest, postRequest } from '../api/request';

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
            const response = await getRequest("/user/generateCsrfToken");
            localStorage.setItem("csrfToken", response.data);
            setCsrfToken(response.data);
        } 
        catch(error) 
        {
            return console.log(error.message);
        }
    },[]);

    // Signup
    const userSignup = useCallback(async (user, action) => {
        if(!csrfToken) return showError("CSRF token is missing");
        setLoading(true);

        try 
        {
            await postRequest("/user/signup", user);
            action.resetForm();
            navigate("/accountActivation");
        } 
        catch(error) 
        {
            return error;
        }
        finally 
        {
            setLoading(false);
        }
    },[csrfToken]);

    // User Login
    const userLogin = useCallback(async (user, action) => {
        if(!csrfToken) return showError("CSRF token is missing");
        setLoading(true);

        try
        {
            const response = await postRequest("/user/login", user);
            setUser(response.data);
            setLoggedIn(response.success);
            localStorage.setItem("user", JSON.stringify(response.data));
            action.resetForm();
            navigate('/');
        }
        catch(error)
        {
            return error;
        }
        finally
        {
            setLoading(false)
        }
    },[csrfToken]);

    // Admin Login
    const adminLogin = useCallback(async (user, action) => {
        if(!csrfToken) return showError("CSRF token is missing");
        setLoading(true);

        try
        {
            const response = await postRequest("/user/admin/login", user);
            setUser(response.data);
            setLoggedIn(response.success);
            localStorage.setItem("user", JSON.stringify(response.data));
            action.resetForm();
            navigate('/admin');
        }
        catch(error)
        {
            return error;
        }
        finally
        {
            setLoading(false)
        }
    },[csrfToken]);    

    // User Logout
    const userLogout = useCallback(async () => {
        try 
        {
            await getRequest("/user/logout");
            setUser(null);
            setLoggedIn(false);
            localStorage.removeItem("user");
            navigate("/", { replace:true });
        } 
        catch (error) 
        {
           return error;
        }
    },[]);

    // Admin Logout
    const adminLogout = useCallback(async () => {
        try 
        {
            await getRequest("/user/logout");
            setUser(null);
            setLoggedIn(false);
            localStorage.removeItem("user");
            navigate("/auth", { replace:true });
        } 
        catch (error) 
        {
           return error;
        }
    },[]);    

    // Verify Access Token
    const verifyAccessToken = useCallback(async () => {
        try 
        {
            const response = await getRequest("/user/verifyAccessToken");
            setUser(response.data); // Plain user object
            setLoggedIn(response.success);
            localStorage.setItem("user", JSON.stringify(response.data));             
        } 
        catch(error) 
        {
            setUser(null);
            setLoggedIn(false);
            localStorage.removeItem("user"); 
            return error;
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