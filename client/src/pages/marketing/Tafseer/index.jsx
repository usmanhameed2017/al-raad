import styles from './style.module.css';
import { motion } from 'framer-motion';
import { FaBookOpen } from 'react-icons/fa';
import { Row, Col, Card } from 'react-bootstrap';
import Button from '../../../components/Button';
import CardBS from '../../../components/Card';

function Tafseer() {
    return (
        <div className={styles.tafseerWrapper}>
            <motion.h1
                className={styles.heroTitle}
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <span className={styles.headingWithIcon}>
                    <motion.div
                        className={styles.icon}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1.1 }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <FaBookOpen size={50} />
                    </motion.div>
                    <h2 className={styles.heroTitle}> Tafseer Al-Qura'an </h2>
                    <hr />
                </span>
            </motion.h1>

            <Row className='mt-5'>
                <Col xs={12} sm={6} md={4} lg={4} xl={4}>

                    {/* <Card className={`shadow ${styles.tafseerCard}`}>
                        <Card.Header className={styles.cardHeader}>
                            Surah Al-Asr
                        </Card.Header>

                        <Card.Body className={styles.cardBody}>
                            <Card.Title className={styles.cardTitle}>Ayah: 02</Card.Title>
                            <Card.Text className={styles.cardText}>
                                Beshak insaan nuksan mein hai — agar woh imaan, achhe amal,
                                sachai aur sabr par na chale.
                            </Card.Text>
                            <div className='d-grid'>
                                <Button>View Tafseer</Button>
                            </div>
                        </Card.Body>
                    </Card> */}

                    <CardBS heading="Surah Al-Asr" subHeading="Ayah: 02" description="Beshak insaan nuksan mein hai — agar woh imaan, achhe amal, sachai aur sabr par na chale." />                    
                    
                </Col>
            </Row>
        </div>
    );
}

export default Tafseer;