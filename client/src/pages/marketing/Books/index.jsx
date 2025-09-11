import { useState, useEffect, useCallback } from 'react';
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
import useSocket from '../../../hooks/useSocket';

function Books() 
{
    // States
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [reload, setReload] = useState(0);

    // Global state
    const { loading, setLoading } = useAuth();

    // Real time update handler
    const realtimeUpdate = useCallback(() => {
        setReload(prev => prev + 1);
    },[]);
    
    // Listen event
    useSocket("Refresh Book", realtimeUpdate);    

    useEffect(() => {
        setLoading(true); // Enable loader on page load
        let timer;
        if(!isArrayHaveData(data?.docs)) 
        {
            timer = setTimeout(() => setMessage("No Book Found"), 700);
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
    }, [search]);     

    // Fetch book on page load
    useEffect(() => {
        getRequest(`/book?page=${currentPage}&limit=${6}&search=${debouncedSearch}`, false)
        .then(response => setData(response.data))
        .catch(() => setData({ docs:[] }));
    }, [currentPage, debouncedSearch, reload]);

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

            {/* Search */}
            <Row>
                <Col xl="3" lg="4" md="6" sm="12" xs="12" className='ms-auto'>
                    <input type="search" placeholder='Search' className='input'
                    value={search} onChange={ (e) => setSearch(e.target.value) } />
                </Col>
            </Row>            
            
            {/* Cards */}
            <Row className='mt-5'>
                {/* Loader */}
                { loading && ( <Loader size='big' text="Loading" /> ) }
            {
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

export default Books;