import React from 'react';
import styles from './style.module.css';
import Button from '../../../components/Button';

function Contact()
{
    return (
        <div className={styles.contactWrapper}>
            <img src="/public/contactus.jpg" alt="background" className={styles.bgImage} />

            <div className={styles.overlay}>
                <div className={styles.formContainer}>
                <h1 className={styles.heading}>Get in Touch</h1>
                <p className={styles.subtext}>
                    Have a question, suggestion, or just want to say hello? Fill out the form below.
                </p>

                <form className={styles.contactForm}>
                    <input type="text" placeholder="Your Name" className={styles.inputField} />
                    <input type="email" placeholder="Your Email" className={styles.inputField} />
                    <textarea placeholder="Your Message" className={styles.textarea}></textarea>
                    <Button> Send Message </Button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;