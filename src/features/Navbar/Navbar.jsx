import { NavLink, useLocation, useNavigate } from 'react-router';
import { Button } from '../../shared/Button/Button';
import { UserAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { HighlightedLink } from './HighlightedLink';

export const Navbar = () => {
  const { session, logout } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogoff(e) {
    e.preventDefault();
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logoff error occurred:', error);
    }
  }

  return (
    <header className="navbar">
      <div className="logo">
        <h1>Have-It</h1>
        <p>Your Inventory Management Tool</p>
      </div>
      <nav>
        {session ? (
          <ul className="nav-links">
            <li>
              <HighlightedLink
                text={'Dashboard'}
                path={'/dashboard'}
                currentLocation={location.pathname}
              />
            </li>
            <li>
              <HighlightedLink
                text={'Parts'}
                path={'/parts'}
                currentLocation={location.pathname}
              />
            </li>
            <li>
              <HighlightedLink
                text={'Assemblies'}
                path={'/assemblies'}
                currentLocation={location.pathname}
              />
            </li>
            <li>
              <Button
                text={'Logoff'}
                action={handleLogoff}
                buttonType={'secondary'}
              />
            </li>
          </ul>
        ) : (
          <ul className="nav-links">
            <li>
              <HighlightedLink
                text={'Home'}
                path={'/'}
                currentLocation={location.pathname}
              />
            </li>
            <li>
              <HighlightedLink
                text={'About'}
                path={'/about'}
                currentLocation={location.pathname}
              />
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};
