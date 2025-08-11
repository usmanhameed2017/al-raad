import styles from './style.module.css';
import { AdvancedVideo } from '@cloudinary/react';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { quality, format } from '@cloudinary/url-gen/actions/delivery';
import { bitRate } from '@cloudinary/url-gen/actions/transcode';
import { trim } from '@cloudinary/url-gen/actions/videoEdit';
import cld from '../../utils/cloudinary';

function VideoCard({ url, title }) 
{
    // Extract public ID from URL
    const publicId = `al-raad/videos/${url.split("/al-raad/videos/").pop().split(".")[0]}`;

    // Main video transformations
    const video = cld.video(publicId)
        .resize(scale().width(400))
        .transcode(bitRate('500k'))
        .delivery(quality('auto:good'), format('auto'));

    // Thumbnail image (first frame)
    const thumbnailUrl = cld.video(publicId)
        .videoEdit(trim().startOffset('0'))     // Take first frame
        .resize(scale().width(600))             // Resize width to 600px
        .delivery(format('auto'))               // Auto format for browser
        .delivery(quality('auto'))              // Auto quality
        .toURL();

    return (
        <div className={styles.videoCard}>
            <AdvancedVideo cldVid={video}
                controls
                preload="none"
                poster={thumbnailUrl}
                style={{ width: '100%', borderRadius: '12px' }}
            />
            {
                title && <div className={styles.caption}> { title } </div>
            }
        </div>
    );
}

export default VideoCard;