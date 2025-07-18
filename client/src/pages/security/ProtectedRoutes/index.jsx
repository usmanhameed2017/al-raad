import { useAuth } from '../../../context/auth';
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() 
{
    const { isLoggedIn } = useAuth();
    if(isLoggedIn === null) return "";
    if(isLoggedIn === false) return <Navigate to='/' />
    
    return <Outlet />;
}

export default ProtectedRoute;