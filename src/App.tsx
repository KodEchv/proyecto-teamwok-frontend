import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginViewNew } from './views/auth/LoginViewNew';
import { RegisterViewNew } from './views/auth/RegisterViewNew';
import { DashboardViewNew } from './views/dashboard/DashboardViewNew';
import { ProfileView } from './views/dashboard/ProfileView';
import { AuditorViewNew } from './views/roles/AuditorViewNew';
import { DocumentadorViewNew } from './views/roles/DocumentadorViewNew';
import { LiderViewNew } from './views/roles/LiderViewNew';
import { PlaneacionViewNew } from './views/roles/PlaneacionViewNew';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginViewNew />} />
        <Route path="/register" element={<RegisterViewNew />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardViewNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auditor"
          element={
            <ProtectedRoute>
              <AuditorViewNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documentador"
          element={
            <ProtectedRoute>
              <DocumentadorViewNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lider"
          element={
            <ProtectedRoute>
              <LiderViewNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/planeacion"
          element={
            <ProtectedRoute>
              <PlaneacionViewNew />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
