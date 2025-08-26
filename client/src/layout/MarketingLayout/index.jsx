import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import NavbarBS from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './style.module.css';
import { useLocation } from "react-router-dom";
import Animation from '../../components/Animation';

function MarketingLayout() 
{
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior:"smooth" });
    }, [pathname]);

    return (
        <div className={styles.pageWrapper}>
            <NavbarBS />

            <main className={styles.mainContent}>
                <Animation type="page">
                    <Outlet />
                </Animation>
            </main>

            <Footer />
        </div>
    );
}

export default MarketingLayout;