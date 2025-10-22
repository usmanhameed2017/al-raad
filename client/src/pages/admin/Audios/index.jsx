import { useCallback, useEffect, useState } from 'react';
import ReactDataTable from '../../../components/DataTable';
import Button from '../../../components/Button';
import { useAuth } from '../../../context/auth';
import Animation from '../../../components/Animation';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import ModalBS from '../../../components/Modal';
import FormBS from '../../../components/Form';
import * as Yup from "yup";
import styles from "../PanelStyling/style.module.css";
import Loader from '../../../components/Loader';
import { surahList } from '../../../constants';
import { generateOptimizedUrl } from '../../../utils/cloudinary';
import Input from '../../../components/InputFields';
import useSocket from '../../../hooks/useSocket';
import { addRealTime, deleteRealTime, updateRealTime } from '../../../utils/realTimeHelpers';
import api from '../../../service/axios';
import sweetAlert from '../../../utils/sweetAlert2';

function Audios() 
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

    // Listen for real time updates
    useSocket("AudioAdded", useCallback(addRealTime(setData), [setData]));
    useSocket("AudioUpdated", useCallback(updateRealTime(setData), [setData]));
    useSocket("AudioDeleted", useCallback(deleteRealTime(setData, setCurrentPage), [setData]));
    
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
        api.get({ url:`/audio?page=${currentPage}&limit=${limit}&search=${debouncedSearch}` })
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
        setEditFormValues({ ...data, url: "" });
        setShowModal(true);
    },[]);

    // Handle close modal
    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    },[]);

    // Add & Edit
    const handleSubmit = useCallback(async (payload, action) => {
        try
        {
            if(formType === "create")
            {
                delete payload?._id;
                await api.post({ url:"/audio", payload, fileAttachment:true });
                action.resetForm();
            }
            else
            {
                await api.put({ url:`/audio/${payload?._id}`, payload, fileAttachment:true });
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
        sweetAlert.confirm({ fn:async () => {
            try 
            {
                await api.delete({ url: `/audio/${_id}` });
            } 
            catch (error) 
            {
                return error;
            } 
        } });
    },[]);

    // Columns
    const columns = [
        { name: "SR.NO", cell: (row, index) => (data?.pagingCounter || 0) + index, sortable: true, width:"120px" },
        { name: "Surah Name", selector: row => row?.surahName, sortable: true },
        { name: "Ayah No", selector: row => `Ayah: ${row?.ayah?.substring(0,50)}` || "-" },
        { name: "Uploaded By", selector: row => row?.uploadedBy?.name || "-" },
        { 
            name: "Audios",
            width:"350px",
            cell: row => row?.url ? ( 
                <audio preload='none' controls style={{ width: "350px" }}>
                    <source src={generateOptimizedUrl(row?.url, "audio")} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            ) : "No Audio",
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
        surahName: editFormValues?.surahName || "",
        ayah: editFormValues?.ayah || "",
        url: editFormValues?.url || "",
    }; 
    
    // Allowed file type
    const allowedFileTypes = ["audio/mp3", "audio/mpeg", "audio/webm", "audio/wav", "audio/ogg"];   

    // Validation schema
    const validationSchema = Yup.object({
        // Surah name
        surahName: Yup.string()
        .required("Select Surah"),

        // Ayah
        ayah: Yup.string()
        .matches(/^\d+(-\d+)?$/, "Ayah must be a number or a range like 02-04")
        .max(30, "Ayah must not be longer than 30 characters")
        .required("Ayah is required"),
        
        // Audio
        url:Yup.mixed()
        .nullable()
        .test('type', "Invalid file format! Only mp3, mpeg, webm, wav and ogg are allowed", (file) => {
            return !file || allowedFileTypes.includes(file?.type);
        })
        .test('size', "PDF size must not be larger than 20MB", (file) => {
            return !file || file?.size <= 20000000;
        })
});    

    return (
        <>
            {/* Modal Launcher Button */}
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
                    title={`Audios`} 
                    columns={columns} 
                    docs={data.docs} 
                    totalDocs={data.totalDocs}
                    limit={limit}
                    setLimit={setLimit}
                    search={search}
                    setSearch={setSearch}
                    setCurrentPage={setCurrentPage} />
                </Col>
            </Row>

            {/* Modal */}
            <ModalBS showModal={showModal} handleCloseModal={handleCloseModal} 
            modalTitle={ formType === "create" ? "ADD NEW AUDIO" : "EDIT AUDIO" }>
                {/* Form */}
                <FormBS initialValues={initialValues} validationSchema={validationSchema} handlerFunction={handleSubmit}>
                    {/* Surah Name */}
                    <div className="form-group mb-2">
                        <label htmlFor="surahName" className={styles.label}> Surah Name </label>
                        <Input type="datalist" name="surahName" list="surahOptions" className={`${styles.input} form-control`} placeholder="Select Surah"> 
                            {/* Datalist options */}
                            {surahList.map(surah => <option value={surah} key={surah}> { surah } </option> )}                      
                        </Input>
                    </div>

                    {/* Ayah */}
                    <div className="form-group mb-2">
                        <label htmlFor="ayah" className={styles.label}> Ayat Reference </label>
                        <Input type="text" name="ayah" className={`${styles.input} form-control`} placeholder="Enter Ayah No (eg: 02-04)" />
                    </div>

                    {/* Audio */}
                    <div className="form-group mb-2">
                        <label htmlFor="audio" className={styles.label}> Upload Audio </label>
                        <Input type="file" name="url" className={`${styles.input} form-control`} required={formType==="create"} accept="audio/*" />
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

export default Audios;