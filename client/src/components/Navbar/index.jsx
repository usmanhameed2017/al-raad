import { useState } from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { FaUserAlt, FaHome, FaInfoCircle, FaEnvelopeOpenText, FaBookOpen, FaBook, FaVideo } from "react-icons/fa";

function Navbar() 
{
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}> Al-Ra’ad </div>
            <div className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
                <Link to="/"> <FaHome size={25} style={{ marginRight: "5px" }} /> Home </Link>
                <Link to="/about"> <FaInfoCircle size={25} style={{ marginRight: "5px" }} /> About </Link>
                <Link to="/contact"> <FaEnvelopeOpenText size={25} style={{ marginRight: "5px" }} /> Contact </Link>
                <Link to="/tafseer"> <FaBookOpen size={25} style={{ marginRight: "5px" }} /> Tafseer </Link>
                <Link to="/books"> <FaBook size={25} style={{ marginRight: "5px" }} /> Books </Link>
                <Link to="/videos"> <FaVideo size={25} style={{ marginRight: "5px" }} /> Videos </Link>
                <Link to="/login"> <FaUserAlt style={{ marginRight: "5px" }} /> Signin/Signup </Link>
            </div>
            <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                <span></span><span></span><span></span>
            </div>
        </nav>
    );
}

export default Navbar;