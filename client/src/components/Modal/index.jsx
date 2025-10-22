import { Modal } from 'react-bootstrap';
import styles from './style.module.css';
import { webLogo } from '../../constants';

function ModalBS({ children, showModal, handleCloseModal, modalTitle, modalSize = "md" }) 
{
  return (
        <>
            {/* Modal */}
            <Modal animation backdrop="static" scrollable size={modalSize} show={showModal} onHide={handleCloseModal} className={styles.modal}>
                {/* Modal Header */}
                <Modal.Header closeButton className={styles.modalHeader}>
                    {/* Logo */}
                    <img src={webLogo} alt="Website Logo" className={styles.brandLogo} />

                    {/* Title */}
                    <Modal.Title className="ms-auto">
                        <h2 className={styles.modalTitle}> { modalTitle } </h2>
                    </Modal.Title>
                </Modal.Header>

                {/* Modal Body */}
                <Modal.Body className={styles.modalBody}> { children } </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalBS;