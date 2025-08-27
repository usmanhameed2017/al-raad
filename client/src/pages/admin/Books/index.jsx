import { useCallback, useEffect, useState } from 'react';
import { deleteRequest, getRequest, postRequest, putRequest } from '../../../api/request';
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
import { addBookValidation } from './schema';
import Loader from '../../../components/Loader';
import { sweetAlert } from '../../../utils/sweetAlert2';

function Books() 
{
    // States
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10); // Records per page
    const [data, setData] = useState({ docs: [], totalDocs: 0, pagingCounter: 1 });
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editFormValues, setEditFormValues] = useState(null);
    const [formType, setFormType] = useState("");
    const [reloadData, setReloadData] = useState(0);

    // Global state loader
    const { loading, setLoading } = useAuth();

    // Form Initial values
    const initialValues = {
        _id: editFormValues?._id || "",
        title: editFormValues?.title || "",
        description: editFormValues?.description || "",
        pdf: editFormValues?.pdf || "",
    };
    
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
        (async () => {
            setLoading(true);
            try 
            {
                const response = await getRequest(`/book?page=${currentPage}&limit=${limit}&search=${debouncedSearch}`);
                setData(response.data);
            }
            catch (error) 
            {
                return error;
            }
            finally
            {
                setLoading(false);
            }
        })();
    }, [currentPage, limit, debouncedSearch, reloadData]);

    // Launch Modal
    const launchModal = useCallback(() => {
        setFormType("create");
        setEditFormValues(null);
        setShowModal(true);
    },[]);

    // Edit
    const edit = useCallback((data) => {
        setFormType("edit")
        setEditFormValues({ ...data, pdf: "" }); // Keep pdf empty initially
        setShowModal(true);
    },[]);

    // Delete
    const drop = useCallback(async (_id) => {
        sweetAlert("Are you sure?", "This action will permanently delete the record.", "confirm", "Yes, delete it!", null, async () => {
            setLoading(true);
            try 
            {
                await deleteRequest(`/book/${_id}`);
                setReloadData(reloadData + 1);
            } 
            catch (error) 
            {
                return error;
            } 
            finally 
            {
                setLoading(false);
            }
        })
    },[reloadData]);

    // Columns
    const columns = [
        { name: "SR.NO", cell: (row, index) => (data?.pagingCounter || 0) + index, sortable: true, width:"120px" },
        { name: "Title", selector: row => row.title, sortable: true },
        { name: "Description", selector: row => row.description?.substring(0,50) || "-" },
        { name: "Uploaded By", selector: row => row.uploadedBy?.name || "-" },
        { 
            name: "PDFs",
            width:"205px",
            cell: row => row.pdf ? ( 
                <a href={row.pdf} download> 
                    <Button> <FaDownload /> Download </Button>
                </a> 
            )
            : 
            "No PDF",
            ignoreRowClick: true
        },
        { 
            name: "Operations",
            width:"320px",
            cell: row =>  ( 
                <div style={{ display:"flex", gap:"8px" }}>
                    <Button onClick={() => edit(row)}> <FaEdit /> Edit </Button>
                    <Button onClick={() => drop(row?._id)}> <FaTrash /> Delete </Button>
                </div>
            )
        },
    ];  

    return (
        <>
            {/* Modal Launcher */}
            <Row className='mb-3'>
                <Col>
                    <Animation type="button">
                        <div className='float-end'> 
                            <Button onClick={launchModal}> <FaPlus /> Add New </Button> 
                        </div>
                    </Animation>
                </Col>
            </Row>

            {/* Data Table */}
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

            {/* Modal */}
            <ModalBS showModal={showModal} setShowModal={setShowModal} modalTitle={ formType === "create" ? "ADD NEW BOOK" : "EDIT BOOK" }>
                {/* Form */}
                <FormBS initialValues={initialValues} validationSchema={addBookValidation}
                handlerFunction={ async (values, action) => {
                    setLoading(true);
                    try
                    {
                        if(formType === "create") delete values?._id;
                        formType === "create" ? await postRequest("/book", values, true) : await putRequest(`/book/${values?._id}`, values, true);
                        action.resetForm();
                        setShowModal(false);
                        setReloadData(reloadData + 1);
                    }
                    catch(error)
                    {
                        return error;
                    }
                    finally
                    {
                        setLoading(false);
                    }
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
                            <input type="file" name="pdf" className={`${styles.input} form-control`} 
                            accept='application/pdf' required={formType==="create"}
                            onChange={ (e) => setFieldValue("pdf", e.target.files[0]) } />
                            <span className={`${styles.errorMessage}`}> <ErrorMessage name='pdf' /> </span>
                        </div> 

                        {/* Buttons */}
                        <div className="form-group mt-3 d-flex align-items-center gap-2">
                            <Button type="submit" disabled={loading === true}> Confirm </Button>
                            <Button type="button" onClick={ () => setShowModal(false) }> Cancel </Button>
                        </div>

                        {/* Loader */}
                        {loading && (
                            <div className="form-group mt-3 d-flex align-items-center">
                                <Loader size='small' text={`Uploading...`} />
                            </div>
                        )}
                    </Form>                        
                )}
                </FormBS>
            </ModalBS>
        </>
    );
}

export default Books;