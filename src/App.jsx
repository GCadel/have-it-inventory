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

function App() {
  return (
    <Layout>
      <AuthContextProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </Layout>
  );
}

export default App;
