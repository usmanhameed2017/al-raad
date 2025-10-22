import Button from "../../../components/Button";
import FormBS from "../../../components/Form";
import styles from "./style.module.css";
import panelStyle from "../PanelStyling/style.module.css";
import * as Yup from 'yup';
import { useAuth } from "../../../context/auth";
import { Navigate } from 'react-router-dom';
import Restricted from "../../security/Restricted";
import Input from "../../../components/InputFields";
import { webLogo } from "../../../constants";

function AdminLogin() 
{
    // Global auth utilities
    const { adminLogin, user } = useAuth();

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

    return (
        <div className={styles.wrapper}>
        {
            !user ? 
            <div className={styles.form}>
                {/* Heading */}
                <div className={`${styles.heading}`}>
                    <img src={webLogo} alt="Web logo" className={styles.brandLogo} />
                </div>

                {/* Form */}
                <FormBS initialValues={initialValues} validationSchema={validationSchema} handlerFunction={adminLogin}>
                    {/* Username */}
                    <div className="form-group mb-2">
                        <label> Username </label>
                        <Input type="text" name="username" placeholder="Enter username" className={`${panelStyle.input} form-control`} />
                    </div>

                    {/* Password */}
                    <div className="form-group mb-1">
                        <label>Password</label>
                        <Input type="password" name="password" placeholder="Enter password" className={`${panelStyle.input} form-control`} />
                    </div>

                    <hr />
                    {/* Login Button */}
                    <div className="form-group d-grid">
                        <Button type="submit" className="w-100"> Login </Button>
                    </div>                   
                </FormBS>
            </div>     
            : 
            user?.role === "Admin" ? 
            <Navigate to="/admin" /> 
            : 
            <Restricted statusCode={403} message={`FORBIDDEN`} />
        }       
        </div>
    );
}

export default AdminLogin;