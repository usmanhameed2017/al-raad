import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { showError } from '../utils/toasterMessage';
import { setLoadingFunction, setSavingFunction } from '../utils/loadingManager';
import { getCsrfToken, csrfToken } from '../utils/token';
import { connectSocket } from '../service/socket';
import api from '../service/axios';

// Create auth context
const AuthContext = createContext();

function AuthProvider({ children })
{
    // Global states
    const [user, setUser] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [savingChanges, setSavingChanges] = useState(false);

    // For navigation
    const navigate = useNavigate();

    // Generate CSRF Token
    const generateCsrfToken = useCallback(async () => {
        try
        {
            const response = await api.get({ url:"/auth/generateCsrfToken" });
            getCsrfToken(response.data);
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
            const response = await api.post({ url:"/user/signup", payload:user });
            const { _id } = response.data;
            action.resetForm();
            navigate("/account/activation", { state:{ redirectionFromSignup:true, _id } });
        } 
        catch(error) 
        {
            return error;
        }
        finally 
        {
            setLoading(false);
        }
    },[]);

    // User Login
    const userLogin = useCallback(async (user, action) => {
        if(!csrfToken) return showError("CSRF token is missing");
        setLoading(true);

        try
        {
            const response = await api.post({ url:"/user/login", payload:user });
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
    },[]);

    // Admin Login
    const adminLogin = useCallback(async (user, action) => {
        if(!csrfToken) return showError("CSRF token is missing");
        setLoading(true);

        try
        {
            const response = await api.post({ url:"/user/admin/login", payload:user });
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
    },[]);    

    // User Logout
    const userLogout = useCallback(async () => {
        try 
        {
            await api.get({ url:"/user/logout" });
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
            await api.get({ url:"/user/logout" });
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

    // Verify authentication
    const isAuthenticated = useCallback(async () => {
        try 
        {
            const response = await api.get({ url:"/auth/isAuthenticated", enableErrorMessage:false });
            setUser(response.data); // Plain user object
            setLoggedIn(response.success);
            localStorage.setItem("user", JSON.stringify(response.data));             
        } 
        catch(error) 
        {
            setUser(null);
            setLoggedIn(false);
            localStorage.removeItem("user");
            if(error.message === "Too many requests, please try again later") return showError(error.message); // Rate limit
            return error;
        }
        finally
        {
            connectSocket(); // Connect socket on app load
        }
    },[]);

    useEffect(() => {
        isAuthenticated();
        generateCsrfToken();
        setLoadingFunction(setLoading);
        setSavingFunction(setSavingChanges);
    },[]);

    return(
        <AuthContext.Provider value={{ csrfToken, userSignup, userLogin, adminLogin, userLogout, adminLogout, 
        loading, setLoading, savingChanges, setSavingChanges, isLoggedIn, setLoggedIn, user, setUser }}>
            { children }
        </AuthContext.Provider>
    );
}

// Custom hook
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;