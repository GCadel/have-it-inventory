import { Link, useNavigate } from 'react-router';
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
              <Link to={'/dashboard'}>Dashboard</Link>
            </li>
            <li>
              <Link to={'/parts'}>Parts</Link>
            </li>
            <li>
              <Link to={'/assemblies'}>Assemblies</Link>
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
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/about'}>About</Link>
            </li>
            <li>
              <Link to={'/settings'}>Settings</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};
