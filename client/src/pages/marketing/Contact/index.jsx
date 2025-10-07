import { motion } from 'framer-motion';
import styles from './style.module.css';
import Button from '../../../components/Button';
import FormBS from '../../../components/Form';
import * as Yup from "yup";
import { useAuth } from '../../../context/auth';
import Loader from '../../../components/Loader';
import Input from '../../../components/InputFields';
import api from '../../../service/axios';
import { useCallback } from 'react';

function Contact() 
{
    // Global loader
    const { savingChanges } = useAuth();

    // Initial values
    const initialValues = {
        subject:"",
        message:""
    };

    // Validation schema
    const validationSchema = Yup.object({
        // Subject
        subject: Yup.string()
        .required("Please select subject"),
        
        // Message
        message: Yup.string()
        .min(10, "Message must be at least 10 characters long")
        .max(9999, "Message must not be longer than 9999 characters")
        .required("Message is required"),         
    });

    // Handler function
    const sendEmail = useCallback(async (payload, action) => {
        try
        {
            await api.post({ url:"/mail", payload });
            action.resetForm();
        }
        catch(error)
        {
            return error;
        }
    },[]);

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

                    <FormBS initialValues={initialValues} validationSchema={validationSchema} handlerFunction={sendEmail} className={styles.contactForm}>
                        {/* Subject Options */}
                        <div className={styles.formGroup}>
                            <label htmlFor="subject" className={styles.formLabel}>Subject</label>
                            <Input type="select" name='subject' className={`${styles.inputField} mb-1`}>
                                <option value="" className='text-black'> Select </option>
                                <option value="Feedback" className='text-black'> Feedback </option>
                                <option value="Suggestion" className='text-black'> Suggestion </option>
                                <option value="Question" className='text-black'> Question </option>
                                <option value="Business Query" className='text-black'> Business Query </option>
                            </Input>
                        </div>                            

                        {/* Message */}
                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.formLabel}>Message</label>
                            <Input type="textarea" name="message" className={`${styles.textarea}`} placeholder="Your Message" />
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="w-100" disabled={savingChanges === true}>Send Message</Button>

                        {/* Loader */}
                        {savingChanges && (
                            <div className="mt-3">
                                <Loader text="Sending mail" />
                            </div>
                        )}
                    </FormBS>
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;