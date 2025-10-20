import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../shared/Button/Button';
import { deleteAssemblyById, getAllAssemblies } from '../api/assemblies';
import { UserAuth } from '../context/AuthContext';
import Loader from '../shared/Loader/Loader';
import ErrorBox from '../shared/ErrorBox';

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
        setErrMessage('');
      }

      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  async function handleDelete(assemblyId) {
    setLoading(true);
    const { error } = await deleteAssemblyById(assemblyId, session.user.id);
    if (error) {
      setErrMessage('Unable to delete assembly');
    } else {
      const newAssemblyList = assemblies.filter(
        (assembly) => assembly.id != assemblyId
      );
      setAssemblies(newAssemblyList);
      setErrMessage('');
    }
    setLoading(false);
  }

  return (
    <>
      <h2>Assemblies</h2>
      <ErrorBox error={errMessage} />
      <div>
        {assemblies.length > 0 ? (
          assemblies.map((assembly) => (
            <div key={assembly.id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h3>{assembly.name}</h3>{' '}
                <Button
                  buttonType={'delete'}
                  action={() => handleDelete(assembly.id)}
                />
              </div>
              <p>{assembly.description}</p>
              <Link to={`/assembly/${assembly.id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <>
            <h3>No Assemblies Found</h3>
            <p>But you can always make some.</p>
          </>
        )}
        <div
          style={{
            margin: '15px 0px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            text={'New Assembly'}
            buttonType={'primary'}
            action={() => navigate('/create_assembly')}
          />
        </div>
      </div>
    </>
  );
};
