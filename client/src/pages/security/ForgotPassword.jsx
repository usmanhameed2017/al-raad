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

function ForgotPassword() 
{
    // Get redirection state
    const location = useLocation().state;
    const { redirectToForgotPassword = false } = location || {};

    const { loading } = useAuth();

    // Navigator
    const navigate = useNavigate();

    // Initial values
    const initialValues = {
        email: ""
    };

    // Validation schema
    const validationSchema = Yup.object({
        email: Yup.string()
        .strict(true)
        .lowercase("Email must contain lowercase letters")
        .email("Invalid email")
        .required("Email is required")
    });

    // Handler function
    const formHandler = useCallback(async (values, action) => {
        try 
        {
            const response = await getRequest(`/user/security/forgotPassword/${values.email}`, true, true);
            const { _id } = response.data;
            action.resetForm();
            navigate("/security/verifyResetCode", { state:{ _id, redirectToVerifyResetCode:true } });
        } 
        catch (error) 
        {
            return error;
        }
    },[]);

    // If user is not redirected from login page
    if(!redirectToForgotPassword) return <Navigate to={`/Login`} replace />

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                {/* Heading */}
                <div className={styles.heading}> <h1> Email Verification </h1> </div>

                {/* Sub heading */}
                <div className={styles.subHeading}> <p> Verification Step-01 </p> </div>

                {/* Form */}
                <FormBS initialValues={initialValues} validationSchema={validationSchema} handlerFunction={formHandler}>
                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email"> Email </label>
                        <Input type="text" name="email" className="input" placeholder="Enter Your Email" />
                    </div>
                    <hr />

                    {/* Submit */}
                    <div className="form-group">
                        <Button type="submit" disabled={loading===true}> Submit </Button>
                    </div>

                    {/* Loader */}
                    {loading && (
                        <div className="mt-3 float-start"> <Loader text="Sending mail..." size="small" /> </div>
                    )}                   
                </FormBS>
            </div>                      
        </div>
    );
}

export default ForgotPassword;