import { Route, Routes } from 'react-router';
import './App.css';
import { Layout } from './features/Layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { useEffect, useState } from 'react';
import { Login } from './pages/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {}, []);
  if (loggedIn)
    return (
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    );
  else {
    return (
      <Layout>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    );
  }
}

export default App;
