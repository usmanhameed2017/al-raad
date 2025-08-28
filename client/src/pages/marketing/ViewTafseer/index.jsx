import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import { Row, Col } from 'react-bootstrap';
import Loader from '../../../components/Loader';
import { getTime } from '../../../utils/getTime';
import Animation from '../../../components/Animation';
import { getRequest } from '../../../api/request';
import { useAuth } from '../../../context/auth';

function ViewTafseer() 
{
    const { id } = useParams();
    const [tafseer, setTafseer] = useState({});
    const [message, setMessage] = useState("");
    const { loading } = useAuth();

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
        .catch(() => setTafseer({}));
    }, [id]);

    return (
        <div className={styles.tafseerContainer}>
        {/* Loader */}
        { loading && ( <div style={{ marginTop:"100px" }}> <Loader size='big' text="Loading" /> </div> ) } 

        {tafseer?._id ? (
            <>
                {/* Surah & Ayat */}
                <Row>
                    <Animation type="heading">
                        <Col>
                            <h2 className={styles.surahName}> Surah {tafseer?.surahName} </h2>
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
                    <h1 className='textTheme fw-bold text-center'> { message } </h1>
                </Col>
            </Row>   
        )}
        </div>
    );
}

export default ViewTafseer;