import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from "./style.module.css";

function Footer() 
{
    const mailLink = "https://mail.google.com/mail/u/0/#inbox?compose=CllgCJlLWRkCnHRRgQprwTgKwhjqgzflrRDCWThMpQTHbXMtTNQlZjjBQFlPQfNFwkBvPpxclTL";
    return (
        <footer className={`${styles.footerSection}`}>
            <Container>
                <Row>
                    {/* About Section */}
                    <Col md={3} sm={6} className="mb-4 mx-auto">
                        <h5>About Al-Ra’ad</h5>
                        <p> Al-Raad is an Islamic web platform to explore Tafseer, download PDFs, read books, watch videos, and get daily Ayat guidance </p>
                    </Col>

                    {/* Quick Links */}
                    <Col md={3} sm={6} className="mb-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li> <Link to={`/`}> Home  </Link> </li>
                            <li> <Link to={`/about`}> About </Link> </li>
                            <li> <Link to={`/blog`}> Blogs </Link> </li>
                            <li> <Link to={`/contact`}> Contact  </Link></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </Col>

                    {/* Social Media Links */}
                    <Col md={3} sm={6} className="mb-4">
                        <h5>Follow Us</h5>
                        <div className={`${styles.socialIcons}`}>
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaTwitter /></a>
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaLinkedin /></a>
                            <a href={mailLink} target='blank'> <FaEnvelope /> </a>
                        </div>
                    </Col>
                </Row>

                <hr className={`${styles.footerDivider}`} />

                <Row>
                    <Col className="text-center">
                        <p>&copy; {new Date().getFullYear()} Al-Ra’ad. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;