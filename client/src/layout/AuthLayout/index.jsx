import { Outlet } from "react-router-dom";
import styles from "./style.module.css";
import Animation from "../../components/Animation";

function AuthLayout() 
{
    return (
        <div className={styles.pageWrapper}>
            <main className={styles.mainContent}>
                <Animation type="page">
                    <Outlet />
                </Animation>
            </main>
        </div>
    );
}

export default AuthLayout;