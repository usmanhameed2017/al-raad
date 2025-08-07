import { useState, useEffect } from 'react';
import styles from './style.module.css';
import { FaBookOpen } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import CardBS from '../../../components/Card';
import { fetchAllTafseers } from '../../../api/tafseer';
import { useAuth } from '../../../context/auth';
import Loader from '../../../components/Loader';
import { showError } from '../../../utils/toasterMessage';
import ServerSidePagination from '../../../components/Pagination';
import Animation from '../../../components/Animation';

function Tafseer() 
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
        fetchAllTafseers(currentPage)
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
        <div className={styles.tafseerWrapper}>
            <Animation type="heading">
                {/* Icon */}
                <span className={styles.headingWithIcon}>
                    <div className={styles.icon}> <FaBookOpen size={50} /> </div>
                    {/* Heading */}
                    <h2 className={styles.heroTitle}> Tafseer Al-Qura'an </h2>
                    <hr className='text-secondary' />
                </span>
            </Animation>
            
            {/* Cards */}
            <Row className='mt-5'>
            {
                isLoading ? (  <Loader text="Loading" /> ) :
                data.docs && Array.isArray(data.docs) && data.docs.length > 0 ?
                data.docs.map((tafseer, _) => (
                    <Col xs={12} sm={6} md={6} lg={4} xl={4} key={tafseer?._id} className='mb-3'>
                        <Animation type="card">
                            <CardBS 
                            _id={tafseer?._id}
                            heading={tafseer?.surahName} 
                            subHeading={tafseer?.ayah} 
                            description={tafseer?.tafseer}
                            buttonText="View tafseer"
                            redirectTo={`/tafseer/${tafseer?._id}`} />
                        </Animation>
                    </Col>                     
                ))
                :
                <Col>
                    <h2 className='fw-bold textTheme'> No Tafseer Found </h2>
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

export default Tafseer;