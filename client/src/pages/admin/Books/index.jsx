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
import * as Yup from "yup";
import styles from "../PanelStyling/style.module.css";
import { sweetAlert } from '../../../utils/sweetAlert2';
import Loader from '../../../components/Loader';
import Input from '../../../components/InputFields';
import useSocket from '../../../hooks/useSocket';
import { addRealTime, deleteRealTime, updateRealTime } from '../../../utils/realTimeHelpers';

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

    // Global state loader
    const { savingChanges } = useAuth();

    // Helpers
    const handleAdd = useCallback(addRealTime(setData), [setData]);
    const handleUpdate = useCallback(updateRealTime(setData), [setData]);
    const handleDelete = useCallback(deleteRealTime(setData, setCurrentPage), [setData]);

    // Listen for real time updates
    useSocket("BookAdded", handleAdd);
    useSocket("BookUpdated", handleUpdate);
    useSocket("BookDeleted", handleDelete);  
    
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
        getRequest(`/book?page=${currentPage}&limit=${limit}&search=${debouncedSearch}`)
        .then(response => setData(response.data))
        .catch(error => console.log(error.message));
    }, [currentPage, limit, debouncedSearch]);

    // Launch modal for add
    const launchModal = useCallback(() => {
        setFormType("create");
        setEditFormValues(null);
        setShowModal(true);
    },[]);

    // Launch modal for edit
    const edit = useCallback((data) => {
        setFormType("edit")
        setEditFormValues({ ...data, pdf: "" }); // Keep pdf empty initially
        setShowModal(true);
    },[]); 
    
    // Add & Edit
    const handleSubmit = useCallback(async (values, action) => {
        try
        {
            if(formType === "create")
            {
                delete values?._id;
                await postRequest("/book", values, true);
                action.resetForm();
            }
            else
            {
                await putRequest(`/book/${values?._id}`, values, true);
            }
            setShowModal(false);
        }
        catch(error)
        {
            return error;
        } 
    },[formType]);    

    // Delete
    const drop = useCallback(async (_id) => {
        sweetAlert("Are you sure?", "This action will permanently delete the record.", "confirm", "Yes, delete it!", null, async () => {
            try 
            {
                await deleteRequest(`/book/${_id}`);
            } 
            catch (error) 
            {
                return error;
            } 
        })
    },[]);

    // Columns
    const columns = [
        { name: "SR.NO", cell: (row, index) => (data?.pagingCounter || 0) + index, sortable: true, width:"120px" },
        { name: "Title", selector: row => row?.title, sortable: true },
        { name: "Description", selector: row => row?.description?.substring(0,50) || "-" },
        { name: "Uploaded By", selector: row => row?.uploadedBy?.name || "-" },
        { 
            name: "PDFs",
            width:"205px",
            cell: row => row?.pdf ? ( 
                <a href={row?.pdf} download> 
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
        }
    ];  

    // Initial values
    const initialValues = {
        _id: editFormValues?._id || "",
        title: editFormValues?.title || "",
        description: editFormValues?.description || "",
        pdf: editFormValues?.pdf || "",
    }; 
    
    // Allowed file type (only PDF)
    const allowedFileTypes = ["application/pdf"];    

    // Validation schema
    const validationSchema = Yup.object({
        // Title
        title: Yup.string()
        .min(5, "Title must be at least 5 characters long")
        .max(30, "Title must not be longer than 30 characters")
        .required("Title is required"),

        // Description
        description: Yup.string()
        .min(10, "Description must be at least 10 characters long")
        .max(500, "Description must not be longer than 500 characters"),
        
        // PDF
        pdf:Yup.mixed()
        .nullable()
        .test('type', "Invalid file format! Only PDF is allowed", (file) => {
            return !file || allowedFileTypes.includes(file?.type);
        })
        .test('size', "PDF size must not be larger than 9MB", (file) => {
            return !file || file?.size <= 9000000;
        })
    });  

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
                <ReactDataTable 
                title={`Books`} 
                columns={columns} 
                data={data} 
                setCurrentPage={setCurrentPage}
                search={search}
                setSearch={setSearch}
                limit={limit}
                setLimit={setLimit} />
            </Col>
        </Row> 

            {/* Modal */}
            <ModalBS showModal={showModal} setShowModal={setShowModal} 
            modalTitle={ formType === "create" ? "ADD NEW BOOK" : "EDIT BOOK" }>
                {/* Form */}
                <FormBS initialValues={initialValues} validationSchema={validationSchema} handlerFunction={handleSubmit}>
                    {/* Title */}
                    <div className="form-group mb-2">
                        <label htmlFor="title" className={styles.label}> Title </label>
                        <Input type="text" name="title" className={`${styles.input} form-control`} placeholder="Enter Title" />
                    </div>

                    {/* Description */}
                    <div className="form-group mb-2">
                        <label htmlFor="description" className={styles.label}> Description </label>
                        <Input type="textarea" rows="3" name="description" className={`${styles.input} form-control`} placeholder="Enter Description" />
                    </div>

                    {/* PDF */}
                    <div className="form-group mb-2">
                        <label htmlFor="pdf" className={styles.label}> Upload PDF </label>
                        <Input type="file" name="pdf" className={`${styles.input} form-control`}
                        accept='application/pdf' required={formType==="create"} />
                    </div> 

                    {/* Buttons */}
                    <div className="form-group mt-3 d-flex align-items-center gap-2">
                        <Button type="submit" disabled={savingChanges === true}> Save Changes </Button>
                        <Button type="button" onClick={ () => setShowModal(false) }> Cancel </Button>
                    </div>

                    {/* Loader */}
                    {savingChanges && (
                        <div className="form-group mt-3 d-flex align-items-center">
                            <Loader size='small' text={`Saving changes...`} />
                        </div>
                    )}                       
                </FormBS>
            </ModalBS>
        </>
    );
}

export default Books;