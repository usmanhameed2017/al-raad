import { motion } from 'framer-motion';
import styles from './style.module.css';
import Button from '../../../components/Button';
import FormBS from '../../../components/Form';
import { ErrorMessage, Field, Form } from 'formik';
import * as Yup from "yup";

function Contact() 
{
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

                    <FormBS initialValues={initialValues} validationSchema={validationSchema}
                    handlerFunction={(values, action) => {
                        console.log(values);
                        action.resetForm();
                    }}>
                        <Form className={styles.contactForm}>
                            {/* Subject Options */}
                            <div className={styles.formGroup}>
                                <label htmlFor="subject" className={styles.formLabel}>Subject</label>
                                <Field as='select' name='subject' className={`${styles.inputField} mb-1`}> 
                                    <option value="" className='text-black'> Select </option>
                                    <option value="Feedback" className='text-black'> Feedback </option>
                                    <option value="Suggestion" className='text-black'> Suggestion </option>
                                    <option value="Question" className='text-black'> Question </option>
                                    <option value="Business Query" className='text-black'> Business Query </option>
                                </Field>
                                <span className={styles.textDanger}><ErrorMessage name="subject" /></span>
                            </div>                            

                            {/* Message */}
                            <div className={styles.formGroup}>
                                <label htmlFor="message" className={styles.formLabel}>Message</label>
                                <Field as="textarea" name="message" className={`${styles.textarea}`} placeholder="Your Message" />
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