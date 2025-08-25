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
        getRequest(`/tafseer?page=${currentPage}`)
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
        <div className={styles.tafseerWrapper}>
            <Animation type="heading">
                {/* Icon */}
                <span>
                    <div className="icon"> <FaBookOpen size={50} /> </div>
                    {/* Heading */}
                    <h2 className="heroTitle"> Tafseer Al-Qura'an </h2>
                    <hr className='text-secondary' />
                </span>
            </Animation>
            
            {/* Cards */}
            <Row className='mt-5'>
            {
                isLoading ? (  <Loader size='big' text="Loading" /> ) :
                isArrayHaveData(data.docs) ?
                data.docs?.map((tafseer, _) => (
                    <Col xs={12} sm={6} md={6} lg={4} xl={4} key={tafseer?._id} className='mb-3'>
                        <Animation type="card">
                            <CardBS 
                            _id={tafseer?._id}
                            heading={tafseer?.surahName} 
                            subHeading={tafseer?.ayah} 
                            description={tafseer?.tafseer}
                            buttonText="View tafseer"
                            icon={ <FaEye /> }
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

export default Tafseer;