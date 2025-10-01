import { useState, useEffect, useCallback } from 'react';
import styles from './style.module.css';
import { FaVideo } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import { useAuth } from '../../../context/auth';
import Loader from '../../../components/Loader';
import ServerSidePagination from '../../../components/Pagination';
import Animation from '../../../components/Animation';
import VideoCard from '../../../components/VideoCard';
import { isArrayHaveData } from '../../../constants';
import useSocket from '../../../hooks/useSocket';
import { addRealTime, deleteRealTime, updateRealTime } from '../../../utils/realTimeHelpers';
import api from '../../../service/axios';

function Videos() 
{
  // States
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Global state
  const { loading, setLoading } = useAuth();

  // Helpers
  const handleAdd = useCallback(addRealTime(setData), [setData]);
  const handleUpdate = useCallback(updateRealTime(setData), [setData]);
  const handleDelete = useCallback(deleteRealTime(setData, setCurrentPage), [setData]);

  // Listen for real time updates
  useSocket("VideoAdded", handleAdd);
  useSocket("VideoUpdated", handleUpdate);
  useSocket("VideoDeleted", handleDelete);

  useEffect(() => {
    setLoading(true); // Forcefully enable loader on page load
    let timer;
    if(!isArrayHaveData(data?.docs)) 
    {
      timer = setTimeout(() => setMessage("No Video Found"), 700);
    }
    return () => clearTimeout(timer);
  },[]);

  // Debounce technique
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  },[search]);   

  // Fetch video on page load
  useEffect(() => {
    api.get(`/video?page=${currentPage}&limit=${6}&search=${debouncedSearch}`, false)
    .then(response => setData(response.data))
    .catch(() => setData({ docs:[] }));
  },[currentPage, debouncedSearch]);

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

        {/* Search */}
        <Row>
          <Col xl="3" lg="4" md="6" sm="12" xs="12" className='ms-auto'>
            <input type="search" placeholder='Search' className='input'
            value={search} onChange={ (e) => setSearch(e.target.value) } />
          </Col>
        </Row>        

        {/* Videos */}
        <Row className='mt-5'>
          {/* Loader */}
          { loading && ( <Loader size='big' text="Loading" /> ) }      
        {
          isArrayHaveData(data.docs) ?
          data.docs?.map((video, _) => (
            <Col xs={12} sm={12} md={6} lg={4} xl={4} key={video?._id} className='mb-3'>
              <VideoCard title={video?.title} url={video?.url} />
            </Col>                     
          ))
          :
          <Col>
            {/* No data found */}
            {!loading && <h2 className='fw-bold textTheme'> { message } </h2> }
          </Col>
        }
        </Row>

        {/* Pagination */}
        <Row>
          <Col className="d-flex justify-content-center">
          {!loading && isArrayHaveData(data.docs) && (
            <ServerSidePagination data={data} setCurrentPage={setCurrentPage} />                    
          )}
          </Col>
        </Row>
      </div>
    );
}

export default Videos;