import { useState } from "react";
import styles from "./style.module.css";
import { FaTachometerAlt, FaUsers, FaCog, FaSignOutAlt, FaUserAlt, FaBook, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

function SideBar() 
{
    const [isOpen, setIsOpen] = useState(true);
    const { user, adminLogout } = useAuth();
    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            {/* Admin name */}
            <div className={styles.logo}>
                <FaUserAlt size={25} />
                {isOpen && <span> { user?.name } </span>}
            </div>

            <nav className={styles.nav}>
                {/* Dashboard */}
                <Link to="/admin/dashboard" className={styles.navItem}>
                    <FaTachometerAlt size={25} /> {isOpen && <span> Dashboard </span>}
                </Link>

                {/* Tafseer */}
                <Link to="/admin/tafseer" className={styles.navItem}>
                    <FaBookOpen size={25} /> {isOpen && <span> Tafseer </span>}
                </Link>                 

                {/* Books */}
                <Link to="/admin/books" className={styles.navItem}>
                    <FaBook size={25} /> {isOpen && <span> Books </span>}
                </Link>                    

                {/* Users */}
                <Link to="/admin/users" className={styles.navItem}>
                    <FaUsers size={25} /> {isOpen && <span> Users </span>}
                </Link>

                {/* Settings */}
                <Link to="/admin/settings" className={styles.navItem}>
                    <FaCog size={25} /> {isOpen && <span> Settings </span>}
                </Link>

                {/* Logout */}
                <Link onClick={adminLogout} className={styles.navItem}>
                    <FaSignOutAlt size={25} /> {isOpen && <span> Logout </span>}
                </Link>
            </nav>

            {/* Toggle Button */}
            <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "«" : "»"}
            </button>
        </aside>
    )
}

export default SideBar;