import { NavLink, useNavigate } from 'react-router';
import { Button } from '../../shared/Button/Button';
import { UserAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { session, logout } = UserAuth();
  const navigate = useNavigate();

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
      <div>
        <h1>Have-It</h1>
        <p>Your Inventory Management Tool</p>
      </div>
      <nav>
        {session ? (
          <ul className="nav-links">
            <li>
              <NavLink to={'/dashboard'}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to={'/parts'}>Parts</NavLink>
            </li>
            <li>
              <NavLink to={'/assemblies'}>Assemblies</NavLink>
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
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'/about'}>About</NavLink>
            </li>
            <li>
              <NavLink to={'/settings'}>Settings</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};
