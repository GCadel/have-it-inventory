import { useEffect, useState } from 'react';
import style from './PartTable.module.css';
import { ButtonContainer } from '../../shared/ButtonContainer';
import { Button } from '../../shared/Button/Button';
import SearchBar from '../../shared/SearchBar/SearchBar';
import { deleteParts, getAllParts } from '../../api/parts';
import Loader from '../../shared/Loader/Loader';
import { useNavigate } from 'react-router';
import TableBody from './TableBody';
const PartTable = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [refreshTable, setRefreshTable] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  const [queryData, setQueryData] = useState([]);
  const [queryTerm, setQueryTerm] = useState('');

  // Fetch data from service, refreshes table when CRUD actions occur
  useEffect(() => {
    async function getData() {
      const { data, error } = await getAllParts();
      if (!error) {
        setTableData(data);
      }
      setRefreshTable(false);
      setLoading(false);
    }

    if (refreshTable) {
      getData();
    }
  }, [refreshTable]);

  // Mark row for deletion
  function addSelectedRow(rowId) {
    setSelectedItems([...selectedItems, rowId]);
  }

  // Unmark row for deletion
  function removeSelectedRow(rowId) {
    const newItems = selectedItems.filter((itemId) => itemId !== rowId);
    setSelectedItems(newItems);
  }

  // Take user to create part page
  function createPart() {
    navigator('/create_part');
  }

  // Delete selected rows from table
  async function deleteSelectedData() {
    const { error } = await deleteParts([...selectedItems]);
    if (!error) {
      setRefreshTable(true);
      const allCheckedBoxes = document.querySelectorAll('input:checked');
      allCheckedBoxes.forEach((checkbox) => (checkbox.checked = false));
    } else {
      console.log('error deleting items');
    }
  }

  // Mark all rows for deletion
  function selectAllRows() {
    const allCheckboxes = document.querySelectorAll('.item-checkbox');
    const allRows = document.querySelectorAll('.item-row');
    const rowIds = [];
    allRows.forEach((row) => rowIds.push(row.id));
    setSelectedItems(rowIds);
    allCheckboxes.forEach((checkbox) => (checkbox.checked = true));
  }

  // Unmark all rows for deletion
  function deselectAllRows() {
    const allCheckboxes = document.querySelectorAll('.item-checkbox');
    allCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setSelectedItems([]);
  }

  // Search for items in inventory by name
  function searchByName(itemName) {
    setQueryTerm(itemName);
    const filteredData = tableData.filter((item) =>
      String(item.name).toLowerCase().includes(String(itemName).toLowerCase())
    );
    setQueryData(filteredData);
  }

  return (
    <div className={style['part-table']}>
      <div className={style['part-table-controls']}>
        <h3>Your Parts List</h3>
        <SearchBar
          onChange={searchByName}
          value={queryTerm}
          placeholder={'Part Name'}
        />
        <ButtonContainer>
          <Button
            text={'Delete Selected'}
            disabled={selectedItems.length < 1}
            buttonType={'secondary'}
            action={deleteSelectedData}
          />
          <Button
            text={'Add Item'}
            buttonType={'primary'}
            action={createPart}
          />
        </ButtonContainer>
      </div>

      {loading ? (
        <Loader />
      ) : tableData.length < 1 ? (
        <div className={style['empty-message']}>
          <h4>No items found!</h4>
          <p>Get started by adding a new item</p>
        </div>
      ) : (
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
              <th style={{ textAlign: 'right' }}>Price {'($)'}</th>
            </tr>
          </thead>
          <TableBody
            tableData={queryTerm === '' ? tableData : queryData}
            addRow={addSelectedRow}
            removeRow={removeSelectedRow}
          />
        </table>
      )}
    </div>
  );
};

export default PartTable;
