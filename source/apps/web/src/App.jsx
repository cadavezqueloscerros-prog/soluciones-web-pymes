import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage';
import UserPanel from './pages/UserPanel';
import AvisoPrivacidadPage from './pages/AvisoPrivacidadPage';
import TerminosServicioPage from './pages/TerminosServicioPage';
import CookieConsent from './components/CookieConsent';

function App() {
    return (
        <Router>
            <AuthProvider>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registro" element={<SignupPage />} />
                    <Route path="/panel" element={<UserPanel />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/aviso-privacidad" element={<AvisoPrivacidadPage />} />
                    <Route path="/terminos-servicio" element={<TerminosServicioPage />} />
                </Routes>
                <CookieConsent />
            </AuthProvider>
        </Router>
    );
}

export default App;
