import { Row, Col, Card } from 'react-bootstrap';
import styles from './style.module.css';
import Button from '../Button';
import { useNavigate } from 'react-router-dom'


function CardBS({ _id, heading, subHeading, description }) 
{
    const navigate = useNavigate();
    return (
        <>
            <Card className={`shadow ${styles.card}`}>
                <Card.Header className={styles.cardHeader}>
                    { heading }
                </Card.Header>

                <Card.Body className={styles.cardBody}>
                    <Card.Title className={styles.cardTitle}> { subHeading } </Card.Title>
                    <Card.Text className={styles.cardText}>
                        { 
                            description.length > 90 ? <> { description.substring(0, 90) }... </> : description
                        }
                    </Card.Text>
                    <div className='d-grid'>
                        <Button type="button" onClick={ () => navigate(`/tafseer/${_id}`) }> View Tafseer</Button>
                    </div>
                </Card.Body>
            </Card>      
        </>
    );
}

export default CardBS;