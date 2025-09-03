import { useParams, useNavigate } from 'react-router-dom';
import EmailTemplate from '../../../components/EmailTemplate';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/auth';
import { getRequest } from '../../../api/request';
import Loader from '../../../components/Loader';
import { Row, Col } from 'react-bootstrap';
import Animation from '../../../components/Animation';

function ViewMail() 
{
    const { id } = useParams();
    const [mail, setMail] = useState({});
    const [message, setMessage] = useState("");
    const { loading } = useAuth();
    const navigate = useNavigate();

    // For better UX
    useEffect(() => {
        let timer;
        if(!id) timer = setTimeout(() => setMessage("404 - Mail Not Found"), 700);
        return () => clearTimeout(timer);
    },[]);

    // Fetch book on page load
    useEffect(() => {
        getRequest(`/mail/${id}`)
        .then(response => setMail(response.data))
        .catch(() => {
            setMail({});
            navigate("/admin/mails");
        });
    }, [id]);

    return (
        <>
        {/* Loader */}
        { loading && ( <div style={{ marginTop:"200px" }}> <Loader size='big' text="Loading" /> </div> ) } 
        {
            mail?._id ? 
            (
                // Mail
                <Row>
                    <Animation type={`3d`}>
                        <Col>
                            <EmailTemplate name={mail?.name} email={mail?.email} subject={mail?.subject} body={mail?.message} />
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

export default ViewMail;