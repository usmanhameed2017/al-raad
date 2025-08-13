import { Tabs, Tab } from "react-bootstrap";
import { Form, Field, ErrorMessage } from "formik";
import { Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FormBS from "../../../components/Form";
import Button from "../../../components/Button";
import { loginInitialValues, signupInitialValues } from "../../../schema/user";
import { loginValidation, signupValidation } from "../../../validation/user";
import { useAuth } from "../../../context/auth";
import styles from "./style.module.css";
import { useState } from "react";
import { getUser } from "../../../constants";

function Login() 
{
    const { userLogin, isLoading, userSignup } = useAuth();
    const [activeTab, setActiveTab] = useState("Signin");

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
        opacity: 1,
        y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
        exit: {
        opacity: 0,
        y: -20,
            transition: {
                duration: 0.2,
                ease: "easeIn",
            },
        },
    };

    const user = getUser();
    return (
        !user ? (
            <div className={styles.loginPage}>
                <motion.div
                    className={styles.glassCard}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                    maxWidth: "500px",
                    margin: "3rem auto",
                    padding: "2rem"
                    }}>
                    <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} id="auth-tabs" className="mb-3">
                    <Tab eventKey="Signin" title="Signin" />
                    <Tab eventKey="Signup" title="Signup" />
                    </Tabs>

                    <AnimatePresence mode="wait">
                        {/* Signin */}
                        {activeTab === "Signin" && (
                        <motion.div key="signin" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                            <FormBS initialValues={loginInitialValues} validationSchema={loginValidation} handlerFunction={userLogin}>
                                <Form>
                                    {/* Username */}
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Field type="text" name="username" className="form-control" placeholder="Enter username" />
                                        <span className="text-danger"> <ErrorMessage name="username" /> </span>
                                    </div>
                                    {/* Password */}
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field type="password" name="password" className="form-control" placeholder="Enter password"/>
                                        <span className="text-danger"> <ErrorMessage name="password" /> </span>
                                    </div>
                                    {/* Forgot Password */}
                                    <div className="form-group mb-2">
                                        <Link className="text-info" to="/security/forgotPassword"> Forgot password? </Link>
                                    </div>
                                    <hr />
                                    {/* Signin Button */}
                                    <div className="form-group d-grid">
                                        <Button type="submit" className="w-100" disabled={isLoading === false}>Signin</Button>
                                    </div>
                                </Form>
                            </FormBS>
                        </motion.div>
                    )}

                    {/* Signup */}
                    {activeTab === "Signup" && (
                        <motion.div
                        key="signup"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit">

                            <FormBS initialValues={signupInitialValues} validationSchema={signupValidation} handlerFunction={userSignup}>
                                <Form>
                                    {/* Name */}
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <Field type="text" name="name" className="form-control" placeholder="Enter name"/>
                                        <span className="text-danger"> <ErrorMessage name="name" /> </span>
                                    </div>
                                    {/* Email */}
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field type="text" name="email" className="form-control" placeholder="Enter email" />
                                        <span className="text-danger"> <ErrorMessage name="email" /> </span>
                                    </div>
                                    {/* Username */}
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Field type="text" name="username" className="form-control" placeholder="Enter username" />
                                        <span className="text-danger"> <ErrorMessage name="username" /> </span>
                                    </div>
                                    {/* Password */}
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Field type="password" name="password" className="form-control" placeholder="Enter password" />
                                        <span className="text-danger"> <ErrorMessage name="password" /> </span>
                                    </div>
                                    {/* Confirm Password */}
                                    <div className="form-group mb-2">
                                        <label htmlFor="cpassword">Confirm Password</label>
                                        <Field type="password" name="cpassword" className="form-control" placeholder="Re-enter password"/>
                                        <span className="text-danger"> <ErrorMessage name="cpassword" /> </span>
                                    </div>
                                    <hr />
                                    {/* Signup */}
                                    <div className="form-group d-grid">
                                        <Button type="submit" className="w-100 mt-2"> Signup </Button>
                                    </div>
                                </Form>
                            </FormBS>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </motion.div>
            </div>
        )
        : <Navigate to={`/`} /> // Redirect to landing page if already logged in
    );
}

export default Login;