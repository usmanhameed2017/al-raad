import axios from 'axios';
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { axiosOptions, backendURL } from '../constants';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { useNavigate } from 'react-router-dom'
import { showError, showSuccess } from '../utils/toasterMessage';

const AuthContext = createContext();

function AuthProvider({ children })
{
    const [isLoading, setLoading] = useState(false); // Loader
    const [user, setUser] = useState(null); // User payload
    const [isLoggedIn, setLoggedIn] = useState(null); // Login flag
    const [csrfToken, setCsrfToken] = useState(""); // Csrf token protection from unintended form submission

    // For navigation
    const navigate = useNavigate();

    // Generate CSRF Token
    const generateCsrfToken = useCallback(async () => {
        try 
        {
            const response = await axios.get(`${backendURL}/user/generateCsrfToken`, axiosOptions);
            setCsrfToken(ApiResponse(response).data.csrfToken);
        } 
        catch (error) 
        {
            showError(ApiError(error).message);
        }
    },[]);

    // Signup
    const userSignup = useCallback(async (user, action) => {
        if (!csrfToken) return showError("CSRF token is missing");

        try 
        {
            setLoading(true);
            const response = await axios.post(`${backendURL}/user/signup`, user, { ...axiosOptions, headers:{ 'CSRF-Token': csrfToken }});
            action.resetForm();
            setLoading(false);
            showSuccess(ApiResponse(response).message);
            navigate("/accountActivation");
        } 
        catch(error) 
        {
            setLoading(false);
            showError(ApiError(error).message);
        }
    },[csrfToken]);   

    // Login
    const userLogin = useCallback(async (user, action) => {
        if (!csrfToken) return showError("CSRF token is missing");
        
        try 
        {
            setLoading(true);
            const response = await axios.post(`${backendURL}/user/login`, user, { ...axiosOptions, headers:{ 'CSRF-Token': csrfToken }});
            const { data, message, success } = ApiResponse(response);
            setUser(data);
            setLoggedIn(success);
            setLoading(false);
            localStorage.setItem("user", JSON.stringify(data));

            action.resetForm();
            showSuccess(message);
            navigate('/');
        } 
        catch (error) 
        {
            setLoading(false);
            showError(ApiError(error).message);
        }
    },[csrfToken]);

    // Logout
    const userLogout = useCallback(async () => {
        try 
        {
            await axios.get(`${backendURL}/user/logout`, axiosOptions);
            setUser(null);
            setLoggedIn(false);
            localStorage.removeItem("user");
            navigate("/");
        } 
        catch(error) 
        {
            showError(ApiError(error).message);
        }
    },[]);

    // Verify Access Token
    const verifyAccessToken = useCallback(async () => {
        try 
        {
            const response = await axios.get(`${backendURL}/user/verifyAccessToken`, axiosOptions);
            const { data, success } = ApiResponse(response);
            setUser(data); // Plain user object
            setLoggedIn(success);
            localStorage.setItem("user", JSON.stringify(data));
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
        <AuthContext.Provider value={{ csrfToken, userSignup, userLogin, userLogout, isLoading, setLoading, isLoggedIn, setLoggedIn, user, setUser }}>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;