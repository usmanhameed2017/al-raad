import { useAuth } from '../../../context/auth';
import { Outlet } from 'react-router-dom';
import styles from './style.module.css';

function ProtectedRoute() 
{
    const { isLoggedIn } = useAuth();
    if(isLoggedIn === null) return "";

    if(isLoggedIn === false) return (
        <div className={styles.wrapper}>
            <h2> 401 - UNAUTHORIZED </h2>
        </div>
    );
    
    return <Outlet />;
}

export default ProtectedRoute;