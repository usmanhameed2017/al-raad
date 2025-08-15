import { useAuth } from '../../../context/auth';
import { Outlet } from 'react-router-dom';
import styles from './style.module.css';

function ProtectedRoute({ roles = [] }) 
{
    const { user, isLoggedIn } = useAuth();

    // Check authentication
    if(isLoggedIn === null) return "";
    if(isLoggedIn === false) 
    {
        return (
            <div className={styles.wrapper}>
                <h2> 401 - UNAUTHORIZED </h2>
            </div>
        );
    }

    // Check role based permissions
    if(!roles.includes(user?.role))
    {
        return (
            <div className={styles.wrapper}>
                <h2> 403 - FORBIDDEN </h2>
            </div>            
        );
    }
    
    return <Outlet />;
}

export default ProtectedRoute;