import { Formik } from 'formik';
import styles from "./style.module.css";

function FormBS({ children, initialValues, validationSchema, handlerFunction })
{
    return (
        <div className={styles.formContainer}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlerFunction}>
                { children }
            </Formik>
        </div>
    );
}

export default FormBS;