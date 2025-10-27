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
import sweetAlert from '../../../utils/sweetAlert2';
import Loader from '../../../components/Loader';
import Input from '../../../components/InputFields';
import useSocket from '../../../hooks/useSocket';
import api from '../../../service/axios';
import { addRealTime, deleteRealTime, updateRealTime } from '../../../utils/realTimeHelpers';

function Users() 
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
    useSocket("UserAdded", useCallback(addRealTime(setData), [setData]));
    useSocket("UserUpdated", useCallback(updateRealTime(setData), [setData]));
    useSocket("UserDeleted", useCallback(deleteRealTime(setData, setCurrentPage), [setData]));
    
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
        api.get({ url: `/user?page=${currentPage}&limit=${limit}&search=${debouncedSearch}` })
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
    const edit = useCallback((payload) => {
        setFormType("edit")
        setEditFormValues(payload);
        setShowModal(true);
    },[]);

    // Handle close modal
    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    },[]);    

    // Delete
    const drop = useCallback(async (_id) => {
        sweetAlert.confirm({ fn:async () => {
            try 
            {
                await api.delete({ url:`/user/${_id}` });
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
        { name: "Full Name", selector: row => row?.name, sortable: true },
        { name: "Username", selector: row => row?.username },
        { name: "Email", selector: row => row?.email },
        { name: "IP Address", selector: row => row?.ip || "-" },
        { name: "Role", selector: row => row?.role },
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
        name: editFormValues?.name || "",
        username: editFormValues?.username || "",
        email: editFormValues?.email || "",
        role: editFormValues?.role || "",
        password: editFormValues?.password || "",
        cpassword: editFormValues?.password || ""
    };     

    // Validation schema
    const validationSchema = Yup.object({
        // Name
        name: Yup.string()
        .min(3, "Name must be at least 3 characters long")
        .max(30, "Name must not be longer than 30 characters")
        .required("Name is required"),

        // Username
        username: Yup.string()
        .matches(/^[a-z0-9_@]+$/, "Username can only contain lowercase letters, underscore (_) and @")
        .min(6, "Username must be at least 6 characters long")
        .max(20, "Username must not be longer than 20 characters")
        .required("Username is required"),

        // Email
        email: Yup.string()
        .strict(true)
        .lowercase("Email must contain lowercase letters")
        .min(10, "Email must be at least 10 characters long")
        .max(30, "Email must not be longer than 30 characters")
        .email("Invalid email")
        .required("Email is required"),
        
        // Role
        role: Yup.string()
        .required("Please select role"),

        // Password
        password: Yup.string()
        .nullable()
        .test("password-validation", "Enter strong password", function (value) {
            if(formType === "create") 
            {
                if(!value) return this.createError({ message: "Password is required" });
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value);
            } 
            else 
            {
                if(!value) return true;
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value);
            }
        }),

        // Confirm Password
        cpassword: Yup.string()
        .nullable()
        .test("cpassword-validation", "Password & confirm password must be identical", function (value) {
            const { password } = this.parent;
            if(formType === "create") 
            {
                if(!value) return this.createError({ message: "Confirm password is required" });
                return value === password;
            } 
            else 
            {
                if(!password && !value) return true;
                return value === password;
            }
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
                    title={`Users`} 
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
            <ModalBS showModal={showModal} handleCloseModal={handleCloseModal}  modalSize='md'
            modalTitle={ formType === "create" ? `Add User` : `Edit User` }>
                {/* Form */}
                <FormBS initialValues={initialValues} validationSchema={validationSchema}
                handlerFunction={ async (payload, action) => {
                    try
                    {
                        if(formType === "create")
                        {
                            delete payload?._id;
                            await api.post({ url:`/user/create`, payload });
                            action.resetForm();
                        }
                        else
                        {
                            // Initialize payload without password
                            let payload = {
                                name: payload?.name,
                                username: payload?.username,
                                email: payload?.email,
                                role: payload?.role
                            };

                            if(payload?.password) payload.password = payload?.password;
                            await api.put({ url:`/user/${payload?._id}`, payload });
                        }
                        setShowModal(false);
                    }
                    catch(error)
                    {
                        return error;
                    }
                }}>
                    {/* Name */}
                    <div className="form-group mb-2">
                        <label htmlFor="name" className={styles.label}> Name </label>
                        <Input type="text" name="name" className={`${styles.input} form-control`} placeholder="Enter Name" />
                    </div>

                    {/* Username */}
                    <div className="form-group mb-2">
                        <label htmlFor="username" className={styles.label}> Username </label>
                        <Input type="text" name="username" className={`${styles.input} form-control`} placeholder="Enter Username" />
                    </div>

                    {/* Email */}
                    <div className="form-group mb-2">
                        <label htmlFor="email" className={styles.label}> Email </label>
                        <Input type="text" name="email" className={`${styles.input} form-control`} placeholder="Enter Email" />
                    </div>                       

                    {/* Role */}
                    <div className="form-group mb-2">
                        <label htmlFor="role" className={styles.label}> Role </label>
                        <Input type="select" name="role" className={`${styles.input} form-control`}>
                            <option value=""> Select Role </option>
                            <option value="Admin"> Admin </option>
                            <option value="User"> User </option>
                        </Input>
                    </div>

                    {/* Password */}
                    <div className="form-group mb-2">
                        <label htmlFor="password" className={styles.label}> Password </label>
                        <Input type="password" name="password" className={`${styles.input} form-control`} placeholder="Enter Password" />
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group mb-2">
                        <label htmlFor="cpassword" className={styles.label}> Confirm Password </label>
                        <Input type="password" name="cpassword" className={`${styles.input} form-control`} placeholder="Re-Enter Password" />
                    </div>

                    {formType === "edit" && (
                        <>
                            <hr />
                            <i className='text-secondary mb-3 ms-1'>  Note: Leave the password fields blank to keep your current password. </i>
                        </>
                    )}

                    {/* Buttons */}
                    <div className="form-group mt-3 d-flex align-items-center gap-2">
                        <Button type="submit" disabled={savingChanges === true}> Save Changes </Button>
                        <Button type="button" onClick={ () => setShowModal(false) }> Cancel </Button>
                    </div>

                    {/* Loader */}
                    {savingChanges && (
                        <div className="form-group mt-3 d-flex align-items-center">
                            <Loader size='small' text={`Saving changes`} />
                        </div>
                    )}                     
                </FormBS>
            </ModalBS>
        </>
    );
}

export default Users;