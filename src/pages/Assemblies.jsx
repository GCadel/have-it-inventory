import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Button } from '../shared/Button/Button';
import {
  createAssembly,
  getAllAssemblies,
  getAssemblyById,
} from '../api/assemblies';
import { UserAuth } from '../context/AuthContext';
import Loader from '../shared/Loader/Loader';

export const Assemblies = () => {
  const { session } = UserAuth();
  const [assemblies, setAssemblies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const { error, data } = await getAllAssemblies(session.user.id);
      if (error) {
        setErrMessage("Couldn't load data. Try again later");
        setAssemblies([]);
      } else {
        setAssemblies(data);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h2>Assemblies</h2>
      <div>
        {assemblies.length > 0 ? (
          assemblies.map((assembly) => (
            <div key={assembly.id}>
              <h3>{assembly.name}</h3>
              <p>{assembly.description}</p>
              <Link to={`/assembly/${assembly.id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <>
            <h3>No Assemblies Found</h3>
            <p>But you can always make some.</p>
            <Button
              text={'New Assembly'}
              buttonType={'primary'}
              action={() => navigate('/create_assembly')}
            />
          </>
        )}
      </div>
    </>
  );
};
