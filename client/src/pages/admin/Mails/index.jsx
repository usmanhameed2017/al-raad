import { useCallback, useEffect, useState } from 'react';
import { deleteRequest, getRequest, postRequest } from '../../../api/request';
import ReactDataTable from '../../../components/DataTable';
import Button from '../../../components/Button';
import { useAuth } from '../../../context/auth';
import Animation from '../../../components/Animation';
import { FaTrash, FaReply, FaEye } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import ModalBS from '../../../components/Modal';
import FormBS from '../../../components/Form';
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "formik";
import styles from "../PanelStyling/style.module.css";
import { sweetAlert } from '../../../utils/sweetAlert2';
import Loader from '../../../components/Loader';
import { useNavigate } from 'react-router-dom';

function Mails() 
{
    // States
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10); // Records per page
    const [data, setData] = useState({ docs: [], totalDocs: 0, pagingCounter: 1 });
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [reloadData, setReloadData] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Global state loaders
    const { loading, savingChanges } = useAuth();

    // Navigator
    const navigate = useNavigate();

    // Page name
    const pageName = "Mail";
    
    // Debounce technique
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]); 
    
    // Fetch data on page load and on search
    useEffect(() => {
        getRequest(`/${pageName.toLowerCase()}?page=${currentPage}&limit=${limit}&search=${debouncedSearch}`)
        .then(response => setData(response.data))
        .catch(error => console.log(error.message));
    }, [currentPage, limit, debouncedSearch, reloadData]);

    // Reply to mail
    const replyToMail = useCallback((name, email) => {
        setName(name);
        setEmail(email);
        setShowModal(true);
    },[]);

    // Delete
    const drop = useCallback(async (_id) => {
        sweetAlert("Are you sure?", "This action will permanently delete the record.", "confirm", "Yes, delete it!", null, async () => {
            try 
            {
                await deleteRequest(`/${pageName.toLowerCase()}/${_id}`);
                setReloadData(reloadData + 1);
            } 
            catch (error) 
            {
                return error;
            } 
        })
    },[reloadData]);

    // Columns
    const columns = [
        { name: "SR.NO", cell: (row, index) => (data?.pagingCounter || 0) + index, sortable: true, width:"120px" },
        { name: "Full Name", selector: row => row?.name, sortable: true },
        { name: "Email", selector: row => row?.email, width:"370px" },
        { name: "Subject", selector: row => row?.subject },
        { name: "Message", selector: row => `${row?.message?.substring(0, 40)}...`, width:"450px" },
        { 
            name: "Operations",
            width:"450px",
            cell: row =>  ( 
                <div style={{ display:"flex", gap:"8px" }}>
                    <Button onClick={ () => replyToMail(row?.name, row?.email) }> <FaReply /> Reply </Button>
                    <Button onClick={ () => navigate(`/admin/mails/${row?._id}`, { state:{ data:row } }) }> <FaEye /> View </Button>
                    <Button onClick={() => drop(row?._id)}> <FaTrash /> Delete </Button>
                </div>
            )
        },
    ];  

    // Initial values
    const initialValues = {
        name: name,
        email: email,
        subject: "",
        message: ""
    };     

    // Validation schema
    const validationSchema = Yup.object({
        // Subject
        subject: Yup.string()
        .min(5, "Subject must be at least 5 characters long")
        .max(50, "Subject must not be longer than 50 characters")
        .required("Subject is required"),

        // Message
        message: Yup.string()
        .min(10, "Message must be at least 10 characters long")
        .max(9999, "Message must not be longer than 9999 characters")
        .required("Message is required"),
    });  

    return (
        <>
            {/* Loader */}
            { loading && ( <div style={{ marginTop:"300px" }}> <Loader size='big' text="Loading" /> </div> ) }
            {!loading && (
                <>
                    {/* Data Table */}
                    <Row>
                        <Col>
                            <Animation type="3d">
                                <ReactDataTable 
                                title={`${pageName}s`} 
                                columns={columns} 
                                data={data} 
                                setCurrentPage={setCurrentPage}
                                search={search}
                                setSearch={setSearch}
                                limit={limit}
                                setLimit={setLimit} />
                            </Animation>
                        </Col>
                    </Row>                      
                </>
            )}            

            {/* Modal */}
            <ModalBS showModal={showModal} setShowModal={setShowModal} modalTitle={`REPLY TO MAIL`} modalSize='lg'>
                {/* Form */}
                <FormBS initialValues={initialValues} validationSchema={validationSchema}
                handlerFunction={ async (values, action) => {
                    try
                    {
                        await postRequest(`/${pageName.toLowerCase()}/replyToUser`, values);
                        action.resetForm();
                        setShowModal(false);
                        setReloadData(reloadData + 1);
                    }
                    catch(error)
                    {
                        return error;
                    }
                }}>
                    <Form>
                        {/* Subject */}
                        <div className="form-group mb-3">
                            <label htmlFor="subject" className={styles.label}> Subject </label>
                            <Field type="text" name="subject" className={`${styles.input} form-control`} placeholder="Enter Subject" />
                            <span className={`${styles.errorMessage}`}> <ErrorMessage name='subject' /> </span>
                        </div>

                        {/* Message */}
                        <div className="form-group mb-3">
                            <label htmlFor="message" className={styles.label}> Message </label>
                            <Field as="textarea" name="message" className={`${styles.input} form-control`} placeholder="Write Your Message" rows="8" />
                            <span className={`${styles.errorMessage}`}> <ErrorMessage name='message' /> </span>
                        </div>                         

                        {/* Buttons */}
                        <div className="form-group mt-3 d-flex align-items-center gap-2">
                            <Button type="submit" disabled={savingChanges === true}> Send Mail </Button>
                            <Button type="button" onClick={ () => setShowModal(false) }> Cancel </Button>
                        </div>

                        {/* Loader */}
                        {savingChanges && (
                            <div className="form-group mt-3 d-flex align-items-center">
                                <Loader size='small' text={`Sending mail...`} />
                            </div>
                        )}
                    </Form>                        
                </FormBS>
            </ModalBS>
        </>
    );
}

export default Mails;