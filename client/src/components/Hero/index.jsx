import { motion } from "framer-motion";
import styles from "./style.module.css";
import Button from "../Button";
import { FaBookOpen, FaBookReader, FaPlayCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Hero({ type, src, heading, paragrapgh, enableButton, buttonText }) 
{
    return (
            <section className={styles.hero}>
                {/* Background */}
                {type === "video" ? (
                    <video
                    className={styles.bgVideo}
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    ></video>
                ) : (
                    <img className={styles.bgImage} src={src} alt="Hero Background" />
                )}

                {/* Overlay */}
                <div className={styles.overlay}></div>

                {/* Hero Inner */}
                <div className={styles.inner}>
                    {/* Left Side */}
                    <motion.div
                    className={styles.textBlock}
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}>
                    <div className={styles.glowWrap}>
                        <div className={styles.glowLight}></div>
                        <h1 className={styles.title}>{heading}</h1>
                    </div>

                    {/* Paragrapgh */}
                    <p className={styles.subtitle}>{paragrapgh}</p>

                    {enableButton && (
                        <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        >
                            <Button className={styles.cta}>{buttonText}</Button>
                        </motion.div>
                    )}
                    </motion.div>

                    {/* Right Side Horizontal Cards */}
                    <motion.div
                    className={styles.cardContainer}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    >

                    <Link to={`/tafseer`}>
                        <div className={`${styles.floatingCard} ${styles.cardAyah}`}>
                            <h3> <FaBookOpen size={30} /> Daily Ayah</h3>
                            <p>
                            Indeed, this Qur'an guides to that which is most suitable and
                            gives good tidings to believers.
                            </p>
                        </div>
                    </Link>

                    <Link to={`/books`}>
                        <div className={`${styles.floatingCard} ${styles.cardBooks}`}>
                            <h3> <FaBookReader size={30} /> Islamic Books</h3>
                            <p>
                            Explore authentic books of Hadith, Fiqh, Tafseer and Islamic
                            studies — all at one place.
                            </p>
                        </div>                       
                    </Link>

                    <Link to={`/audios`}>
                        <div className={`${styles.floatingCard} ${styles.cardAudio}`}>
                            <h3> <FaPlayCircle size={30} /> Audio Lectures</h3>
                            <p>
                            Listen to lectures, sermons, and Quran recitations to enrich your
                            spiritual journey.
                            </p>
                        </div>                        
                    </Link>
                    </motion.div>
                </div>
            </section>            
    );
}

export default Hero;