import { useState } from 'react';
import styles from "./style.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Field } from 'formik';

function PasswordField({ name, className, placeholder }) 
{
    const [showPassword, setShowPassword] = useState(false);
    return (
        // Wrapper
        <div className={styles.fieldWrapper}>
            {/* Field */}
            <Field type={showPassword ? "text" : "password"} name={name} className={`${className} pe-5`} placeholder={placeholder} />

            {/* Icon */}
            <span className={styles.icon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash size={22} title='Hide' /> : <FaEye size={22} title='Show' />}
            </span>
        </div>
    );
}

export default PasswordField;