import { Row, Col, Card } from 'react-bootstrap';
import styles from './style.module.css';
import Button from '../Button';


function CardBS({ heading, subHeading, description }) 
{
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
                    <Button> View Tafseer</Button>
                </div>
            </Card.Body>
        </Card>      
    </>
  )
}

export default CardBS;