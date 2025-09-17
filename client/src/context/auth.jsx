import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { showError } from '../utils/toasterMessage';
import { getRequest, postRequest } from '../api/request';
import { setLoadingFunction, setSavingFunction } from '../utils/loadingManager';
import { getCsrfToken, csrfToken } from '../utils/token';
import { connectSocket } from '../service/socket';

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
            const response = await getRequest("/auth/generateCsrfToken");
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
            const response = await postRequest("/user/signup", user);
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
    },[]);

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
    },[]);    

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
            const response = await getRequest("/auth/verifyAccessToken", undefined, undefined, false);
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
        finally
        {
            connectSocket(); // Connect socket on app load
        }
    },[]);

    useEffect(() => {
        verifyAccessToken();
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