import { useState, useEffect } from 'react';
import styles from './style.module.css';
import { FaBookOpen, FaEye } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import CardBS from '../../../components/Card';
import { useAuth } from '../../../context/auth';
import Loader from '../../../components/Loader';
import ServerSidePagination from '../../../components/Pagination';
import Animation from '../../../components/Animation';
import { getRequest } from '../../../api/request';
import { isArrayHaveData } from '../../../constants';

function Books() 
{
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [message, setMessage] = useState("");
    const { isLoading, setLoading } = useAuth();

    useEffect(() => {
        setLoading(true); // Enable loader on page load
        let timer;
        if(!isArrayHaveData(data?.docs)) 
        {
            timer = setTimeout(() => setMessage("No Book Found"), 700);
        }
        return () => clearTimeout(timer);
    },[]);

    // Fetch book on page load
    useEffect(() => {
        getRequest(`/book?page=${currentPage}`)
        .then(response => setData(response.data))
        .catch(() => setData({ docs:[] }))
        .finally(() => setLoading(false));
    }, [currentPage]);

    return (
        <div className={styles.bookWrapper}>
            <Animation type="heading">
                <span>
                    {/* Icon */}
                    <div className="icon"> <FaBookOpen size={50} /> </div>
                    {/* Heading */}
                    <h2 className="heroTitle"> Books & Articles </h2>
                    <hr className='text-secondary' />
                </span>
            </Animation>
            
            {/* Cards */}
            <Row className='mt-5'>
            {
                isLoading ? (  <Loader size='big' text="Loading" /> ) :
                isArrayHaveData(data.docs) ?
                data.docs?.map((book, _) => (
                    <Col xs={12} sm={12} md={6} lg={4} xl={4} key={book?._id} className='mb-3'>
                        <Animation type="card">
                            <CardBS 
                            _id={book?._id}
                            heading={book?.title} 
                            description={book?.description}
                            link={book?.pdf}
                            buttonText="View book"
                            icon={ <FaEye /> }
                            redirectTo={`/books/${book?._id}`} />
                        </Animation>
                    </Col>                     
                ))
                :
                <Col>
                    <h2 className='fw-bold textTheme'> { message } </h2>
                </Col>
            }
            </Row>

            {/* Pagination */}
            <Row>
                <Col className="d-flex justify-content-center">
                    {!isLoading && isArrayHaveData(data.docs) && (
                        <ServerSidePagination data={data} setCurrentPage={setCurrentPage} />                    
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default Books;