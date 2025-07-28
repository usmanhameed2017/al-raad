import { Tabs, Tab } from "react-bootstrap";
import { Form, Field, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FormBS from "../../../components/Form";
import Button from "../../../components/Button";
import { loginInitialValues, signupInitialValues } from "../../../schema/user";
import { loginValidation, signupValidation } from "../../../validation/user";
import { useAuth } from "../../../context/auth";
import styles from './style.module.css';

function Login() 
{
    const { userLogin, isLoading, userSignup } = useAuth();
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
                }}
            >

                <Tabs defaultActiveKey="Signin" id="auth-tabs" className="mb-3">
                    {/* Signin */}
                    <Tab eventKey="Signin" title="Signin">
                        <FormBS initialValues={loginInitialValues} validationSchema={loginValidation} handlerFunction={userLogin}>
                            <motion.div
                                variants={formVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <Form>
                                    {/* Username */}
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Field type='text' name='username' className='form-control' placeholder="Enter username" />
                                        <span className="text-danger"><ErrorMessage name="username" /></span>
                                    </div>
                                    {/* Password */}
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field type='password' name='password' className='form-control' placeholder="Enter password" />
                                        <span className="text-danger"><ErrorMessage name="password" /></span>
                                    </div>
                                    {/* Forgot password */}
                                    <div className="form-group">
                                        <Link className="text-info" style={{ cursor: "pointer" }} to='/security/forgotPassword'>
                                            Forgot password?
                                        </Link>
                                    </div>
                                    {/* Sign in */}
                                    <Button type="submit" className="custom-btn w-100 mt-3" disabled={ isLoading === false }>SIGN IN</Button>
                                    <hr />
                                </Form>
                            </motion.div>
                        </FormBS>
                    </Tab>

                    {/* Signup */}
                    <Tab eventKey="Signup" title="Signup">
                        <FormBS initialValues={signupInitialValues} validationSchema={signupValidation} handlerFunction={userSignup}>
                            <motion.div variants={formVariants} initial="hidden" animate="visible">
                                <Form>
                                    {/* Name */}
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <Field type='text' name='name' className='form-control' placeholder="Enter name" />
                                        <span className="text-danger"><ErrorMessage name="name" /></span>
                                    </div>
                                    {/* Email */}
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field type='text' name='email' className='form-control' placeholder="Enter email" />
                                        <span className="text-danger"><ErrorMessage name="email" /></span>
                                    </div>
                                    {/* Username */}
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Field type='text' name='username' className='form-control' placeholder="Enter username" />
                                        <span className="text-danger"><ErrorMessage name="username" /></span>
                                    </div>
                                    {/* Password */}
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field type='password' name='password' className='form-control' placeholder="Enter password" />
                                        <span className="text-danger"><ErrorMessage name="password" /></span>
                                    </div>
                                    {/* Confirm password */}
                                    <div className="form-group">
                                        <label htmlFor="cpassword">Confirm Password</label>
                                        <Field type='password' name='cpassword' className='form-control' placeholder="Re-enter password" />
                                        <span className="text-danger"><ErrorMessage name="cpassword" /></span>
                                    </div>
                                    {/* Sign up */}
                                    <Button type="submit" className="custom-btn w-100 mt-3">SIGN UP</Button>
                                </Form>
                            </motion.div>
                        </FormBS>
                    </Tab>
                </Tabs>
            </motion.div>            
        </div>
    );
}

export default Login;