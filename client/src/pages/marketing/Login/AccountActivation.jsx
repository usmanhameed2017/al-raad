import { Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from "react-router-dom";
import FormBS from "../../../components/Form";
import Button from "../../../components/Button";
import styles from './style.module.css';
import { FaLock } from 'react-icons/fa';
import * as Yup from 'yup';
import { patchRequest } from '../../../api/request';
import Animation from '../../../components/Animation';

function AccountActivation() 
{
    // Navigator
    const navigate = useNavigate();

    // Initial values
    const initialValues = {
        activationCode: ""
    };

    // Validation schema
    const validationSchema = Yup.object({
        activationCode:Yup.string()
        .min(6, "Activation code must be at least 6 characters long")
        .max(12, "Activation code must not be longer than 12 characters")
        .required("Activation code is required")
    });

    return (
        <div className={styles.loginPage}>
            <div className={styles.glassCard} 
            style={{ maxWidth: "500px", margin: "3rem auto", marginTop: '200px', padding: "2rem", borderRadius: "15px"}}>

                <FormBS initialValues={initialValues} validationSchema={validationSchema}
                handlerFunction={async (values, action) => {
                    try
                    {
                        await patchRequest(`/user/accountActivation`, values);
                        action.resetForm();
                        navigate("/login");
                    }
                    catch(error)
                    {
                        return error;
                    }
                }}>
                    <Animation type="normal">
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
                                <Button type="submit" className="w-100 mt-3">Confirm</Button>
                            </div>
                        </Form>                        
                    </Animation>
                </FormBS>
            </div>                      
        </div>
    );
}

export default AccountActivation;