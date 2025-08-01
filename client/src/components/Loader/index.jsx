import { FaSync } from 'react-icons/fa';
import styles from './style.module.css';

function Loader({ text }) 
{
    return (
        <h3 className='text-center fw-bold textTheme'> 
            <FaSync className={styles.spin} size={30} /> { text } 
        </h3>
    );
}

export default Loader;