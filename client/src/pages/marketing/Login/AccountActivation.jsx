import { useNavigate, useLocation, Navigate } from "react-router-dom";
import FormBS from "../../../components/Form";
import Button from "../../../components/Button";
import styles from './style.module.css';
import * as Yup from 'yup';
import { patchRequest } from '../../../api/request';
import Animation from '../../../components/Animation';
import Input from '../../../components/InputFields';

function AccountActivation() 
{
    // Get redirection state
    const location = useLocation().state;

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

    // If user is not redirected from signup form
    if(!location) return <Navigate to={`/Login`} replace />

    return (
        <div className={styles.loginPage}>
            <div className={styles.form} 
            style={{ maxWidth: "500px", margin: "3rem auto", marginTop: '200px', padding: "2rem", borderRadius: "15px"}}>

                <FormBS initialValues={initialValues} validationSchema={validationSchema}
                handlerFunction={async (values, action) => {
                    try
                    {
                        await patchRequest(`/user/account/activation`, values);
                        action.resetForm();
                        navigate("/login");
                    }
                    catch(error)
                    {
                        return error;
                    }
                }}>
                    <Animation type="normal">
                            <div>
                                <h2 className='text-center'> Account Activation </h2> 
                                <hr />
                            </div>
                            {/* Activation code */}
                            <div className="form-group">
                                <label htmlFor="username">Activation Code</label>
                                <Input type='text' name='activationCode' className='form-control' placeholder="Enter activation code" />
                            </div>
                            <hr />
                            {/* Confirm */}
                            <div className="form-group d-grid mt-3">
                                <Button type="submit" className="w-100 mt-3">Confirm</Button>
                            </div>                       
                    </Animation>
                </FormBS>
            </div>                      
        </div>
    );
}

export default AccountActivation;