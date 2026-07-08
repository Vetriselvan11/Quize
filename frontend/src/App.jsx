import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import UserDashboard from './pages/UserDashboard';
import QuizList from './pages/QuizList';
import QuizAttempt from './pages/QuizAttempt';
import Result from './pages/Result';
import AdminDashboard from './pages/AdminDashboard';
import ManageQuizzes from './pages/ManageQuizzes';
import ManageQuestions from './pages/ManageQuestions';
import AdminUsers from './pages/AdminUsers';
import NotFound from './pages/NotFound';

import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {/* User Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/quizzes" element={<ProtectedRoute><QuizList /></ProtectedRoute>} />
            <Route path="/quiz/:quizId/attempt" element={<ProtectedRoute><QuizAttempt /></ProtectedRoute>} />
            <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/quizzes" element={<AdminRoute><ManageQuizzes /></AdminRoute>} />
            <Route path="/admin/questions/:quizId" element={<AdminRoute><ManageQuestions /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
