import { Link } from 'react-router';
import PartTable from '../features/PartTable/PartTable';

export const Parts = () => {
  return (
    <>
      <h2>Your Parts</h2>
      <PartTable />
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <p>Ready to put things together?</p>
        <Link to={'/assemblies'}>Start Assembling</Link>
      </div>
    </>
  );
};
