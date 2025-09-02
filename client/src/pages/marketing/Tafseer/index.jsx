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

function Tafseer() 
{
    // States
    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const { loading, setLoading } = useAuth();

    useEffect(() => {
        setLoading(true); // Forcefully enable loader on page load
        let timer;
        if(!isArrayHaveData(data?.docs)) 
        {
            timer = setTimeout(() => setMessage("No Tafseer Found"), 700);
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

    // Fetch tafseer on page load
    useEffect(() => {
        getRequest(`/tafseer?page=${currentPage}&limit=${6}&search=${debouncedSearch}`, false)
        .then(response => setData(response.data))
        .catch(() => setData({ docs:[] }));
    }, [currentPage, debouncedSearch]);

    return (
        <div className={styles.tafseerWrapper}>
            <Animation type="heading">
                <span>
                    {/* Icon */}
                    <div className="icon"> <FaBookOpen size={50} /> </div>
                    {/* Heading */}
                    <h2 className="heroTitle"> Tafseer Al-Qura'an </h2>
                    <hr className='text-secondary' />
                </span>
            </Animation>

            {/* Search */}
            <Row className='mb-2'>
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
                data.docs?.map((tafseer, _) => (
                    <Col xs={12} sm={6} md={6} lg={4} xl={4} key={tafseer?._id} className='mb-3'>
                        <Animation type="card">
                            <CardBS 
                            _id={tafseer?._id}
                            heading={`Surah ${tafseer?.surahName}`} 
                            subHeading={`Ayah: ${tafseer?.ayah}`} 
                            description={tafseer?.tafseer}
                            buttonText="View tafseer"
                            icon={ <FaEye /> }
                            redirectTo={`/tafseer/${tafseer?._id}`} />
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

export default Tafseer;