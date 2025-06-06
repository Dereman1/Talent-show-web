// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';
import PostPage from './pages/PostPage';
import RankPage from './pages/RankPage';
import Messenger from './pages/Messenger';
import AdminDashboard from './pages/AdminDashboard';
import JudgeDashboard from './pages/JudgeDashboard';
import TopRankedPost from './pages/TopRankedPost';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyOtp from './pages/VerifyOtp';
import ProtectedRoute from './components/ProtectedRoute';
import NotificationsPage from './pages/NotificationsPage';
import ReportedPosts from './pages/ReportedPosts';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes (no layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

 <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
  </Route>
          {/* Protected routes (require login) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
          
              <Route path="profile/:id?" element={<Profile />} />
              <Route path="post/:id" element={<PostDetail />} />
              <Route path="messenger" element={<Messenger />} />
              <Route path="/rankings" element={<RankPage />} />
              <Route path="/top-ranked" element={<TopRankedPost />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>
          </Route>

          {/* Role-protected routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/" element={<Layout />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="/reported-posts" element={<ReportedPosts />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['visual_judge', 'literal_judge', 'vocal_judge']} />}>
            <Route path="/" element={<Layout />}>
              <Route path="judge" element={<JudgeDashboard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
