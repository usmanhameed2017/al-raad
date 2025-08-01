import { useState, useEffect } from 'react';
import styles from './style.module.css';
import { motion } from 'framer-motion';
import { FaBookOpen } from 'react-icons/fa';
import { Row, Col } from 'react-bootstrap';
import CardBS from '../../../components/Card';
import { fetchAllTafseers } from '../../../api/tafseer';
import { useAuth } from '../../../context/auth';
import Loading from '../../../components/Loader';
import { showError } from '../../../utils/toasterMessage';

function Tafseer() 
{
    const [data, setData] = useState({ docs:[] });
    const [currentPage, setCurrentPage] = useState(1);

    const { isLoading, setLoading } = useAuth();

    // Fetch tafseer on page load
    useEffect(() => {
        setLoading(true);
        fetchAllTafseers(currentPage)
        .then(response => {
            setLoading(false);
            setData(response);
        })
        .catch(error => {
            setLoading(false);
            setData({ docs:[] });
            showError(error)
        });
    }, [currentPage]);

    console.log("Data", data);

    return (
        <div className={styles.tafseerWrapper}>
            {/* Header */}
            <motion.h1
                className={styles.heroTitle}
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}>

                <span className={styles.headingWithIcon}>

                    <motion.div
                        className={styles.icon}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1.1 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        viewport={{ once: true }}>
                            <FaBookOpen size={50} />
                    </motion.div>
                    <h2 className={styles.heroTitle}> Tafseer Al-Qura'an </h2>
                    <hr className='text-secondary' />
                </span>
            </motion.h1>

            {/* Cards */}
            <Row className='mt-5'>
            {
                isLoading ? (  <Loading text="Loading" /> ) :
                data.docs && Array.isArray(data.docs) && data.docs.length > 0 ?
                data.docs.map((tafseer, _) => (
                    <Col xs={12} sm={6} md={4} lg={4} xl={4} key={tafseer?._id}>
                        <CardBS 
                        _id={tafseer?._id}
                        heading={tafseer?.surahName} 
                        subHeading={tafseer?.ayah} 
                        description={tafseer?.tafseer} />                    
                    </Col>
                ))
                :
                <h2 className='fw-bold textTheme'> No Tafseer Found </h2>
            }
            </Row>
        </div>
    );
}

export default Tafseer;