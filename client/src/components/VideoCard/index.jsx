import styles from './style.module.css';

function VideoCard({ url, title }) 
{
    // Function to extract thumbnail
    const thumbnail =  (videoUrl) => {
        return videoUrl
        .replace('/upload/', '/upload/so_2/')
        .replace(/\.(mp4|webm|mov)$/i, '.jpg');
    }

    return (
        <div className={styles.videoCard}>
            <video className={styles.video} controls preload="none" loading="lazy" poster={thumbnail(url)}>
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            { title && <div className={styles.caption}> {title} </div> }
        </div>

        // <audio controls preload="none">
        //     <source src={url} type="audio/mp3" />
        //     Your browser does not support the audio tag.
        // </audio>
    );
}

export default VideoCard;