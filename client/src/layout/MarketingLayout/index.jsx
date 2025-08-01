import React from 'react';
import { Outlet } from "react-router-dom";
import NavbarBS from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from './style.module.css';

function MarketingLayout() 
{
    return (
        <div className={styles.pageWrapper}>
            <NavbarBS />

            <main className={styles.mainContent}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default MarketingLayout;