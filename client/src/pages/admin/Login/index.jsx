import { Form, Field, ErrorMessage } from "formik";
import Button from "../../../components/Button";
import FormBS from "../../../components/Form";
import styles from "./style.module.css";
import Animation from "../../../components/Animation";
import * as Yup from 'yup';
import { useAuth } from "../../../context/auth";
import { Navigate } from 'react-router-dom';
import Restricted from "../../security/Restricted";

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
            <div className={`${styles.form} shadow`}>
                <FormBS initialValues={initialValues} validationSchema={validationSchema} handlerFunction={adminLogin}>
                    <Animation type="normal">
                        <Form>
                            {/* Username */}
                            <div className="form-group mb-2">
                                <label> Username </label>
                                <Field type="text" name="username" placeholder="Enter username" className="form-control" />
                                <ErrorMessage name="username" component="div" className="text-danger" />
                            </div>

                            {/* Password */}
                            <div className="form-group mb-2">
                                <label>Password</label>
                                <Field type="password" name="password" placeholder="Enter password" className="form-control" />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>

                            <hr />
                            
                            {/* Login Button */}
                            <div className="form-group d-grid">
                                <Button type="submit" className="w-100"> Login </Button>
                            </div>
                        </Form>                    
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