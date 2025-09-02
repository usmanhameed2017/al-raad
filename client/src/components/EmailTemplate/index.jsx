import styles from './style.module.css';

function EmailTemplate({ name, email, subject, body }) 
{
    return (
        <div className={styles.wrapper}>
        
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>📬 Contact Form Submission</h1>
                <p className={styles.subtitle}>
                    You have received a new inquiry from a user.
                </p>
            </div>

            {/* User Details */}
            <div className={styles.userBox}>
                <h2 className={styles.sectionTitle}>👤 User Details</h2>
                
                <p className={styles.detail}>
                    <strong className={styles.highlight}>Name:</strong> { name }
                </p>
                <p className={styles.detail}>
                    <strong className={styles.highlight}>Email:</strong> { email }
                </p>
                <p className={styles.detail}>
                    <strong className={styles.highlight}>Subject:</strong> { subject }
                </p>
            </div>

            {/* Message */}
            <div className={styles.messageBox}>
                <h2 className={styles.sectionTitle}>💬 Message</h2>
                <p className={styles.message}>
                    { body }
                </p>
            </div>

            {/* Footer */}
            <hr className={styles.divider} />
            <p className={styles.footer}>
                This email was generated from the Contact Us form. <br />
                Reply directly to this email to connect with 
                <span className={styles.highlight}> { name } </span>.
            </p>
        </div>
    );
}

export default EmailTemplate;