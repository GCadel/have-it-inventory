import { NavLink } from 'react-router';

export const HighlightedLink = ({ path, currentLocation, text }) => {
  return (
    <NavLink
      to={path}
      className={path == currentLocation ? 'current-page' : ''}
    >
      {text}
    </NavLink>
  );
};
