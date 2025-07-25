import styles from './style.module.css';
import Button from '../Button';

function Hero() 
{
    return (
        <div className={styles.heroContainer}>

            {/* Background video */}
            <video 
            className={styles.videoBackground}
            src="/public/hero-section-video.mp4"
            autoPlay
            muted
            loop
            playsInline> </video>

            {/* Content */}
            <div className={styles.content}>
                <h1> WELCOME TO AL-RA’AD </h1>
                <p> Discover Tafseer, Books, and Daily Ayat </p>
                <Button onClick={ () => alert("Ok") }> Get Started </Button>
            </div>
        </div>
    );
}

export default Hero;