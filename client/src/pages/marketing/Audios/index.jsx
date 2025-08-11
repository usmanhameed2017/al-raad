import { useState, useEffect } from 'react';
import styles from './style.module.css';
import { FaPlayCircle } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import { fetchAllAudios } from '../../../api/audio';
import { useAuth } from '../../../context/auth';
import Loader from '../../../components/Loader';
import { showError } from '../../../utils/toasterMessage';
import ServerSidePagination from '../../../components/Pagination';
import Animation from '../../../components/Animation';
import AudioCard from '../../../components/AudioCard';

function Audios() 
{
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const { isLoading, setLoading } = useAuth();

    // Enable loader on page load
    useEffect(() => {
        setLoading(true);
    },[]);    

    // Fetch audio on page load
    useEffect(() => {
        fetchAllAudios(currentPage)
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
        <div className={styles.audioWrapper}>
            <Animation type="heading">
                {/* Icon */}
                <span className={styles.headingWithIcon}>
                    <div className={styles.icon}> <FaPlayCircle size={50} /> </div>
                    {/* Heading */}
                    <h2 className={styles.heroTitle}> Audio Lectures </h2>
                    <hr className='text-secondary' />
                </span>
            </Animation>

            {/* Audios */}
            
            <Row className='mt-5'>
            {
                isLoading ? (  <Loader text="Loading" /> ) :
                data.docs && Array.isArray(data.docs) && data.docs.length > 0 ?
                data.docs.map((audio, _) => (
                    <Col xs={12} sm={12} md={6} lg={4} xl={4} key={audio?._id} className='mb-3'>
                        <AudioCard  title={audio?.title} url={audio?.url} />
                    </Col>                     
                ))
                :
                <Col>
                    <h2 className='fw-bold textTheme'> No Audio Found </h2>
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

export default Audios;