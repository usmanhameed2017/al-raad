import { Formik, Form } from 'formik';
import styles from "./style.module.css";

function FormBS({ children, initialValues, validationSchema, handlerFunction, className })
{
    return (
        <div className={styles.formContainer}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlerFunction} 
            enableReinitialize={true} validateOnBlur={false} validateOnChange={false}>
                <Form className={className}> { children } </Form>
            </Formik>
        </div>
    );
}

export default FormBS;