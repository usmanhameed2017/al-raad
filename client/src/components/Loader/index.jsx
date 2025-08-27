import { FaSync } from 'react-icons/fa';
import styles from './style.module.css';
import { useAuth } from '../../context/auth';

function Loader({ size = "small", text }) 
{
    // Extract global state loader
    const { loading } = useAuth();
    
    if(loading)
    {
        // Big
        if(size.trim().toLowerCase() === "big")
        {
            return (
                <div className={styles.container}>
                    <h3 className='text-center fw-bold textTheme'> 
                        <FaSync className={styles.spin} size={30} /> { text } 
                    </h3>                    
                </div>
            );
        }

        // Medium
        if(size.trim().toLowerCase() === "medium")
        {
            return (
                <div className={styles.container}>
                    <h4 className='text-center fw-bold textTheme'> 
                        <FaSync className={styles.spin} size={30} /> { text } 
                    </h4>                    
                </div>
            );
        }

        // Small
        if(size.trim().toLowerCase() === "small")
        {
            return (
                <div className={styles.container}>
                    <h6 className='text-center fw-bold textTheme'> 
                        <FaSync className={styles.spin} size={30} /> { text } 
                    </h6>                    
                </div>
            );
        } 
    }
}

export default Loader;