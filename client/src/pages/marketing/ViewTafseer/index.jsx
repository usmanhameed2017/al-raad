import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './style.module.css';
import { Row, Col } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import { getTime } from '../../../utils/getTime';
import Animation from '../../../components/Animation';
import { getRequest } from '../../../api/request';
import { useAuth } from '../../../context/auth';
import { FaBookOpen, FaPenAlt } from 'react-icons/fa'

function ViewTafseer() 
{
    const { id } = useParams();
    const [tafseer, setTafseer] = useState({});
    const [message, setMessage] = useState("");
    const { loading } = useAuth();
    const navigate = useNavigate();

    // For better UX
    useEffect(() => {
        let timer;
        if(!id) timer = setTimeout(() => setMessage("404 - Tafseer Not Found"), 700);
        return () => clearTimeout(timer);
    },[]);

    // Fetch tafseer on page load
    useEffect(() => {
        getRequest(`/tafseer/${id}`)
        .then(response => setTafseer(response.data))
        .catch(() => {
            setTafseer({});
            navigate("/tafseer");
        });
    }, [id]);

    return (
        <>
            {/* Loader */}
            { loading && ( <div style={{ marginTop:"200px" }}> <Loader size='big' text="Loading" /> </div> ) } 
            {
                tafseer?._id ? 
                (
                    // Mail
                    <Row>
                        <Animation type={`3d`}>
                            <Col>
                                {/* Wrapper */}
                                <div className={styles.wrapper}>
                                
                                    {/* Header */}
                                    <div className={styles.header}>
                                        <h1 className={styles.title}> <FaBookOpen size={50} /> Tafseer Al-Qura’an</h1>
                                        <p className={styles.subtitle}>
                                            This Tafseer is provided for learning and reflection purposes. <br/>
                                            May it help you understand the Qur’an better.
                                        </p>
                                    </div>

                                    {/* Details */}
                                    <div className={styles.detailBox}>
                                        <h2 className={styles.sectionTitle}> <FaPenAlt /> Tafseer Details </h2>
                                        
                                        <p className={styles.detail}>
                                            <strong className={styles.highlight}>Surah Name:</strong> { tafseer?.surahName }
                                        </p>
                                        <p className={styles.detail}>
                                            <strong className={styles.highlight}>Ayah Reference:</strong> { tafseer?.ayah }
                                        </p>
                                        <p className={styles.detail}>
                                            <strong className={styles.highlight}>Posted at:</strong> { getTime(tafseer?.createdAt) } 
                                        </p>
                                    </div>

                                    {/* Tafseer */}
                                    <div className={styles.messageBox}>
                                        <h2 className={styles.sectionTitle}> <FaBookOpen /> Tafseer</h2>
                                        <p className={styles.message}> { tafseer?.tafseer } </p>
                                    </div>

                                    {/* Footer */}
                                    <hr className={styles.divider} />
                                    <p className={styles.footer}>
                                        Tafseer brings us closer to the true message of the Qur’an.
                                        Reflect and share the knowledge.
                                    </p>
                                </div>  
                            </Col>                        
                        </Animation>
                    </Row>
                )
                :
                ( 
                    // No mail found
                    <Row>
                        <Col>
                            <h1 className='textTheme fw-bold text-center mt-5'> { message } </h1> 
                        </Col>
                    </Row>
                )
            }          
        </>
    );
}

export default ViewTafseer;