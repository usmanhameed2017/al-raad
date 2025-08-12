import cld from '../../utils/cloudinary';
import { bitRate } from '@cloudinary/url-gen/actions/transcode';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import styles from './style.module.css';

function AudioCard({ title, description, url }) 
{
    // Extract public ID
    const publicId = `al-raad/audios/${url.split("/al-raad/audios/").pop().split(".")[0]}`;

    // Cloudinary treats audio as video resource
    const audio = cld.video(publicId)
    .transcode(bitRate('128k'))
    .delivery(format('mp3'), quality('auto'));

    const audioUrl = audio.toURL();

    return (
        <div className={styles.audioCard}>
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