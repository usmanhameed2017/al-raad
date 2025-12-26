import { Outlet } from "react-router-dom";
import styles from "./style.module.css";
import Animation from "../../components/Animation";
import Sidebar from "@/components/Sidebar";

function AdminLayout() 
{
    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <Sidebar />

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