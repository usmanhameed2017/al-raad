import styles from './style.module.css';
import Button from '../Button';

function Hero({ type, src, heading, paragrapgh, enableButton, buttonText }) 
{
    return (
        <div className={styles.heroContainer}>
            {/* Background video */}
            {type === "video" && (
                <video className={styles.videoBackground} src={src} autoPlay muted loop playsInline></video>
            )}

            {/* Background image */}
            {type === "image" && (
                <img className={styles.imageBackground} src={src} alt="Hero Background" />
            )}

            {/* Foreground Content */}
            <div className={styles.content}>
                <h1> { heading } </h1>
                <p> { paragrapgh }</p>
                
                {
                    enableButton && (
                    <Button> { buttonText } </Button>
                )}
            </div>
        </div>
    );
}

export default Hero;