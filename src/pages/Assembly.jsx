import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Button } from '../shared/Button/Button';
import { getAssemblyById } from '../api/assemblies';
import { UserAuth } from '../context/AuthContext';
import Loader from '../shared/Loader/Loader';
import {
  createAssemblyPart,
  getPartsByAssemblyId,
  deleteAssemblyPartById,
} from '../api/assembly_parts';
import { PartSelector } from '../features/PartSelector/PartSelector';
import { PartCard } from '../features/PartCard/PartCard';
import ErrorBox from '../shared/ErrorBox';
import { CenteredText } from '../shared/CenteredText';

export const Assembly = () => {
  const { session } = UserAuth();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState('');
  const [assemblyData, setAssemblyData] = useState(null);
  const [partList, setPartList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  async function loadAssembly() {
    const { error, data } = await getAssemblyById(params.id, session.user.id);
    return { error, data };
  }

  async function loadParts() {
    const { error, data } = await getPartsByAssemblyId(params.id);
    return { error, data };
  }

  async function deletePart(partId) {
    const { error, data } = await deleteAssemblyPartById(partId);
    setRefreshTable(true);
    return { error, data };
  }

  async function addPartToAssembly(partId, partName, quantity = 1) {
    setLoading(true);
    const { error, data } = await createAssemblyPart(
      params.id,
      partId,
      partName,
      quantity
    );
    if (error) {
      setErrMessage('Unable to add part to assembly');
    } else {
      setRefreshTable(true);
      setErrMessage('');
    }
    setLoading(false);
  }

  // For refreshing the table when adding or removing parts
  useEffect(() => {
    async function reloadData() {
      const { error, data } = await loadParts();
      if (error) {
        setErrMessage('An error occurred with refreshing list');
      } else {
        setRefreshTable(false);
        setPartList(data);
        setErrMessage('');
      }
    }

    if (refreshTable) {
      reloadData();
    }
  }, [refreshTable]);

  // Initial Assembly load
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
      <CenteredText>
        <h2>{assemblyData.name}</h2>
        <p>{assemblyData.description}</p>
      </CenteredText>
      <br />
      <h3>Part List</h3>

      <ErrorBox error={errMessage} />
      {partList.length > 0 ? (
        <ul>
          {partList.map((part) => {
            return (
              <PartCard
                key={part.id}
                partData={part}
                deletePart={deletePart}
                setErrMessage={setErrMessage}
                errMessage={errMessage}
              />
            );
          })}
        </ul>
      ) : (
        <>
          <h4 style={{ textAlign: 'center' }}>No parts used</h4>
        </>
      )}
      <PartSelector
        isModalOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        addPartFn={addPartToAssembly}
        loading={loading}
      />
      <br />
      <Button
        text={'Add Parts'}
        buttonType={'primary'}
        action={() => setIsOpen(true)}
      />
      <br />
      <Link to={'/assemblies'}>Back to Assemblies</Link>
    </>
  );
};
