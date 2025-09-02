import { useLocation } from 'react-router-dom';
import EmailTemplate from '../../../components/EmailTemplate';

function ViewMail() 
{
    const { data } = useLocation().state;
    const { name = "", email = "", subject = "", message = "" } = data;
    return (
        <>
            <EmailTemplate name={name} email={email} subject={subject} body={message} />
        </>
    );
}

export default ViewMail;