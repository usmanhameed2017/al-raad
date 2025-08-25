import { useState, useEffect } from 'react';
import styles from './style.module.css';
import { FaBookOpen, FaEye } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import CardBS from '../../../components/Card';
import { useAuth } from '../../../context/auth';
import Loader from '../../../components/Loader';
import { showError } from '../../../utils/toasterMessage';
import ServerSidePagination from '../../../components/Pagination';
import Animation from '../../../components/Animation';
import { getRequest } from '../../../api/request';
import { isArrayHaveData } from '../../../constants';

function Books() 
{
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const { isLoading, setLoading } = useAuth();

    // Enable loader on page load
    useEffect(() => {
        setLoading(true);
    },[]);    

    // Fetch book on page load
    useEffect(() => {
        getRequest(`/book?page=${currentPage}`)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            setData({ docs:[] });
            showError(error.message);
        })
        .finally(() => setLoading(false));
    }, [currentPage]);

    return (
        <div className={styles.bookWrapper}>
            <Animation type="heading">
                {/* Icon */}
                <span>
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
                    <h2 className='fw-bold textTheme'> No Book Found </h2>
                </Col>
            }
            </Row>

            {/* Pagination */}
            {
                isArrayHaveData(data.docs) && 
                (
                    <Row className='mt-3'>
                        <Col className="d-flex justify-content-center">
                            <ServerSidePagination data={data} setCurrentPage={setCurrentPage} />
                        </Col>
                    </Row>
                )
            }
        </div>
    );
}

export default Books;