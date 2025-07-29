import { motion } from 'framer-motion';
import styles from './style.module.css';
import Button from '../../../components/Button';
import FormBS from '../../../components/Form';
import { ErrorMessage, Field, Form } from 'formik';

function Contact() 
{
    return (
        <div className={styles.contactWrapper}>
            <img src="/public/contactus.jpg" alt="background" className={styles.bgImage} />

            <div className={styles.overlay}>
                <motion.div
                    className={styles.formContainer}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}>

                    <h1 className={styles.heading}>Get in Touch</h1>
                    <p className={styles.subtext}>
                        Have a question, suggestion, or just want to say hello? Fill out the form below.
                    </p>

                    <FormBS>
                        <Form className={styles.contactForm}>
                            {/* Name */}
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.formLabel}>Name</label>
                                <Field type='text' name='name' className={`${styles.inputField}`} placeholder="Enter name" />
                                <span className={styles.textDanger}><ErrorMessage name="name" /></span>
                            </div>

                            {/* Email */}
                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.formLabel}>Email</label>
                                <Field type='email' name='email' className={styles.inputField} placeholder="Enter email" />
                                <span className={styles.textDanger}><ErrorMessage name="email" /></span>
                            </div>

                            {/* Message */}
                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.formLabel}>Message</label>
                                <Field as="textarea" name="message" className={styles.textarea} placeholder="Your Message" />
                                <span className={styles.textDanger}><ErrorMessage name="message" /></span>
                            </div>

                            {/* Submit */}
                            <Button type="submit" className="w-100">Send Message</Button>
                        </Form>
                    </FormBS>
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;