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
import { PageTitle } from './features/PageTitle';

function App() {
  return (
    <AuthContextProvider>
      <Layout>
        <Routes>
          <Route
            index
            element={
              <>
                <PageTitle title={'Have-It | Home'} />
                <Home />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <PageTitle title={'Have-It | About'} />
                <About />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <PageTitle title={'Login to Have-It'} />
                <Login />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <PageTitle title={'Sign up with Have-It'} />
                <Signup />
              </>
            }
          />
          <Route element={<PrivateRoute />}>
            <Route
              path="/dashboard"
              element={
                <>
                  <PageTitle title={'Your Dashboard'} />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="/create_part"
              element={
                <>
                  <PageTitle title={'Creating New Part'} />
                  <CreatePart />
                </>
              }
            />
            <Route
              path="/parts"
              element={
                <>
                  <PageTitle title={'Your Parts'} />
                  <Parts />
                </>
              }
            />
            <Route
              path="/assemblies"
              element={
                <>
                  <PageTitle title={'Your Assemblies'} />
                  <Assemblies />
                </>
              }
            />
            <Route
              path="/create_assembly"
              element={
                <>
                  <PageTitle title={'Creating New Assembly'} />
                  <CreateAssembly />
                </>
              }
            />
            <Route
              path="/assembly/:id"
              element={
                <>
                  <PageTitle title={'Assembly Details'} />
                  <Assembly />
                </>
              }
            />
          </Route>

          <Route
            path="/*"
            element={
              <>
                <PageTitle title={'Where Are We?'} />
                <NotFound />
              </>
            }
          />
        </Routes>
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
