import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { useAuth } from './hooks/useAuth';
import { NotificationProvider } from './hooks/useNotifications';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { Dashboard } from './pages/Dashboard';
import { ContentCreator } from './pages/ContentCreator';
import { ContentCalendar } from './pages/ContentCalendar';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Team } from './pages/Team';
import { Posts } from './pages/Posts';
import { SocialConnections } from './pages/SocialConnections';
import { Billing } from './pages/Billing';
import { Notifications } from './pages/Notifications';
import { Landing } from './pages/Landing';
import { Pricing } from './pages/Pricing';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { VerifyEmail } from './pages/auth/VerifyEmail';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <NotificationProvider>
      <Routes>
        {/* Landing page as the default route */}
        <Route path="/" element={<Landing />} />
        
        {/* Public Routes */}
        <Route path="/pricing" element={<Pricing />} />
        
        {/* Auth Routes */}
        <Route path="/auth/*" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>

        {/* Protected Dashboard Routes */}
        {isAuthenticated ? (
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="create" element={<ContentCreator />} />
            <Route path="posts" element={<Posts />} />
            <Route path="calendar" element={<ContentCalendar />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="social-connections" element={<SocialConnections />} />
            <Route path="team" element={<Team />} />
            <Route path="billing" element={<Billing />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        ) : (
          // Redirect unauthenticated users trying to access dashboard to login
          <Route path="/dashboard/*" element={<Navigate to="/auth/login" replace />} />
        )}

        {/* Catch all route - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </NotificationProvider>
  );
}

export default App;