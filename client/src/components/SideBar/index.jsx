import { useState } from "react";
import styles from "./style.module.css";
import { FaTachometerAlt, FaUsers, FaSignOutAlt, FaUserAlt, FaBook, FaBookOpen, FaPlayCircle, FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

function Sidebar() 
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
                <NavLink to="/admin/dashboard" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`} title={!isOpen ? "Dashboard" : ""}>
                    <FaTachometerAlt size={25} /> {isOpen && <span> Dashboard </span>}
                </NavLink>

                {/* Tafseer */}
                <NavLink to="/admin/tafseer" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`} title={!isOpen ? "Tafseer" : ""}>
                    <FaBookOpen size={25} /> {isOpen && <span> Tafseer </span>}
                </NavLink>

                {/* Books */}
                <NavLink to="/admin/books" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`} title={!isOpen ? "Books" : ""}>
                    <FaBook size={25} /> {isOpen && <span> Books </span>}
                </NavLink>

                {/* Audio Lectures */}
                <NavLink to="/admin/audios" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`} title={!isOpen ? "Audio lectures" : ""}>
                    <FaPlayCircle size={25} /> {isOpen && <span> Lectures </span>}
                </NavLink> 

                {/* Mails */}
                <NavLink to="/admin/mails" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`} title={!isOpen ? "Mails" : ""}>
                    <FaEnvelope size={25} /> {isOpen && <span> Mails </span>}
                </NavLink>                                  

                {/* Users */}
                <NavLink to="/admin/users" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`} title={!isOpen ? "Users" : ""}>
                    <FaUsers size={25} /> {isOpen && <span> Users </span>}
                </NavLink>

                {/* Logout */}
                <NavLink onClick={adminLogout} className={styles.navItem} title={!isOpen ? "Logout" : ""}>
                    <FaSignOutAlt size={25} /> {isOpen && <span> Logout </span>}
                </NavLink>
            </nav>

            {/* Toggle Button */}
            <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "«" : "»"}
            </button>
        </aside>
    );
}

export default Sidebar;