import { Outlet } from "react-router-dom";
import styles from "./style.module.css";
import SideBar from "../../components/SideBar";
import Animation from "../../components/Animation";

function AdminLayout() 
{
    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <main className={styles.main}>
                <Animation type="page">
                    <Outlet />
                </Animation>
            </main>
        </div>
    );
}

export default AdminLayout;