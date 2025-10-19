import { Route, Routes } from 'react-router';
import './App.css';
import { Layout } from './shared/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { AuthContextProvider } from './context/AuthContext';
import PrivateRoute from './features/PrivateRoute';
import CreatePart from './pages/CreatePart';
import { Parts } from './pages/Parts';
import { Assemblies } from './pages/Assemblies';
import { Assembly } from './pages/Assembly';
import CreateAssembly from './pages/CreateAssembly';

function App() {
  return (
    <AuthContextProvider>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create_part" element={<CreatePart />} />
            <Route path="/parts" element={<Parts />} />
            <Route path="/assemblies" element={<Assemblies />} />
            <Route path="/create_assembly" element={<CreateAssembly />} />
            <Route path="/assembly/:id" element={<Assembly />} />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
