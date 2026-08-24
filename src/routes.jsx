import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import AuthPage from './pages/AuthPage';
import DiaryPage from './pages/DiaryPage';

// Central JSON Route Registry
export const routeConfig = [
  {
    name: 'login',
    path: '/login',
    component: AuthPage,
    hasLayout: false,
    protected: false,
  },
  {
    name: 'diary',
    path: '/home/diary',
    component: DiaryPage,
    hasLayout: true,
    protected: true,
  },
  {
    name: 'projects',
    path: '/home/projects',
    component: DiaryPage, // Placeholder for ProjectsPage
    hasLayout: true,
    protected: true,
  }
];

export function AppRoutes({ user, setUser, handleLogout }) {
  const layoutRoutes = routeConfig.filter((r) => r.hasLayout);
  const standaloneRoutes = routeConfig.filter((r) => !r.hasLayout);

  return (
    <Routes>
      {/* 1. Standalone Pages (No Top Navigation Bar) */}
      {standaloneRoutes.map((route) => {
        const Component = route.component;
        return (
          <Route
            key={route.name}
            path={route.path}
            element={
              route.protected && !user ? (
                <Navigate to="/login" replace />
              ) : !route.protected && user ? (
                <Navigate to="/home/diary" replace />
              ) : (
                <Component onLoginSuccess={setUser} />
              )
            }
          />
        );
      })}

      {/* 2. Layout Pages (Wrapped with Persistent Top Navigation Bar) */}
      <Route
        element={
          user ? <MainLayout user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
        }
      >
        {layoutRoutes.map((route) => {
          const Component = route.component;
          return <Route key={route.name} path={route.path} element={<Component />} />;
        })}
      </Route>

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to={user ? '/home/diary' : '/login'} replace />} />
    </Routes>
  );
}