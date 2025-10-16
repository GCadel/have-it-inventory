import { Link } from 'react-router';
import { Button } from '../../shared/Button/Button';

export const Navbar = ({ loggedIn = false }) => {
  return (
    <header className="navbar">
      <div>
        <h1>Have-It</h1>
        <p>Your Inventory Management Tool</p>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <p>
              <Link to={'/'}>Home</Link>
            </p>
          </li>
          <li>
            <Link to={'/about'}>About</Link>
          </li>
          <li>
            <Link to={'/settings'}>Settings</Link>
          </li>
        </ul>
        {loggedIn ? <Button text={'Sign Out'} buttonType={'secondary'} /> : ''}
      </nav>
    </header>
  );
};
