import { useState, useEffect } from 'react';
import styles from './style.module.css';
import { FaVideo } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import { useAuth } from '../../../context/auth';
import Loader from '../../../components/Loader';
import ServerSidePagination from '../../../components/Pagination';
import Animation from '../../../components/Animation';
import VideoCard from '../../../components/VideoCard';
import { getRequest } from '../../../api/request';
import { isArrayHaveData } from '../../../constants';

function Videos() 
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
        timer = setTimeout(() => setMessage("No Video Found"), 700);
    }
    return () => clearTimeout(timer);
  },[]);  

  // Fetch video on page load
  useEffect(() => {
    getRequest(`/video?page=${currentPage}`)
    .then(response => setData(response.data))
    .catch(() => setData({ docs:[] }))
    .finally(() => setLoading(false));
  },[currentPage]);

    return (
      <div className={styles.videoWrapper}>
        <Animation type="heading">
          <span>
            {/* Icon */}
            <div className="icon"> <FaVideo size={50} /> </div>
            {/* Heading */}
            <h2 className="heroTitle"> Video Lectures </h2>
            <hr className='text-secondary' />
          </span>
        </Animation>

        {/* Videos */}
        <Row className='mt-5'>
        {
          isLoading ? (  <Loader size='big' text="Loading" /> ) :
          isArrayHaveData(data.docs) ?
          data.docs?.map((video, _) => (
              <Col xs={12} sm={12} md={6} lg={4} xl={4} key={video?._id} className='mb-3'>
              <VideoCard  title={video?.title} url={video?.url} />
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

export default Videos;