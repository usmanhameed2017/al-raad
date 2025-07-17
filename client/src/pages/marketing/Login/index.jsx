import { Tabs, Tab } from "react-bootstrap";
import { Form, Field, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";
import FormBS from "../../../components/Form";
import Button from "../../../components/Button";

function Login() 
{
    return (
        <div style={{
            maxWidth: "500px",
            margin: "3rem auto",
            marginTop:'200px',
            backgroundColor: "#2a2b33",
            padding: "2rem",
            borderRadius: "15px",
            boxShadow: "0 4px 15px rgba(0, 194, 203, 0.5)",
        }} >

            <Tabs defaultActiveKey="Signin" id="uncontrolled-tab-example" className="mb-3">
                {/* Signin */}
                <Tab eventKey="Signin" title="Signin">
                    <FormBS>
                        <Form>
                            {/* Username */}
                            <div className="form-group">
                                <label htmlFor="username"> Username </label>
                                <Field type='text' name='username' className='form-control' placeholder="Enter username" />
                                <span className="text-danger"> <ErrorMessage name="username" /> </span>
                            </div>

                            {/* Password */}
                            <div className="form-group">
                                <label htmlFor="password"> Password </label>
                                <Field type='password' name='password' className='form-control' placeholder="Enter password" />
                                <span className="text-danger"> <ErrorMessage name="password" /> </span>
                            </div>   

                            {/* Forgot Password */}
                            <div className="form-group">
                                <Link className="text-info" style={{ cursor:"pointer" }} to='/security/forgotPassword'> Forgot password? </Link>
                            </div>

                            <Button type="submit" className="custom-btn w-100 mt-3"> SIGN IN </Button>       
                            <hr />                                        
                        </Form>
                        
                    </FormBS>    
                </Tab>

                {/* Signup */}
                <Tab eventKey="Signup" title="Signup">
                    <FormBS>
                    {
                        ({ setFieldValue }) => (
                            <Form>
                                {/* First Name */}
                                <div className="form-group">
                                    <label htmlFor="fname"> First Name </label>
                                    <Field type='text' name='fname' className='form-control' placeholder="Enter first name" />
                                    <span className="text-danger"> <ErrorMessage name="fname" /> </span>
                                </div>

                                {/* Last Name */}
                                <div className="form-group">
                                    <label htmlFor="lname"> Last Name </label>
                                    <Field type='text' name='lname' className='form-control' placeholder="Enter last name" />
                                    <span className="text-danger"> <ErrorMessage name="lname" /> </span>
                                </div>    

                                {/* Age */}
                                <div className="form-group">
                                    <label htmlFor="age"> Age </label>
                                    <Field type='number' name='age' className='form-control' placeholder="Enter age" />
                                    <span className="text-danger"> <ErrorMessage name="age" /> </span>
                                </div>   

                                {/* Gender */}
                                <div className="form-group">
                                    <label htmlFor="gender"> Gender </label>
                                    <Field as="select" name='gender' className='form-control'>
                                        <option value=""> Select </option>
                                        <option value="Male"> Male </option>
                                        <option value="Female"> Female </option>
                                    </Field>
                                    <span className="text-danger"> <ErrorMessage name="gender" /> </span>
                                </div>

                                {/* Email */}
                                <div className="form-group">
                                    <label htmlFor="email"> Email </label>
                                    <Field type='text' name='email' className='form-control' placeholder="Enter email" />
                                    <span className="text-danger"> <ErrorMessage name="email" /> </span>
                                </div>                                                                                          

                                {/* Username */}
                                <div className="form-group">
                                    <label htmlFor="username"> Username </label>
                                    <Field type='text' name='username' className='form-control' placeholder="Enter username" />
                                    <span className="text-danger"> <ErrorMessage name="username" /> </span>
                                </div>

                                {/* Password */}
                                <div className="form-group">
                                    <label htmlFor="password"> Password </label>
                                    <Field type='password' name='password' className='form-control' placeholder="Enter password" />
                                    <span className="text-danger"> <ErrorMessage name="password" /> </span>
                                </div>   

                                {/* Confirm Password */}
                                <div className="form-group">
                                    <label htmlFor="cpassword"> Confirm Password </label>
                                    <Field type='password' name='cpassword' className='form-control' placeholder="Re-enter password" />
                                    <span className="text-danger"> <ErrorMessage name="cpassword" /> </span>
                                </div>         

                                {/* Profile Image */}
                                <div className="form-group">
                                    <label htmlFor="profile_image"> Profile Image </label>
                                    <input type='file' name='profile_image' className='form-control' accept="image/*"
                                    onChange={ (e) => setFieldValue("profile_image", e.target.files[0]) } />
                                    <span className="text-danger"> <ErrorMessage name="profile_image" /> </span>
                                </div>                                        

                                <Button type="submit" className="custom-btn w-100 mt-3"> SIGN UP </Button>                         
                            </Form>                        
                        )
                    }
                    </FormBS> 
                </Tab>
            </Tabs>
        </div>
    );
}

export default Login;