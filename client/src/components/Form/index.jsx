import { Formik, Form } from 'formik';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from "./style.module.css";

const FormBS = forwardRef(({ children, initialValues, validationSchema, handlerFunction,
    validateOnBlur = true, validateOnChange = true,  className }, ref) => {
    const formikRef = useRef();

    // Expose Formik submit function to parent
    useImperativeHandle(ref, () => ({
        submitForm: () => {
            if(formikRef.current) formikRef.current.handleSubmit();
        }
    }));

    return (
        <div className={styles.formContainer}>
            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handlerFunction}
                enableReinitialize={true}
                validateOnBlur={validateOnBlur}
                validateOnChange={validateOnChange}>
                {formikProps => (
                    <Form className={className ? className : `${styles.form}`}>
                        {typeof children === "function" ? children(formikProps) : children}
                    </Form>
                )}
            </Formik>
        </div>
    );
});

export default FormBS;