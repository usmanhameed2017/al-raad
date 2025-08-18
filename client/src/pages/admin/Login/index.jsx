import { Form, Field, ErrorMessage } from "formik";
import Button from "../../../components/Button";
import FormBS from "../../../components/Form";
import styles from "./style.module.css";
import Animation from "../../../components/Animation";

function AdminLogin() 
{
    return (
        <div className={`${styles.form} shadow`}>
            <FormBS>
                <Animation type="normal">
                    <Form>
                        {/* Username */}
                        <div className="form-group mb-3">
                            <label> Username </label>
                            <Field type="email" name="email" placeholder="Enter username" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger small" />
                        </div>

                        {/* Password */}
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <Field type="password" name="password" placeholder="Enter password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="text-danger small" />
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
    );
}

export default AdminLogin;