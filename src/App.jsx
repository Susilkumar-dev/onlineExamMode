import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';
import StudentLayout from './layouts/StudentLayout';
import MainLayout from './layouts/MainLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';
import RoleTest from './pages/test/RoleTest';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Courses from './pages/admin/Courses';
import Exams from './pages/admin/Exams';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

// Teacher Pages
import TeacherDashboard from './pages/teacher/Dashboard';
import CreateExam from './pages/teacher/CreateExam';
import QuestionBank from './pages/teacher/QuestionBank';
import LiveMonitor from './pages/teacher/LiveMonitor';
import Results from './pages/teacher/Results';
import Profile from './pages/teacher/Profile';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentExams from './pages/student/Exams';
import TakeExam from './pages/student/TakeExam';
import StudentResults from './pages/student/Results';
import StudentProfile from './pages/student/Profile';

// Error Pages
import NotFound from './pages/errors/NotFound';
import Unauthorized from './pages/errors/Unauthorized';
import Features from './component/landing/Features';
import Testimonials from './component/landing/Testimonials';
import Stats from './component/landing/Stats';

// Create a wrapper component that uses Redux hooks
const AppContent = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/student/dashboard" />;
    }
    return children;
  };

  const PrivateRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const RoleBasedRoute = ({ children, allowedRoles }) => {
    if (!user?.role || !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <MainLayout>
                  <LandingPage />
                </MainLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            }
          />
          <Route
            path="/role-test"
            element={
              <RoleTest />
            }
          />

           <Route path="/features" element={<MainLayout><Features/></MainLayout>} />
           <Route path="/Courses" element={<MainLayout><Courses/></MainLayout>} />
           <Route path="/testimonials" element={<MainLayout><Testimonials /></MainLayout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <PrivateRoute>
              <RoleBasedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </RoleBasedRoute>
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="courses" element={<Courses />} />
            <Route path="exams" element={<Exams />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Teacher Routes */}
          <Route path="/teacher" element={
            <PrivateRoute>
              <RoleBasedRoute allowedRoles={['teacher', 'admin']}>
                <TeacherLayout />
              </RoleBasedRoute>
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="create-exam" element={<CreateExam />} />
            <Route path="question-bank" element={<QuestionBank />} />
            <Route path="live-monitor" element={<LiveMonitor />} />
            <Route path="results" element={<Results />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Student Routes */}
          <Route path="/student" element={
            <PrivateRoute>
              <RoleBasedRoute allowedRoles={['student', 'teacher', 'admin']}>
                <StudentLayout />
              </RoleBasedRoute>
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="exams" element={<StudentExams />} />
            <Route path="take-exam/:id" element={<TakeExam />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>

          {/* Error Routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

// Main App component with providers
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;











