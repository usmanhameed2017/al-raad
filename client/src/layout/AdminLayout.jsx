import React from 'react';
import { Outlet } from "react-router-dom";

function AdminLayout() 
{
    return (
        <div>
            <h2> Sidebar </h2>
            <Outlet />
        </div>
    );
}

export default AdminLayout;