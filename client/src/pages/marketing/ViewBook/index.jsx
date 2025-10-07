import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './style.module.css';
import { Row, Col } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import { getTime } from '../../../utils/getTime';
import Animation from '../../../components/Animation';
import { FaBookOpen, FaDownload, FaPenAlt } from 'react-icons/fa';
import { useAuth } from '../../../context/auth';
import useSocket from '../../../hooks/useSocket';
import { changesRealTime } from '../../../utils/realTimeHelpers';
import api from '../../../service/axios';

function ViewBook() 
{
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [message, setMessage] = useState("");

    // Global state
    const { loading } = useAuth();

    // Navigator
    const navigate = useNavigate();

    // Listen for real time changes
    useSocket("BookUpdated", useCallback(changesRealTime(setBook, id), [setBook]));

    // For better UX
    useEffect(() => {
        let timer;
        if(!id) timer = setTimeout(() => setMessage("404 - Book Not Found"), 700);
        return () => clearTimeout(timer);
    },[]);

    // Fetch book on page load
    useEffect(() => {
        api.get({ url:`/book/${id}` })
        .then(response => setBook(response.data))
        .catch(() => {
            setBook({});
            navigate("/books");
        });
    }, [id]);

    return (
        <>
            {/* Loader */}
            { loading && ( <div style={{ marginTop:"200px" }}> <Loader size='big' text="Loading" /> </div> ) } 
            {
                book?._id ? 
                (
                    // Mail
                    <Row>
                        <Animation type={`3d`}>
                            <Col>
                                {/* Wrapper */}
                                <div className={styles.wrapper}>
                                
                                    {/* Header */}
                                    <div className={styles.header}>
                                        <h1 className={styles.title}> <FaBookOpen size={50} /> Books & Articles </h1>
                                        <p className={styles.subtitle}>
                                            Read authentic Islamic literature that enlightens the heart and mind.
                                        </p>
                                    </div>

                                    {/* Details */}
                                    <div className={styles.detailBox}>
                                        <h2 className={styles.sectionTitle}> <FaPenAlt /> Book Details </h2>

                                        {/* Title */}
                                        <p className={styles.detail}>
                                            <strong className={styles.highlight}>Title:</strong> { book?.title }
                                        </p>

                                        {/* PDF */} 
                                        <p className={styles.detail}>
                                            <strong className={styles.highlight}>PDF:</strong> 
                                            <a href={book?.pdf} download className='fw-bold' title='Download Book'> <FaDownload size={12} /> Download </a>
                                        </p>

                                        {/* Posted by */}
                                        <p className={styles.detail}>
                                            <strong className={styles.highlight}>Posted by:</strong> { book?.uploadedBy?.name } 
                                        </p>

                                        {/* Posted at */}
                                        <p className={styles.detail}>
                                            <strong className={styles.highlight}>Posted at:</strong> { getTime(book?.createdAt) } 
                                        </p>
                                    </div>

                                    {/* Message */}
                                    <div className={styles.messageBox}>
                                        <h2 className={styles.sectionTitle}> <FaBookOpen /> Description</h2>
                                        <p className={styles.message}> { book?.description } </p>
                                    </div>

                                    {/* Footer */}
                                    <hr className={styles.divider} />
                                    <p className={styles.footer}>
                                        May these books and articles help you gain deeper insight into Islam.
                                    </p>
                                </div>  
                            </Col>                        
                        </Animation>
                    </Row>
                )
                :
                ( 
                    // Content not found
                    <Row>
                        <Col>
                            <h1 className='textTheme fw-bold text-center mt-5'> { message } </h1> 
                        </Col>
                    </Row>
                )
            }            
        </>
    );
}

export default ViewBook;