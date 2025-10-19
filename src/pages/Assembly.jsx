import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '../shared/Button/Button';
import {
  createAssembly,
  getAllAssemblies,
  getAssemblyById,
} from '../api/assemblies';
import { UserAuth } from '../context/AuthContext';
import Loader from '../shared/Loader/Loader';
import { getPartsByAssemblyId } from '../api/assembly_parts';

export const Assembly = () => {
  const { session } = UserAuth();
  const params = useParams();
  const itemId = params.id;
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState('');
  const [assemblyData, setAssemblyData] = useState(null);
  const [partList, setPartList] = useState([]);

  async function loadAssembly() {
    const { error, data } = await getAssemblyById(params.id, session.user.id);
    return { error, data };
  }

  async function loadParts() {
    const { error, data } = await getPartsByAssemblyId(params.id);
    return { error, data };
  }

  useEffect(() => {
    async function loadData() {
      const assemRes = await loadAssembly();
      const partsRes = await loadParts();

      if (assemRes.error || partsRes.error) {
        setErrMessage('Trouble retrieving info about this part');
      } else {
        setAssemblyData(assemRes.data);
        setPartList(partsRes.data);
        setErrMessage('');
      }
      setLoading(false);
    }

    loadData();
  }, []);

  useEffect(() => {}, [partList]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h2>{assemblyData.name}</h2>
      <p>{assemblyData.description}</p>
      <h3>Parts Used</h3>
      {partList.length > 0 ? (
        <ul>
          {partList.map((part) => (
            <li key={part.id}>Part</li>
          ))}
        </ul>
      ) : (
        <h4>No parts used</h4>
      )}
    </>
  );
};
