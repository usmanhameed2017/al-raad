import { FaSync } from 'react-icons/fa';
import styles from './style.module.css';
import { useAuth } from '../../context/auth';

function SavingChanges({ size = "small", text }) 
{
    // Extract global state loader
    const { savingChanges } = useAuth();
    
    if(savingChanges)
    {
        // Big
        if(size.trim().toLowerCase() === "big")
        {
            return (
                <div>
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
                <div>
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
                <div>
                    <h6 className='text-center fw-bold textTheme'> 
                        <FaSync className={styles.spin} size={30} /> { text } 
                    </h6>
                </div>
            );
        } 
    }
}

export default SavingChanges;