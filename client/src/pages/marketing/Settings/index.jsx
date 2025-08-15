import { useEffect, useState } from 'react';
import Animation from '../../../components/Animation';
import Button from '../../../components/Button';
import FormBS from '../../../components/Form';
import { getUser } from '../../../constants';
import { userSettingsValidation } from '../../../validation/user';
import styles from './style.module.css';
import { Form, Field, ErrorMessage } from 'formik';
import { getRequest } from '../../../api/request';
import client from '../../../utils/axios';
import { showError, showSuccess } from '../../../utils/toasterMessage';

function UserSettings() 
{
    // Extract user properties
    const user = getUser();

    // User object
    const [data, setData] = useState({
        name: user?.name || "",
        username: user?.username || ""
    });

    // Form initial values
    const initialValue = {
        name: data.name,
        username: data.username,
        password:"",
        cpassword:""
    };

    // Fetch user data on page load
    useEffect(() => {
        getRequest(`/user/me`)
        .then(response => setData(response.data))
        .catch(error => showError(error.message));
    },[]);

    return (
        <div className={styles.settingsWrapper}>
            <div className={styles.settingsCard}>
                <Animation type="normal">
                    <FormBS initialValues={initialValue} validationSchema={userSettingsValidation}
                    handlerFunction={async (user, action) => {

                        // Initialize payload
                        let payload = {
                            name: user.name,
                            username: user.username,
                        };

                        if(user?.password) payload.password = user.password;
                        
                        try
                        {
                            const response = await client.put(`/user/me/edit`, payload);
                            showSuccess(response.message);
                            localStorage.setItem("user", JSON.stringify(response.data));
                            setData(response.data);

                            // Reset form values with updated ones
                            action.resetForm({
                                values: {
                                    name: response.data.name,
                                    username: response.data.username,
                                    password: "",
                                    cpassword: ""
                                }
                            });
                        }
                        catch(error)
                        {
                            showError(error.message);
                        }
                        
                    }}
                    >
                        <Form>
                            {/* Name */}
                            <div className="form-group mb-3">
                                <label htmlFor="name" className={styles.label}> Name </label>
                                <Field type="text" name="name" className={`form-control ${styles.input}`} placeholder="Enter Name" />
                                <span className={styles.errorMsg}> <ErrorMessage name="name" /> </span>
                            </div>

                            {/* Username */}
                            <div className="form-group mb-3">
                                <label htmlFor="username" className={styles.label}> Username </label>
                                <Field type="text" name="username" className={`form-control ${styles.input}`} placeholder="Enter Username" />
                                <span className={styles.errorMsg}> <ErrorMessage name="username" /> </span>
                            </div>

                            {/* Password */}
                            <div className="form-group mb-3">
                                <label htmlFor="password" className={styles.label}> Password </label>
                                <Field type="password" name="password" className={`form-control ${styles.input}`} placeholder="Enter Password" />
                                <span className={styles.errorMsg}> <ErrorMessage name="password" /> </span>
                            </div>              

                            {/* Confirm Password */}
                            <div className="form-group mb-3">
                                <label htmlFor="cpassword" className={styles.label}> Confirm Password </label>
                                <Field type="password" name="cpassword" className={`form-control ${styles.input}`} placeholder="Re-Enter Password" />
                                <span className={styles.errorMsg}> <ErrorMessage name="cpassword" /> </span>
                            </div>

                            <hr />
                            <i className='text-secondary mb-5 ms-1'>  Note: Leave the password fields blank to keep your current password. </i>

                            {/* Save Changes */}
                            <div className='d-grid mt-2'>
                                <Button type="submit"> Save Changes </Button>
                            </div>
                        </Form>
                    </FormBS>
                </Animation>
            </div>
        </div>
    );
}

export default UserSettings;