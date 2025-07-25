import React from 'react';
import { Outlet } from "react-router-dom";
import NavbarBS from '../components/Navbar';
import Footer from '../components/Footer';

function MarketingLayout() 
{
    return (
        <div>
            <NavbarBS />
            <Outlet />
            <Footer />
        </div>
    );
}

export default MarketingLayout;