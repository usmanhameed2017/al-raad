import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCog, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import styles from "./style.module.css";
import { useAuth } from "../../context/auth";

function AdminLayout() {
    const [isOpen, setIsOpen] = useState(true);
    const { user, userLogout } = useAuth();

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
                {/* Admin name */}
                <div className={styles.logo}>
                    <FaUserAlt size={25} />
                    {isOpen && <span> { user?.name } </span>}
                </div>

                <nav className={styles.nav}>
                    {/* Dashboard */}
                    <Link to="/admin/dashboard" className={styles.navItem}>
                        <FaTachometerAlt size={25} /> {isOpen && <span>Dashboard</span>}
                    </Link>

                    {/* Users */}
                    <Link to="/admin/users" className={styles.navItem}>
                        <FaUsers size={25} /> {isOpen && <span>Users</span>}
                    </Link>

                    {/* Settings */}
                    <Link to="/admin/settings" className={styles.navItem}>
                        <FaCog size={25} /> {isOpen && <span>Settings</span>}
                    </Link>

                    {/* Logout */}
                    <Link onClick={userLogout} className={styles.navItem}>
                        <FaSignOutAlt size={25} /> {isOpen && <span>Logout</span>}
                    </Link>
                </nav>

                {/* Toggle Button */}
                <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? "«" : "»"}
                </button>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;