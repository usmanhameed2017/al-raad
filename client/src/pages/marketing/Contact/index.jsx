import { motion } from 'framer-motion';
import styles from './style.module.css';
import Button from '../../../components/Button';

function Contact() {
    return (
        <div className={styles.contactWrapper}>
            <img src="/public/contactus.jpg" alt="background" className={styles.bgImage} />

            <div className={styles.overlay}>
                <motion.div
                    className={styles.formContainer}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h1 className={styles.heading}>Get in Touch</h1>
                    <p className={styles.subtext}>
                        Have a question, suggestion, or just want to say hello? Fill out the form below.
                    </p>

                    <form className={styles.contactForm}>
                        <input type="text" placeholder="Your Name" className={styles.inputField} />
                        <input type="email" placeholder="Your Email" className={styles.inputField} />
                        <textarea placeholder="Your Message" className={styles.textarea}></textarea>
                        <Button>Send Message</Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;