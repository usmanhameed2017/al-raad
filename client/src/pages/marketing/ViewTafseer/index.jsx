import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './style.module.css';
import { Row, Col } from 'react-bootstrap';
import { getTime } from '../../../utils/getTime';
import Animation from '../../../components/Animation';
import { FaBookOpen, FaPenAlt } from 'react-icons/fa'
import useSocket from '../../../hooks/useSocket';
import { changesRealTime } from '../../../utils/realTimeHelpers';
import api from '../../../service/axios';

function ViewTafseer() 
{
    const { id } = useParams();
    const [tafseer, setTafseer] = useState({});

    // Navigator
    const navigate = useNavigate();

    // Listen for real time changes
    useSocket("TafseerUpdated", useCallback(changesRealTime(setTafseer, id), [setTafseer]));

    // Fetch tafseer on page load
    useEffect(() => {
        api.get({ url:`/tafseer/${id}`, enableErrorMessage:false })
        .then(response => setTafseer(response.data))
        .catch(() => {
            setTafseer({});
            navigate("/tafseer");
        });
    }, [id]);

    return (
        <>
            {tafseer?._id && (
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
            )}          
        </>
    );
}

export default ViewTafseer;