import { useEffect, useState } from 'react';
import Animation from '../../../components/Animation';
import Button from '../../../components/Button';
import FormBS from '../../../components/Form';
import * as Yup from 'yup';
import { getUser } from '../../../constants';
import styles from './style.module.css';
import { useAuth } from '../../../context/auth';
import Loader from '../../../components/Loader';
import Input from '../../../components/InputFields';
import api from '../../../service/axios';

function Settings() 
{
    const { user, setUser, savingChanges } = useAuth();
    const userData = user || getUser() || {};
    const [showPassword, setShowPassword] = useState(false);

    // Fetch user data on page load
    useEffect(() => {
        api.get(`/user/me`)
        .then(response => setUser(response.data))
        .catch(() => setUser({}));
    },[]);    

    // Form initial values
    const initialValues = {
        name: userData.name || "",
        username: userData.username || "",
        password: "",
        cpassword: ""
    };

    // Validation schema
    const validationSchema = Yup.object({
        // Name
        name: Yup.string()
        .min(3, "Name must be at least 3 characters long")
        .max(30, "Name must not be longer than 30 characters")
        .required("Name is required"),

        // Username
        username: Yup.string()
        .matches(/^[a-z0-9_@]+$/, "Username can only contain lowercase letters, underscore (_) and @")
        .min(6, "Username must be at least 6 characters long")
        .max(20, "Username must not be longer than 20 characters")
        .required("Username is required"),

        password: Yup.string()
        .nullable()
        .test("is-strong-password","Enter strong password", (value) => {
                if (!value) return true; // empty allowed
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value);
            }
        ),

        cpassword: Yup.string()
        .nullable()
        .when("password", {
            is: (val) => val && val.length > 0,
            then: (schema) =>
                schema
                .required("Confirm password is required")
                .oneOf([Yup.ref("password")], "Password & confirm password must be identical"),
            otherwise: (schema) => schema.notRequired(),
        }),
    });    

    return (
        <div className={styles.settingsWrapper}>
            <div className={styles.settingsCard}>
                <Animation type="normal">
                    <FormBS initialValues={initialValues} validationSchema={validationSchema}
                    handlerFunction={async (user, action) => {

                        // Initialize payload
                        let payload = {
                            name: user.name,
                            username: user.username,
                        };

                        // If user update bio with password
                        if(user?.password) payload.password = user.password;
                        try
                        {
                            const response = await api.put(`/user/me/edit`, payload);
                            localStorage.setItem("user", JSON.stringify(response.data));
                            setUser(response.data);

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
                            return error;
                        }
                    }}
                    >
                        {/* Name */}
                        <div className="form-group mb-3">
                            <label htmlFor="name" className={styles.label}> Name </label>
                            <Input type="text" name="name" className={`form-control ${styles.input}`} placeholder="Enter Name" />
                        </div>

                        {/* Username */}
                        <div className="form-group mb-3">
                            <label htmlFor="username" className={styles.label}> Username </label>
                            <Input type="text" name="username" className={`form-control ${styles.input}`} placeholder="Enter Username" />
                        </div>

                        {/* Password */}
                        <div className="form-group mb-3">
                            <label htmlFor="password" className={styles.label}> Password </label>
                            <Input type="password" name="password" className={`form-control ${styles.input}`} placeholder="Enter Password" />
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group mb-3">
                            <label htmlFor="cpassword" className={styles.label}> Confirm Password </label>
                            <Input type="password" name="cpassword" className={`form-control ${styles.input}`} placeholder="Re-Enter Password" />
                        </div>

                        <hr />
                        <i className='text-secondary mb-5 ms-1'>  Note: Leave the password fields blank to keep your current password. </i>

                        {/* Save Changes */}
                        <div className='d-grid mt-2'>
                            <Button type="submit" disabled={savingChanges===true}> Save Changes </Button>
                        </div>

                        {/* Loader */}
                        {savingChanges && (
                            <div className='mt-4 float-start'>
                                <Loader text={`Saving changes...`} size='small' />
                            </div>
                        )}
                    </FormBS>
                </Animation>
            </div>
        </div>
    );
}

export default Settings;