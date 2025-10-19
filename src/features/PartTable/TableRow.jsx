import { useEffect, useState } from 'react';
import EditableTableCell from '../../shared/EditableTableCell/EditableTableCell';
import { updatePartById } from '../../api/parts';

export const TableRow = ({ rowData, addSelectedRow, removeSelectedRow }) => {
  const [item, setItem] = useState({ ...rowData });
  const [finishedEditing, setFinishedEditing] = useState(false);

  useEffect(() => {
    async function updateRow() {
      const { error } = await updatePartById(item.id, item);
      console.log(error);
    }

    if (finishedEditing) {
      updateRow();
      setFinishedEditing(false);
    }
  }, [item]);

  function handleCellUpdate(cellData) {
    setItem((item) => ({ ...item, ...cellData }));
  }

  return (
    <tr key={item.id} id={item.id} className="item-row">
      <td>
        <input
          type="checkbox"
          name={`${item.name} checkbox`}
          className="item-checkbox"
          onClick={(e) => {
            if (e.target.checked) {
              addSelectedRow(String(item.id));
            } else {
              removeSelectedRow(String(item.id));
            }
          }}
        />
      </td>
      <EditableTableCell
        cellValue={item.name}
        type={'text'}
        name={'name'}
        cellUpdater={handleCellUpdate}
        markForEdit={setFinishedEditing}
      />

      <EditableTableCell
        cellValue={item.sku}
        type={'text'}
        name={'sku'}
        cellUpdater={handleCellUpdate}
        markForEdit={setFinishedEditing}
      />

      <EditableTableCell
        type={'count'}
        cellValue={item.quantity}
        name={'quantity'}
        cellUpdater={handleCellUpdate}
        markForEdit={setFinishedEditing}
      />

      <EditableTableCell
        type={'currency'}
        cellValue={item.price}
        name={'price'}
        cellUpdater={handleCellUpdate}
        markForEdit={setFinishedEditing}
      />
    </tr>
  );
};
