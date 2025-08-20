import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import { Row, Col } from 'react-bootstrap';
import { useAuth } from '../../../context/auth';
import { showError } from '../../../utils/toasterMessage';
import Loader from '../../../components/Loader';
import { getTime } from '../../../utils/getTime';
import Animation from '../../../components/Animation';
import { getRequest } from '../../../api/request';

function ViewTafseer() 
{
    const { id } = useParams();
    const [tafseer, setTafseer] = useState({});
    const { isLoading, setLoading } = useAuth();

    // Fetch tafseer on page load
    useEffect(() => {
        setLoading(true);
        getRequest(`/tafseer/${id}`)
        .then(response => {
            setTafseer(response.data);
        })
        .catch(error => {
            showError(error.message);
        })
        .finally(() => setLoading(false));
    }, [id]);

    return (
        <div className={styles.tafseerContainer}>
        {
            isLoading === false ? 
                tafseer?._id ?
                (
                    <>
                        {/* Surah & Ayat */}
                        <Row>
                            <Animation type="heading">
                                <Col>
                                    <h2 className={styles.surahName}> {tafseer?.surahName} </h2>
                                    <h4 className='text-center p-1' style={{ letterSpacing:"4px" }}> ({ tafseer?.ayah }) </h4>
                                    <hr />
                                </Col>                                
                            </Animation>
                        </Row>

                        {/* Tafseer */}
                        <Row className="mt-3">
                            <Animation type="normal">
                                <Col>
                                    <p className={styles.tafseerText}> {tafseer?.tafseer} </p>
                                </Col>                                
                            </Animation>
                        </Row> 

                        {/* Uploaded Date */}
                        <Row className='mt-5'>
                            <Animation type="normal">
                                <Col md={{ span:"3", offset:"9" }}> 
                                    <p className='text-secondary'> Posted at: { getTime(tafseer?.createdAt) } </p>
                                    <p className='text-secondary'> Language: { tafseer?.language } </p>
                                </Col>                                
                            </Animation>
                        </Row>
                    </>                    
                )
                :
                (
                    <Row className="mt-3">
                        <Col>
                            <h1 className='textTheme fw-bold text-center'> 404 - Tafseer Not Found </h1>
                        </Col>
                    </Row>   
                ) 
            :
            (
                <>
                    <Row style={{ marginTop:"200px" }}>
                        <Col> <Loader text="Loading" /> </Col>
                    </Row>
                </>
            )
        }
        </div>
    );
}

export default ViewTafseer;