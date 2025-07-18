import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt, FaHome, FaInfoCircle, FaEnvelope, FaBookOpen, FaBookReader, FaVideo, FaCog, FaSignOutAlt, FaCaretDown } from "react-icons/fa";
import styles from "./style.module.css";
import { getUser } from "../../constants";
import { useAuth } from "../../context/auth";

function Navbar() 
{
    const user = getUser();
    const { userLogout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        setDropdownOpen(false); // close dropdown first
        await userLogout();     // wait for logout process to complete
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) 
            {
                setDropdownOpen(false);
            }

            if(user)
            {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>Al-Ra’ad</div>

            <div className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
                <Link to="/"> <FaHome size={20} /> Home </Link>
                <Link to="/about"> <FaInfoCircle size={20} /> About </Link>
                <Link to="/contact"> <FaEnvelope size={20} /> Contact </Link>
                <Link to="/tafseer"> <FaBookOpen size={20} /> Tafseer </Link>
                <Link to="/books"> <FaBookReader size={20} /> Books </Link>
                <Link to="/videos"> <FaVideo size={20} /> Videos </Link>

                {
                    user ? 
                    (
                        <div className={styles.userDropdown} ref={dropdownRef}>
                            <div className={styles.userBtn} onClick={() => setDropdownOpen(!dropdownOpen)}> 
                                <FaUserAlt style={{ marginRight: "5px" }} /> {user?.name}
                                <FaCaretDown style={{ marginLeft: "5px" }} />
                            </div>

                        {
                            dropdownOpen && 
                            (
                                <div className={styles.dropdownMenu}>
                                    <Link to="/settings" onClick={() => setDropdownOpen(false)}>
                                    <FaCog style={{ marginRight: "5px" }} /> Settings
                                    </Link>
                                    <div onClick={ handleLogout }>
                                        <FaSignOutAlt style={{ marginRight: "5px" }} /> Logout
                                    </div>
                                </div>
                            )
                        }
                        </div>
                    ) 
                    : 
                    (
                        <Link to="/login">
                            <FaUserAlt style={{ marginRight: "5px" }} /> Signin/Signup
                        </Link>
                    )
                }
            </div>

            <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                <span></span><span></span><span></span>
            </div>
        </nav>
    );
}

export default Navbar;