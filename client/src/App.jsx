import { Routes, Route } from "react-router-dom";
import Home from "./pages/marketing/Home";
import Tafseer from "./pages/marketing/Tafseer";
import MarketingLayout from "./layout/MarketingLayout";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import About from "./pages/marketing/About";
import Books from "./pages/marketing/Books";
import Videos from "./pages/marketing/Videos";
import Login from "./pages/marketing/Login";
import AuthProvider from "./context/auth";
import ProtectedRoute from "./pages/security/ProtectedRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountActivation from "./pages/marketing/Login/AccountActivation";
import Contact from "./pages/marketing/Contact";
import ViewTafseer from "./pages/marketing/ViewTafseer";

function App() 
{
  return (
    <>
      <AuthProvider>
        <Routes>

          {/* Marketing Layout */}
          <Route path="/" element={ <MarketingLayout /> } >
            <Route index element={ <Home /> } />
            <Route path="home" element={ <Home /> } />
            <Route path="about" element={ <About /> } />
            <Route path="contact" element={ <Contact /> } />
            <Route path="tafseer" element={ <Tafseer /> } /> 
            <Route path="tafseer/:id" element={ <ViewTafseer /> } />  
            <Route path="books" element={ <Books /> } />
            <Route path="videos" element={ <Videos /> } />
            <Route path="login" element={ <Login /> } />
            <Route path="accountActivation" element={ <AccountActivation /> } />
          </Route>

          {/* Protected Routes */}
          <Route element={ <ProtectedRoute/> }>

            {/* Admin Layout */}
            <Route path="/admin" element={ <AdminLayout /> } >
              <Route index element={ <Dashboard /> } />
              <Route path="dashboard" element={ <Dashboard /> } />
              <Route path="settings" element={ <Settings /> } />
            </Route> 
            
          </Route>
       
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;