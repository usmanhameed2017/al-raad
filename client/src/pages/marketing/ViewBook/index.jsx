import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import { Row, Col } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import { getTime } from '../../../utils/getTime';
import Animation from '../../../components/Animation';
import Button from '../../../components/Button';
import { getRequest } from '../../../api/request';
import { FaDownload } from 'react-icons/fa';

function ViewBook() 
{
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [message, setMessage] = useState("");

    // For better UX
    useEffect(() => {
        let timer;
        if(!id) timer = setTimeout(() => setMessage("404 - Book Not Found"), 700);
        return () => clearTimeout(timer);
    },[]);

    // Fetch book on page load
    useEffect(() => {
        getRequest(`/book/${id}`)
        .then(response => setBook(response.data))
        .catch(() => setBook({}));
    }, [id]);

    return (
        <div className={styles.bookContainer}>
            {/* Loader */}
            <Loader size='big' text="Loading" />
        {
            book?._id ?
            (
                <>            
                    {/* Surah & Ayat */}
                    <Row>
                        <Animation type="heading">
                            <Col>
                                <h2 className={styles.bookName}> {book?.title} </h2>
                                <a href={book?.pdf} download>
                                    <Button className='float-end'> <FaDownload /> Download </Button>
                                </a>
                                <hr />
                            </Col>                                
                        </Animation>
                    </Row>

                    {/* Description */}
                    <Row className="mt-3">
                        <Animation type="normal">
                            <Col>
                                <p className={styles.bookDescription}> {book?.description} </p>
                            </Col>                                
                        </Animation>
                    </Row> 

                    {/* Uploaded Date */}
                    <Row className='mt-5'>
                        <Animation type="normal">
                            <Col md={{ span:"3", offset:"9" }}> 
                                <p className='text-secondary'> Posted at: { getTime(book?.createdAt) } </p>
                            </Col>                                
                        </Animation>
                    </Row>
                </>                    
            )
            :
            (
                <Row className="mt-3">
                    <Col>
                        <h1 className='textTheme fw-bold text-center'> { message } </h1>
                    </Col>
                </Row>   
            ) 
        }
        </div>
    );
}

export default ViewBook;