import { useEffect, useState } from 'react';

import { updateAssemblyPartQuantity } from '../../api/assembly_parts';
import style from './PartCard.module.css';
import Loader from '../../shared/Loader/Loader';

export const PartCard = ({
  partData,
  deletePart,
  errMessage,
  setErrMessage,
}) => {
  const [partCount, setPartCount] = useState(partData.quantity);
  const [partCountLocal, setPartCountLocal] = useState(partData.quantity);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function updatePartCount() {
      const { error } = await updateAssemblyPartQuantity(
        partData.id,
        partCount
      );
      if (error) {
        setErrMessage('Part count should be whole numbers');
      } else {
        setErrMessage('');
      }
      setLoading(false);
    }

    if (partCountLocal !== partCount) {
      setLoading(true);
      updatePartCount();
    }
  }, [partCount]);

  function handleDeletePart() {
    setLoading(true);
    deletePart(partData.id);
  }

  function handleCountChange(count) {
    if (count > 0) {
      setPartCount(count);
    } else {
      setPartCountLocal(partCount);
    }
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <li className={style['part-card']}>
      <div>{partData.part_name}</div>
      <div className={style['quantity-controls']}>
        <span className={style.multiplier}>x</span>
        <input
          name="part-quantity"
          type="number"
          className={style['quantity']}
          step={1}
          min={1}
          value={partCountLocal}
          onBlur={(e) => handleCountChange(Number(e.target.value))}
          onChange={(e) => {
            setPartCountLocal(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.code === 'Enter') e.target.blur();
          }}
        />
      </div>
      <button className={style.delete} onClick={handleDeletePart}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#992B15"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </button>
    </li>
  );
};
