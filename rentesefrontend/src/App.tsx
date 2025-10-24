import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';
import Layout from './component/Layout';
import LoginForm from './component/auth/LoginForm';
import RegisterForm from './component/auth/RegisterForm';
import TenantDashboard from './pages/TenantDashboard';
import LandlordDashboard from './pages/LandlordDashboard';
import { useAuth } from './contexts/AuthContext';
import BrowseProperty from './pages/BrowseProperty';

function App() {
  const DashboardComponent = () => {
    const { user } = useAuth();
    return user?.role === 'LANDLORD' ? <LandlordDashboard /> : <TenantDashboard />;
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <DashboardComponent />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            {/* Placeholder routes for future pages */}
            <Route 
              path="/properties" 
              element={
                <ProtectedRoute requiredRole="LANDLORD">
                  <Layout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900">My Properties</h2>
                      <p className="text-gray-600 mt-2">Property management coming soon...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/browse" 
              element={
                <ProtectedRoute requiredRole="TENANT">
                  <Layout>
                    <BrowseProperty />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/bookings" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900">Bookings</h2>
                      <p className="text-gray-600 mt-2">Booking management coming soon...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/payments" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900">Payments</h2>
                      <p className="text-gray-600 mt-2">Payment management coming soon...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } 
            />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;