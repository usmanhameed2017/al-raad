import { Outlet } from "react-router-dom";
import styles from "./style.module.css";
import SideBar from "../../components/SideBar";

function AdminLayout() 
{
    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;