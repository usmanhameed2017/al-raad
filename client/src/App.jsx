import { Routes, Route } from "react-router-dom";
import Home from "./pages/marketing/Home";
import Tafseer from "./pages/marketing/Tafseer";
import MarketingLayout from "./layout/MarketingLayout";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";

function App() 
{
  return (
    <>
      <Routes>
        {/* Marketing Layout */}
        <Route path="/" element={ <MarketingLayout /> } >
          <Route index element={ <Home /> } />
          <Route path="home" element={ <Home /> } />
          <Route path="tafseer" element={ <Tafseer /> } />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={ <AdminLayout /> } >
          <Route index element={ <Dashboard /> } />
          <Route path="dashboard" element={ <Dashboard /> } />
          <Route path="settings" element={ <Settings /> } />
        </Route>        
      </Routes>
    </>
  );
}

export default App;