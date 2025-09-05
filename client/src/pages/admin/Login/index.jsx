import Button from "../../../components/Button";
import FormBS from "../../../components/Form";
import styles from "./style.module.css";
import Animation from "../../../components/Animation";
import * as Yup from 'yup';
import { useAuth } from "../../../context/auth";
import { Navigate } from 'react-router-dom';
import Restricted from "../../security/Restricted";
import Input from "../../../components/InputFields";

function AdminLogin() 
{
    // Form initial values
    const initialValues = {
        username:"",
        password:""
    };

    // Validation schema
    const validationSchema = Yup.object({
        username:Yup.string()
        .lowercase()
        .required('Username is required'),

        password:Yup.string()
        .required('Password is required'),
    });

    const { adminLogin, user } = useAuth();

    return (
        <>
        {
            !user ? 
            <div className={styles.form}>
                {/* Heading */}
                <div className={styles.heading}>
                    <h1> Admin Login </h1>
                </div>
                {/* Sub heading */}
                <div className={styles.subHeading}>
                    <p> Get login to access the quiries! </p>
                    <hr />
                </div>
                <FormBS initialValues={initialValues} validationSchema={validationSchema} handlerFunction={adminLogin}>
                    <Animation type="normal">
                        {/* Username */}
                        <div className="form-group mb-2">
                            <label> Username </label>
                            <Input type="text" name="username" placeholder="Enter username" className="form-control" />
                        </div>

                        {/* Password */}
                        <div className="form-group mb-2">
                            <label>Password</label>
                            <Input type="password" name="password" placeholder="Enter password" className="form-control" />
                        </div>

                        <hr />
                        {/* Login Button */}
                        <div className="form-group d-grid">
                            <Button type="submit" className="w-100"> Login </Button>
                        </div>                   
                    </Animation>
                </FormBS>
            </div>     
            : 
            user?.role === "Admin" ? 
            <Navigate to="/admin" /> 
            : 
            <Restricted statusCode={403} message={`FORBIDDEN`} />
        }       
        </>
    );
}

export default AdminLogin;