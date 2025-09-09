import { useNavigate, useLocation, Navigate } from "react-router-dom";
import styles from './style.module.css';
import * as Yup from 'yup';
import FormBS from "../../components/Form";
import Input from "../../components/InputFields";
import Button from "../../components/Button";
import { useCallback } from "react";
import { getRequest } from "../../api/request";
import { useAuth } from "../../context/auth";
import Loader from "../../components/Loader";

function VerifyResetCode() 
{
    // Get redirection state
    const location = useLocation().state;
    const { redirectToVerifyResetCode = false } = location || {};

    const { loading } = useAuth();

    // Navigator
    const navigate = useNavigate();

    // Initial values
    const initialValues = {
        resetCode: ""
    };

    // Validation schema
    const validationSchema = Yup.object({
        resetCode:Yup.string()
        .min(6, "Reset code must be at least 6 characters long")
        .max(12, "Reset code must not be longer than 12 characters")
        .required("Reset code is required")
    });

    // Handler function
    const formHandler = useCallback(async (values, action) => {
        try 
        {
            const response = await getRequest(`/user/security/verifyResetCode/${values.resetCode}`, true, true);
            action.resetForm();
            navigate("/security/resetPassword", { state:{ redirectToVerifyResetPassword:true } })
        } 
        catch (error) 
        {
            return error;
        }
    },[]);

    // If user is not redirected from forgot password page
    if(!redirectToVerifyResetCode) return <Navigate to={`/security/forgotPassword`} replace />

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                {/* Heading */}
                <div className={styles.heading}> <h1> Code Verification </h1> </div>

                {/* Sub heading */}
                <div className={styles.subHeading}> <p> Verification Step-02 </p> </div>

                {/* Form */}
                <FormBS initialValues={initialValues} validationSchema={validationSchema} handlerFunction={formHandler}>
                    {/* Reset code */}
                    <div className="form-group">
                        <label htmlFor="resetCode"> Reset Code </label>
                        <Input type="text" name="resetCode" className="input" placeholder="Enter Your Code" />
                    </div>
                    <hr />

                    {/* Submit */}
                    <div className="form-group">
                        <Button type="submit" disabled={loading===true}> Submit </Button>
                    </div>

                    {/* Loader */}
                    {loading && (
                        <div className="mt-3 float-start"> <Loader text="Verifying" size="small" /> </div>
                    )}                   
                </FormBS>
            </div>                      
        </div>
    );
}

export default VerifyResetCode;