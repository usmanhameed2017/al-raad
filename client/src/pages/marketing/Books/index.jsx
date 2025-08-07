import { useState, useEffect } from 'react';
import styles from './style.module.css';
import { motion } from 'framer-motion';
import { FaBookOpen } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import CardBS from '../../../components/Card';
import { fetchAllBooks } from '../../../api/book';
import { useAuth } from '../../../context/auth';
import Loader from '../../../components/Loader';
import { showError } from '../../../utils/toasterMessage';
import ServerSidePagination from '../../../components/Pagination';
import Animation from '../../../components/Animation';

function Books() 
{
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const { isLoading, setLoading } = useAuth();

    // Enable loader on page load
    useEffect(() => {
        setLoading(true);
    },[]);    

    // Fetch tafseer on page load
    useEffect(() => {
        fetchAllBooks(currentPage)
        .then(response => {
            setLoading(false);
            setData(response);
        })
        .catch(error => {
            setLoading(false);
            setData({ docs:[] });
            showError(error);
        });
    }, [currentPage]);

    return (
        <div className={styles.bookWrapper}>
            <Animation type="heading">
                {/* Icon */}
                <span className={styles.headingWithIcon}>
                    <div className={styles.icon}> <FaBookOpen size={50} /> </div>
                    {/* Heading */}
                    <h2 className={styles.heroTitle}> Books & Articles </h2>
                    <hr className='text-secondary' />
                </span>
            </Animation>
            
            {/* Cards */}
            <Row className='mt-5'>
            {
                isLoading ? (  <Loader text="Loading" /> ) :
                data.docs && Array.isArray(data.docs) && data.docs.length > 0 ?
                data.docs.map((tafseer, _) => (
                    <Col xs={12} sm={12} md={6} lg={4} xl={4} key={tafseer?._id} className='mb-3'>
                        <Animation type="card">
                            <CardBS 
                            _id={tafseer?._id}
                            heading={tafseer?.title} 
                            subHeading={tafseer?.title} 
                            description={tafseer?.description}
                            buttonText="View book" />
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
                isLoading === false && 
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