import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from "./context/auth";
import Loader from "./components/Loader";

// Marketing Pages
const Home = lazy(() => import("./pages/marketing/Home"));
const About = lazy(() => import("./pages/marketing/About"));
const Contact = lazy(() => import("./pages/marketing/Contact"));
const Tafseer = lazy(() => import("./pages/marketing/Tafseer"));
const ViewTafseer = lazy(() => import("./pages/marketing/ViewTafseer"));
const Books = lazy(() => import("./pages/marketing/Books"));
const ViewBook = lazy(() => import("./pages/marketing/ViewBook"));
const Audios = lazy(() => import("./pages/marketing/Audios"));
const Settings = lazy(() => import("./pages/marketing/Settings"));
const Login = lazy(() => import("./pages/marketing/Login"));
const AccountActivation = lazy(() => import("./pages/marketing/Login/AccountActivation"));

// Admin Pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const BooksAdmin = lazy(() => import("./pages/admin/Books"));
const TafseerAdmin = lazy(() => import("./pages/admin/Tafseer"));
const AudiosAdmin = lazy(() => import("./pages/admin/Audios"));
const Users = lazy(() => import("./pages/admin/Users"));
const Mails = lazy(() => import("./pages/admin/Mails"));
const ViewMail = lazy(() => import("./pages/admin/ViewMail"));
const SettingsAdmin = lazy(() => import("./pages/admin/Settings"));

// Security Processing Pages
const ForgotPassword = lazy(() => import("./pages/security/ForgotPassword"));
const VerifyResetCode = lazy(() => import("./pages/security/VerifyResetCode"));
const ResetPassword = lazy(() => import("./pages/security/ResetPassword"));
const ProtectedRoute = lazy(() => import("./pages/security/ProtectedRoutes"));

// Layouts
import MarketingLayout from "./layout/MarketingLayout";
import AdminLayout from "./layout/AdminLayout";
import AuthLayout from "./layout/AuthLayout";

function App() 
{
  return (
    <>
      <AuthProvider>
        {/* Lazy Load */}
        <Suspense fallback={<Loader text={`Loading`} size="medium" />}>
          <Routes>
            {/* Marketing Layout */}
            <Route path="/" element={ <MarketingLayout /> } >
              <Route path="login" element={ <Login /> } />
              <Route index element={ <Home /> } />
              <Route path="home" element={ <Home /> } />
              <Route path="about" element={ <About /> } />
              <Route path="contact" element={ <Contact /> } />

              {/* Protected Route */}
              <Route element={ <ProtectedRoute roles={["Admin", "User"]} /> }>
                <Route path="tafseer" element={ <Tafseer /> } /> 
                <Route path="tafseer/:id" element={ <ViewTafseer /> } />
                <Route path="settings" element={ <Settings /> } />
              </Route>

              <Route path="books" element={ <Books /> } />
              <Route path="books/:id" element={ <ViewBook /> } />
              <Route path="audios" element={ <Audios /> } />
              <Route path="account/activation" element={ <AccountActivation /> } />

              {/* Security paths */} 
              <Route path="security/forgotPassword" element={ <ForgotPassword /> } />
              <Route path="security/verifyResetCode" element={ <VerifyResetCode /> } />
              <Route path="security/resetPassword" element={ <ResetPassword /> } />
            </Route>

            {/* Protected Routes */}
            <Route element={ <ProtectedRoute roles={["Admin"]} /> }>
              {/* Admin Layout */}
              <Route path="/admin" element={ <AdminLayout /> } >
                <Route index element={ <Dashboard /> } />
                <Route path="dashboard" element={ <Dashboard /> } />
                <Route path="books" element={ <BooksAdmin /> } />
                <Route path="tafseer" element={ <TafseerAdmin /> } />
                <Route path="audios" element={ <AudiosAdmin /> } />
                <Route path="mails" element={ <Mails /> } />
                <Route path="mails/:id" element={ <ViewMail /> } />
                <Route path="Users" element={ <Users /> } />
                <Route path="settings" element={ <SettingsAdmin /> } />
              </Route> 
            </Route>

            {/* Auth Layout */}
            <Route path="/auth" element={ <AuthLayout /> }>
              <Route index element={ <AdminLogin /> } />
              <Route path="admin" element={ <AdminLogin /> } />
            </Route>          
          </Routes>
        </Suspense>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;