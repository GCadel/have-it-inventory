import { Route, Routes } from 'react-router';
import './App.css';
import { Layout } from './features/Layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { AuthContextProvider } from './context/AuthContext';
import PrivateRoute from './features/PrivateRoute';
import CreatePart from './pages/CreatePart';

function App() {
  return (
    <AuthContextProvider>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create_part"
            element={
              <PrivateRoute>
                <CreatePart />
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
