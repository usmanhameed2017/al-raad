import { useAuth } from '../../../context/auth';
import { Outlet } from 'react-router-dom';
import Restricted from '../Restricted';

function ProtectedRoute({ roles = [] }) 
{
    const { user, isLoggedIn } = useAuth();

    // Check authentication
    if(isLoggedIn === null) return "";
    if(isLoggedIn === false) return <Restricted statusCode={401} message={`UNAUTHORIZED`} />

    // Check role based permissions
    if(!roles.includes(user?.role)) return <Restricted statusCode={403} message={`FORBIDDEN`} />
    
    return <Outlet />;
}

export default ProtectedRoute;