import { useState } from 'react';
import { parts } from '../../data/parts';
import EditableTableCell from '../../shared/EditableTableCell/EditableTableCell';
import style from './PartTable.module.css';
import { ButtonContainer } from '../../shared/ButtonContainer';
import { Button } from '../../shared/Button/Button';
import SearchBar from '../../shared/SearchBar/SearchBar';
const PartTable = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  function addSelectedRow(rowId) {
    setSelectedItems([...selectedItems, rowId]);
  }

  function removeSelectedRow(rowId) {
    const newItems = selectedItems.filter((itemId) => itemId !== rowId);
    setSelectedItems(newItems);
  }

  function selectAllRows() {
    const allCheckboxes = document.querySelectorAll('.item-checkbox');
    const allRows = document.querySelectorAll('.item-row');
    const rowIds = [];
    allRows.forEach((row) => rowIds.push(row.id));
    setSelectedItems(rowIds);
    allCheckboxes.forEach((checkbox) => (checkbox.checked = true));
  }

  function deselectAllRows() {
    const allCheckboxes = document.querySelectorAll('.item-checkbox');
    allCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedItems([]);
  }

  function searchByName(itemName) {}

  return (
    <div className={style['part-table']}>
      <div className={style['part-table-controls']}>
        <h3>Your Parts List</h3>
        <SearchBar />
        <ButtonContainer>
          <Button
            text={'Delete Selected'}
            disabled={selectedItems.length < 1}
            buttonType={'secondary'}
          />
          <Button text={'Add Item'} buttonType={'primary'} />
        </ButtonContainer>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="select-all"
                onClick={(e) => {
                  if (e.target.checked) {
                    selectAllRows();
                  } else {
                    deselectAllRows();
                  }
                }}
              />
            </th>
            <th>Name</th>
            <th>SKU</th>
            <th style={{ textAlign: 'right' }}>Quantity</th>
            <th style={{ textAlign: 'right' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((item) => (
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
              />

              <EditableTableCell
                cellValue={item.sku}
                type={'text'}
                name={'sku'}
              />

              <EditableTableCell
                type={'count'}
                cellValue={item.quantity}
                name={'quantity'}
              />

              <EditableTableCell
                type={'currency'}
                cellValue={item.price}
                name={'price'}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartTable;
