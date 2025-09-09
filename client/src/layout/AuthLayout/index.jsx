import { Outlet } from "react-router-dom";
import Animation from "../../components/Animation";

function AuthLayout() 
{
    return (
        <Animation type="3d">
            <Outlet />
        </Animation>
    );
}

export default AuthLayout;