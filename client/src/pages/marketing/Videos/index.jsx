import { useState, useEffect } from 'react';
import styles from './style.module.css';
import { FaVideo } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import { fetchAllVideos } from '../../../api/video';
import { useAuth } from '../../../context/auth';
import Loader from '../../../components/Loader';
import { showError } from '../../../utils/toasterMessage';
import ServerSidePagination from '../../../components/Pagination';
import Animation from '../../../components/Animation';
import VideoCard from '../../../components/VideoCard';

function Videos() 
{
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const { isLoading, setLoading } = useAuth();

    // Enable loader on page load
    useEffect(() => {
        setLoading(true);
    },[]);    

    // Fetch video on page load
    useEffect(() => {
        fetchAllVideos(currentPage)
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

    console.log("My data", data);

    return (
        <div className={styles.videoWrapper}>
            <Animation type="heading">
                {/* Icon */}
                <span className={styles.headingWithIcon}>
                    <div className={styles.icon}> <FaVideo size={50} /> </div>
                    {/* Heading */}
                    <h2 className={styles.heroTitle}> Videos Lectures </h2>
                    <hr className='text-secondary' />
                </span>
            </Animation>

            {/* Videos */}
            
            <Row className='mt-5'>
            {
                isLoading ? (  <Loader text="Loading" /> ) :
                data.docs && Array.isArray(data.docs) && data.docs.length > 0 ?
                data.docs.map((video, _) => (
                    <Col xs={12} sm={12} md={6} lg={4} xl={4} key={video?._id} className='mb-3'>
                    <VideoCard  title={video?.title} url={video?.url} />
                    </Col>                     
                ))
                :
                <Col>
                  <h2 className='fw-bold textTheme'> No Video Found </h2>
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

export default Videos;