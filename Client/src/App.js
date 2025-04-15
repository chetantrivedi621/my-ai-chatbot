import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navbar component
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import ChatPage from './pages/ChatPage';
import ProtectedRoute from './components/ProtectedRoute'; // ProtectedRoute component
import LoadingSpinner from './components/LoadingSpinner'; // Fallback spinner for lazy loading
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import LandingPage from './pages/LandingPage';

// Lazy load pages for better performance
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const ChatPage = React.lazy(() => import('./pages/ChatPage'));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ChatProvider>
          <Router>
          {/* Navbar at the top of every page */}
          <Navbar />

          {/* Suspense for lazy-loaded routes */}
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Route for Chat Page */}
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
          </Router>
        </ChatProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
