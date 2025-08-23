import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../../api/request';
import ReactDataTable from '../../../components/DataTable';
import Button from '../../../components/Button';
import { useAuth } from '../../../context/auth';
import Animation from '../../../components/Animation';
import { FaDownload, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import ModalBS from '../../../components/Modal';
import FormBS from '../../../components/Form';
import { Form, Field, ErrorMessage } from "formik";
import styles from "./style.module.css";
import { addBookInitialValues, addBookValidation } from './schema';
import Loader from '../../../components/Loader';
import { showError, showSuccess } from '../../../utils/toasterMessage';


function Books() 
{
    // States
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10); // Records per page
    const [data, setData] = useState({ docs: [], totalDocs: 0, pagingCounter: 1 });
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [reloadData, setReloadData] = useState(0);

    // Global state loader
    const { isLoading, setLoading } = useAuth();
    
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
        setLoading(true);
        getRequest(`/book?page=${currentPage}&limit=${limit}&search=${debouncedSearch}`)
        .then((response) => setData(response.data))
        .catch(error => console.log("Error:", error.message))
        .finally(() => setLoading(false));
    }, [currentPage, limit, debouncedSearch, reloadData]);

    // Columns
    const columns = [
        { name: "SR.NO", cell: (row, index) => (data?.pagingCounter || 0) + index, sortable: true, width:"120px" },
        { name: "Title", selector: row => row.title, sortable: true },
        { name: "Description", selector: row => row.description?.substring(0,50) || "-" },
        { name: "Uploaded By", selector: row => row.uploadedBy?.name || "-" },
        { 
            name: "PDFs",
            width:"180px",
            cell: row => row.pdf ? ( 
                <a href={row.pdf} download> 
                    <Button> <FaDownload /> Download </Button>
                </a> 
            )
            : 
            "No PDF",
            ignoreRowClick: true,
            button: true,
        },
        { 
            name: "Operations",
            width:"320px",
            cell: row =>  ( 
                <div style={{ display:"flex", gap:"8px" }}>
                    <Button onClick={() => alert(`ID is: ${row?._id}`)}> <FaEdit /> Edit </Button>
                    <Button onClick={() => alert(`ID is: ${row?._id}`)}> <FaTrash /> Delete </Button>
                </div>
            )
        },
    ];  

    return (
        <>
            <Row className='mb-2'>
                <Col>
                    <div className='float-end'> <Button onClick={ () => setShowModal(true) }> <FaPlus /> Add New </Button> </div>
                </Col>
            </Row>

            {/* Create Book */}
            <ModalBS showModal={showModal} setShowModal={setShowModal} modalTitle="Add New Book"> 
                <FormBS initialValues={addBookInitialValues} validationSchema={addBookValidation}
                handlerFunction={ async (values, action) => {
                    setLoading(true);
                    postRequest("book", values, true)
                    .then((response) => {
                        showSuccess(response.message);
                        action.resetForm();
                        setShowModal(false);
                        setReloadData(reloadData + 1);
                    })
                    .catch(error => showError(error.message))
                    .finally(() => setLoading(false));
                }}
                >
                {({ setFieldValue }) => (
                    <Form>
                        {/* Title */}
                        <div className="form-group mb-3">
                            <label htmlFor="title" className={styles.label}> Title </label>
                            <Field type="text" name="title" className={`${styles.input} form-control`} placeholder="Enter Title" />
                            <span className={`${styles.errorMessage}`}> <ErrorMessage name='title' /> </span>
                        </div>

                        {/* Description */}
                        <div className="form-group mb-2">
                            <label htmlFor="description" className={styles.label}> Description </label>
                            <Field as="textarea" rows="3" name="description" className={`${styles.input} form-control`} placeholder="Enter Description" />
                            <span className={`${styles.errorMessage}`}> <ErrorMessage name='description' /> </span>
                        </div> 

                        {/* PDF */}
                        <div className="form-group mb-2">
                            <label htmlFor="pdf" className={styles.label}> Upload PDF </label>
                            <input type="file" name="pdf" className={`${styles.input} form-control`} accept='application/pdf'
                            onChange={ (e) => setFieldValue("pdf", e.target.files[0]) } />
                            <span className={`${styles.errorMessage}`}> <ErrorMessage name='pdf' /> </span>
                        </div> 

                        {/* Buttons */}
                        <div className="form-group mt-3 d-flex align-items-center gap-2">
                            <button type='submit' className='themeButton' disabled={isLoading === true}> Confirm </button>
                            <button type='button' className='themeButton' onClick={ () => setShowModal(false) }> Cancel </button>
                        </div>

                        {/* Loader */}
                        <div className="form-group mt-1 d-flex align-items-center">
                        {
                            isLoading && <Loader text={`Uploading...`} />
                        }
                        </div>
                    </Form>                        
                )}
                </FormBS>
            </ModalBS>

            <Row>
                <Col>
                    <Animation type="table">
                        <ReactDataTable 
                        title={`Books`} 
                        columns={columns} 
                        data={data} 
                        setCurrentPage={setCurrentPage}
                        search={search}
                        setSearch={setSearch}
                        limit={limit}
                        setLimit={setLimit}
                        />
                    </Animation>
                </Col>
            </Row>
        </>
    );
}

export default Books;