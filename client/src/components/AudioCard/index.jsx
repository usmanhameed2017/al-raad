import { generateOptimizedUrl } from '../../utils/cloudinary';
import styles from './style.module.css';

function AudioCard({ title, description, url }) 
{
    // Generate optimized url to make audio optimized
    const audioUrl = generateOptimizedUrl(url, "audio");
    return (
        <div className={styles.audioCard} style={{ boxShadow:"0 3px 15px #0dcdbc" }}>
            <div>
                <h4 className={`${styles.heading}`}> { title } </h4>
            </div>
            <audio preload='none' controls style={{ width: '100%' }}>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            {
                title && <div className={`${styles.caption}`}> ({ description }) </div>
            }
        </div>
    );
}

export default AudioCard;