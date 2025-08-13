import { Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FormBS from "../../../components/Form";
import Button from "../../../components/Button";
import styles from './style.module.css';
import { FaLock } from 'react-icons/fa';
import * as Yup from 'yup';
import { showError, showSuccess } from '../../../utils/toasterMessage';
import client from '../../../utils/axios';

function AccountActivation() 
{
    const navigate = useNavigate();
    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        }
    };

    return (
        <div className={styles.loginPage}>
            <motion.div
                className={styles.glassCard}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                    maxWidth: "500px",
                    margin: "3rem auto",
                    marginTop: '200px',
                    padding: "2rem",
                    borderRadius: "15px",
                }}>

                <FormBS initialValues={{ activationCode:"" }} validationSchema={Yup.object({
                    activationCode:Yup.string()
                    .min(6, "Activation code must be at least 6 characters long")
                    .max(12, "Activation code must not be longer than 12 characters")
                    .required("Activation code is required")
                })}

                // Handler function
                handlerFunction={async (values, action) => {
                    try
                    {
                        const response = await client.patch(`/user/accountActivation`, values);
                        showSuccess(response.message);
                        action.resetForm();
                        navigate("/login");
                    }
                    catch(error)
                    {
                        showError(error.message);
                    }
                }}
                >
                    <motion.div variants={formVariants} initial="hidden" animate="visible">
                        <Form>
                            <div>
                                <h2> <FaLock size={25} /> Account Activation </h2> 
                                <hr />
                            </div>
                            {/* Activation code */}
                            <div className="form-group">
                                <label htmlFor="username">Activation Code</label>
                                <Field type='text' name='activationCode' className='form-control' placeholder="Enter activation code" />
                                <span className="text-danger"><ErrorMessage name="activationCode" /></span>
                            </div>
                            <hr />
                            {/* Confirm */}
                            <div className="form-group d-grid mt-3">
                                <Button type="submit" className="custom-btn w-100 mt-3">Confirm</Button>
                            </div>
                        </Form>
                    </motion.div>
                </FormBS>
            </motion.div>            
        </div>
    );
}

export default AccountActivation;