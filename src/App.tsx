import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Campaigns from "./pages/Campaings/Campaigns";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { Helmet } from "react-helmet-async";
import Dashboard from "./pages/Dashboard/Dashboard";
import UsersGroups from "./pages/UsersGroups/UsersGroups";
import EmailTemplates from "./pages/EmailTemplates/EmailTemplates";
import ForgotPassword from "./components/auth/ForgotPassword";
import SendingProfiles from "./pages/SendingProfiles/SendingProfiles"

export default function App() {
  return (
    <>
      <Helmet>
        <title>Awarenix - i3</title>
      </Helmet>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute/>}>
            <Route element={<AppLayout />}>
              <Route index path="/dashboard" element={<Dashboard />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/users-groups" element={<UsersGroups/>} />
              <Route path="/email-templates" element={<EmailTemplates />} />
              <Route path="/sending-profiles" element={<SendingProfiles />} />
            </Route>
          </Route>

          {/* Auth Layout */}
          <Route path="/" element={<SignIn />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/reset-password" element={<ForgotPassword />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
