import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SupabaseAuthProvider } from './contexts/SupabaseAuthContext';
import { useAuth } from './contexts/SupabaseAuthContext';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import UniversitiesPage from './pages/UniversitiesPage';
import UniversityDetailPage from './pages/UniversityDetailPage';
import CountryPage from './pages/CountryPage';
import CategoriesPage from './pages/CategoriesPage';
import ResearchPage from './pages/ResearchPage';
import AnalysisPage from './pages/AnalysisPage';
import NobelPrizePage from './pages/NobelPrizePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import SocialPage from './pages/SocialPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ProfessorProfilePage from './pages/ProfessorProfilePage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import Dashboard from './pages/Dashboard';
import ArticlesPage from './pages/ArticlesPage';
import UsersPage from './pages/UsersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import ProfessorsManagementPage from './pages/ProfessorsManagementPage';
import SiteSettingsPage from './pages/SiteSettingsPage';
import CategoriesManagementPage from './pages/CategoriesManagementPage';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/articles"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <ArticlesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/professors"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <ProfessorsManagementPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <CategoriesManagementPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute requiredRole="admin">
            <Layout>
              <UsersPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <AnalyticsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <SettingsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/site-settings"
        element={
          <ProtectedRoute adminOnly>
            <Layout>
              <SiteSettingsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:categorySlug" element={<CategoryPage />} />
      <Route path="/universities" element={<UniversitiesPage />} />
      <Route path="/university/:universitySlug" element={<UniversityDetailPage />} />
      <Route path="/country/:countrySlug" element={<CountryPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/research" element={<ResearchPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/nobel-prizes" element={<NobelPrizePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/about/team" element={<AboutPage />} />
      <Route path="/about/advertise" element={<AboutPage />} />
      <Route path="/about/careers" element={<AboutPage />} />
      <Route path="/social" element={<SocialPage />} />
      <Route path="/auth/*" element={<AuthPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/professor/:professorId" element={<ProfessorProfilePage />} />
      
      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      
      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <SupabaseAuthProvider>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </SupabaseAuthProvider>
    </Router>
  );
}

export default App;