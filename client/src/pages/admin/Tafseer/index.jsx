import { useCallback, useEffect, useState } from 'react';
import { deleteRequest, getRequest, postRequest, putRequest } from '../../../api/request';
import ReactDataTable from '../../../components/DataTable';
import Button from '../../../components/Button';
import { useAuth } from '../../../context/auth';
import Animation from '../../../components/Animation';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import ModalBS from '../../../components/Modal';
import FormBS from '../../../components/Form';
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "formik";
import styles from "../PanelStyling/style.module.css";
import { sweetAlert } from '../../../utils/sweetAlert2';
import Loader from '../../../components/Loader';
import { surahList } from '../../../constants';
import { getTime } from '../../../utils/getTime';

function Tafseer() 
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
    const { savingChanges } = useAuth();

    // Page name
    const pageName = "Tafseer";
    
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

    // Launch Modal
    const launchModal = useCallback(() => {
        setFormType("create");
        setEditFormValues(null);
        setShowModal(true);
    },[]);

    // Edit
    const edit = useCallback((data) => {
        setFormType("edit")
        setEditFormValues(data);
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
        { name: "Surah Name", selector: row => row?.surahName, sortable: true },
        { name: "Ayah No", selector: row => `Ayah: ${row?.ayah?.substring(0,50)}` || "-" },
        { name: "Tafseer", selector: row => row?.tafseer?.substring(0,50) || "-" },
        { name: "Language", selector: row => row?.language || "-" },
        { name: "Uploaded By", selector: row => row?.uploadedBy?.name || "-" },
        { name: "Created At", selector: row => getTime(row?.createdAt) || "-", width:"270px" },
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

    // Initial values
    const initialValues = {
        _id: editFormValues?._id || "",
        surahName: editFormValues?.surahName || "",
        ayah: editFormValues?.ayah || "",
        tafseer: editFormValues?.tafseer || "",
        language: editFormValues?.language || ""
    };     

    // Validation schema
    const validationSchema = Yup.object({
        // Surah name
        surahName: Yup.string()
        .max(30, "Surah name must not be longer than 30 characters")
        .required("Please select surah"),

        // Ayah
        ayah: Yup.string()
        .max(40, "Ayah reference must not be longer than 40 characters")
        .required("Ayah is required"),

        // Tafseer
        tafseer: Yup.string()
        .min(20, "Tafseer must be at least 20 characters long")
        .max(2000, "Tafseer must not be longer than 2000 characters")
        .required("Tafseer is required"),

        // Language
        language: Yup.string()
        .required("Please select language")     
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
                    <Animation type="table">
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

            {/* Modal */}
            <ModalBS showModal={showModal} setShowModal={setShowModal} 
            modalTitle={ formType === "create" ? `ADD NEW ${pageName.toUpperCase()}` : `EDIT ${pageName.toUpperCase()}` }>
                {/* Form */}
                <FormBS initialValues={initialValues} validationSchema={validationSchema}
                handlerFunction={ async (values, action) => {
                    try
                    {
                        if(formType === "create")
                        {
                            delete values?._id;
                            await postRequest(`/${pageName.toLowerCase()}`, values);
                            action.resetForm();
                        }
                        else
                        {
                            await putRequest(`/${pageName.toLowerCase()}/${values?._id}`, values);
                        }
                        setShowModal(false);
                        setReloadData(reloadData + 1);
                    }
                    catch(error)
                    {
                        return error;
                    }
                }}>
                    <Form>
                        {/* Surah Name */}
                        <div className="form-group mb-3">
                            <label htmlFor="surahName" className={styles.label}> Surah Name </label>
                            <Field type="text" name="surahName" list="surahOptions" className={`${styles.input} form-control`} placeholder="Select Surah" />

                            {/* Datalist options */}
                            <datalist id="surahOptions">
                            {surahList.map(surah => (
                                <option value={surah} key={surah}> { surah } </option>
                            ))}
                            </datalist>
                            <span className={`${styles.errorMessage}`}> <ErrorMessage name='surahName' /> </span>
                        </div>

                        {/* Ayah */}
                        <div className="form-group mb-3">
                            <label htmlFor="ayah" className={styles.label}> Ayat Reference </label>
                            <Field type="text" name="ayah" className={`${styles.input} form-control`} placeholder="Enter Ayah No (eg: Ayah:02 - Ayah:04)" />
                            <span className={`${styles.errorMessage}`}> <ErrorMessage name='ayah' /> </span>
                        </div>

                        {/* Tafseer */}
                        <div className="form-group mb-3">
                            <label htmlFor="tafseer" className={styles.label}> Tafseer </label>
                            <Field as="textarea" name="tafseer" rows="5" className={`${styles.input} form-control`} placeholder="Enter Tafseer" />
                            <span className={`${styles.errorMessage}`}> <ErrorMessage name='tafseer' /> </span>
                        </div>  

                        {/* Language */}
                        <div className="form-group mb-3">
                            <label htmlFor="language" className={styles.label}> Language </label>
                            <Field as="select" name="language" rows="5" className={`${styles.input} form-control`}> 
                                <option value=""> Select Language </option>
                                <option value="Arabic"> Arabic </option>
                                <option value="Urdu"> Urdu </option>
                            </Field>
                            <span className={`${styles.errorMessage}`}> <ErrorMessage name='language' /> </span>
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
                    </Form>                        
                </FormBS>
            </ModalBS>
        </>
    );
}

export default Tafseer;